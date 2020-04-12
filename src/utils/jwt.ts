import * as jwt from 'jsonwebtoken';
import { logger } from './winston';
import { env } from '../environments';

const secret = env.token_secret as string;

export function sign(payload: any) {
    const options: jwt.SignOptions = {
        issuer: 'cocoon.finance',
        expiresIn: '1h',
        algorithm: 'HS256'
    };

    return jwt.sign({ payload }, secret, options);
}

export function verify(req: any, res: any) {
    try {
        // extract token
        const parts = req.headers.authorization ? req.headers.authorization.split(' ') : [''];
        const token = parts.length === 2 && parts[0].toLowerCase() === 'bearer' ? parts[1] : undefined;
        if (!token) {
            return undefined;
        }

        // verify token
        const { payload, iat }: any = jwt.verify(token, secret, { // TODO: fix types of payload and iat
            issuer: 'cocoon.finance'
        });

        // generate new token in every 15 minutes
        const diff = Math.floor(Date.now() / 1000) - iat;
        if (diff >= 15 * 60) {
            const newToken = sign(payload);
            res.set('Authorization', `Bearer ${newToken}`);
        }

        return payload;
    } catch (err) {
        if (err.name !== 'TokenExpiredError') {
            logger.error('JWT token check failed', err);
        }
    }
}
