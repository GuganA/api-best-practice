import jwt from 'jsonwebtoken';
import { config } from '../utils'
import { NextFunction, Request, Response } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.redirect('/login');
    };

    const token = authHeader?.split(' ')[1];
    if (!token) {
        return res.redirect('/login');
    } else {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        // const user = await UserModal.findById(decoded.id);
        console.log(decoded);
        (req as any).user = decoded;
        // req.user = decoded;
        next();
    }
};