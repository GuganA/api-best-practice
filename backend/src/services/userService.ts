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

    getByEmailUser = async (email: string) => {
        try {
            const data = await UserModal.findOne({ email: email });

            if (!data) {
                return { status: 404, error: 'User not found' };  // or 'No user with this email'
            }

            return data;
        } catch (error) {
            logger.error({ error }, 'Error fetching user by email');
            return { status: 500, error: 'Internal server error' };
        }
    }

    createUser = (newUser: any) => {
        return new Promise(async (resolve, reject) => {
            try {

                const isExistingUser: any = await this.getByEmailUser(newUser.email);

                if (isExistingUser && isExistingUser.status !== 404) {
                    logger.error(`User already exists, Please Login`);
                    reject({ status: 400, error: 'User already exists, Please Login' });
                }

                const { email, name, password } = newUser;
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);

                const newUserFromDb = await UserModal.create({
                    email,
                    name,
                    password: hash,
                });

                delete newUser.password;

                newUser.token = this.generateJwt({ id: newUserFromDb._id, email: newUserFromDb.email });
                return resolve(newUser);
            } catch (error) {
                logger.error({ error }, `Error in creating User.`);
                return reject({ status: 400, error: error });
            }
        });
    };


    signIn = (params: any) => {
        return new Promise(async (resolve, reject) => {
            try {
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

                const token = this.generateJwt({ id: getUser._id, email: getUser.email });

                return resolve(token);
            } catch (error) {
                return reject(error);
            }
        });
    };

    generateJwt = (payload: any) => {
        return jwt.sign(
            { id: payload.id, email: payload.email },
            config.JWT_SECRET,
            { expiresIn: '5 days' }
        )
    }

}

const user = new User();
export default user;