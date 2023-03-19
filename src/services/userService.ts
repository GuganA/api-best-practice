import { UserModal } from '../modal';
import { logger, config } from '../utils';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class User {
    getByNameUser = (name: string) => {
        return new Promise((resolve, reject) => {
            UserModal.findOne({ name: name })
                .then((data: any) => {
                    if (!data) {
                        reject({ status: 404, error: 'No Data found' });
                    }
                    resolve(data);
                })
                .catch((error: any) => {
                    logger.error({ error }, 'Error in fetching data.');
                    reject({ status: 400, error: error });
                });
        });
    };

    getByEmailUser = (email: string) => {
        return new Promise((resolve, reject) => {
            UserModal.findOne({ email: email })
                .then((data: any) => {
                    if (!data) {
                        reject({ status: 404, error: 'No Data found' });
                    }
                    resolve(data);
                })
                .catch((error: any) => {
                    logger.error({ error }, 'Error in fetching User.');
                    reject({ status: 400, error: error });
                });
        });
    };

    createUser = (newUser: any) => {
        return new Promise(async (resolve, reject) => {
            try {

                const isExistingUser = await this.getByEmailUser(newUser.email);

                if (isExistingUser) {
                    logger.error(`User already exists, Please Login`);
                    reject({ status: 400, error: 'User already exists, Please Login' });
                }

                const email = newUser.email;
                const name = newUser.name;
                const password = newUser.password;

                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);

                await UserModal.create({
                    email,
                    name,
                    password: hash,
                });

                delete newUser.password;

                newUser.token = this.generateJwt(email)
                resolve(newUser);
            } catch (error) {
                logger.error({ error }, `Error in creating User.`);
                reject({ status: 400, error: error });
            }
        });
    };


    signIn = (params: any) => {
        return new Promise(async (resolve, reject) => {
            const { email, password } = params;
            const getUser: any = await this.getByEmailUser(email);

            if (!getUser) {
                logger.error(`Error in signing in. User not Exist, Please create a account.`);
                reject({ status: 404, error: 'User not Exist, Please create a account.' });
            }

            const isSame = await bcrypt.compare(password, getUser.password);

            if (!isSame) {
                logger.error(`Error in signing in. Invalid Password.`);
                reject({ status: 400, error: 'Invalid Password.' });
            }
            const token = this.generateJwt(email);

            return resolve(token);
        });
    };

    generateJwt = (payload: any) => {
        jwt.sign(
            { email: payload.email },
            config.JWT_SECRET,
            { expiresIn: '5 days' }
        )
    }

}

const user = new User();
export default user;