import { Router } from 'express';
import { Middleware } from '.';

export const test: Middleware = (router: Router) => {
    router.use((_req: any, _res: any, next: any) => {
        // console.log('middleware is active');
        next();
    });
}