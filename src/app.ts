import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import userMngt from "./interfaces/user";
import {createUser, getAllUsers} from "./database";

import authRouter from "./routes/auth";
import userRouter from "./routes/users";


// database dependency injection
export default function (database) {
    const app: express.Application = express();
    const basePath: string = '/api'

    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(basePath + '/auth', authRouter);
    app.use(basePath + '/users', userRouter);

    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        console.log(error)
        res.json({ error })
    });

    return app;
}
