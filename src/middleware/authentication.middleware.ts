import jwt from 'jsonwebtoken';
import { config } from '../utils'

export const authenticate = (req, res, next) => {
    const token = req.cookie.jwt;

    if (!token) {
        res.redirect('/login');
    } else {
        jwt.verify(token, config.JWT_SECRET, (err, token) => {
            if (err) {
                res.redirect('/login');
            } else {
                next();
            }
        })
    }
};