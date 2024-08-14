import * as express from 'express';
import * as cors from 'cors';
import Memo from './interfaces/Memo.interface';
import * as morgan from 'morgan';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import userMngt from "./interfaces/user";
import {createUser, getAllUsers} from "./database";

// database dependency injection
export default function (database) {
    const app: express.Application = express();
    const basePath: string = '/api/users';

    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get(basePath,(req:Request,res:Response) => res.send('<h1>Users API Server</h1>'))

    app.post(basePath + '/create', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.body.id;
            const pw: string = req.body.pw;
            const phone: string = req.body.phone;
            // console.log('id:' + id, "pw:" + pw);
            if (!id || !pw || !phone) return res.sendStatus(400);
            await database.createUser(id, pw, phone);
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    });

    app.get(basePath + '/list', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users: userMngt[] = await database.getAllUsers();
            console.log(users);
            res.json({
                users
            })
        } catch (error) {
            next(error);
        }
    });

    app.get(basePath + '/get', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.body.id;
            console.log(id);
            if (!id) return res.send('존재하지 않는 아이디입니다.')

            const user: userMngt = await database.getUser(id);
            console.log(user);
            res.json(
                user
            )
        } catch (error) {
            next(error);
        }
    });

    app.post(basePath + '/update', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.body.id;
            const phone: string = req.body.phone;
            console.log('id:' + id, "phone:" + phone);
            if (!id || !phone) return res.sendStatus(400);
            await database.updateUser(id, phone);
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    });

    app.post(basePath + '/delete', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.body.id;
            // console.log('id:' + id, "pw:" + pw);
            if (!id) return res.sendStatus(400);
            await database.deleteUser(id);
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    });


    app.post(basePath + '/auth', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.body.id;
            const pw: string = req.body.pw;
            console.log('id:' + id, "pw:" + pw);

            const secretKey: string = process.env.JWT_SECRET_KEY || "jwt-secret-key";
            const token = jwt.sign({userId: id}, secretKey);
            console.log('token' + token);

            if (!id || !pw) return res.sendStatus(400);
            await database.getUser(id, pw);
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    });


    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        console.log(error)
        res.json({ error })
    });

    return app;
}
