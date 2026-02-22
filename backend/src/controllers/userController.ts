import { user } from '../services';
import { Request, Response } from 'express';

export const createUser = (req: Request, res: Response) => {
    user.createUser(req.body).then((userResp: any) => {
        const isProd = process.env.NODE_ENV === 'production';

        res.cookie('token', userResp.token, {
            httpOnly: true,
            secure: isProd,
            sameSite: 'strict',
        });
        return res.status(200).send({ status: 'OK', Data: userResp, message: 'New user created' });
    }).catch(err => {
        return res.status(err?.status || 500).send({ status: 'Error', Error: err.error });
    });
};

export const login = (req: Request, res: Response) => {
    user.signIn(req.body).then((token) => {
        const isProd = process.env.NODE_ENV === 'production';

        res.cookie('token', token, {
            httpOnly: true,
            secure: isProd,
            sameSite: 'strict',
        });
        return res.status(200).send({ status: 'OK', token: token, message: 'User Logged In' });
    }).catch((err) => {
        return res.status(err?.status || 500).send({ status: 'Error', Error: err.error });
    });
}