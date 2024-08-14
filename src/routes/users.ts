import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import userMngt from "../interfaces/user";
import * as db from "../database";

const router: express.Router = express.Router();


router.get('/', (req:Request,res:Response) => res.send('<h1>Users API Server</h1>'))

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.body.id;
        const pw: string = req.body.pw;
        const phone: string = req.body.phone;

        if (!id || !pw || !phone) return res.sendStatus(400);
        await db.createUser(id, pw, phone);
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users: userMngt[] = await db.getAllUsers();
        console.log(users);
        res.json({
            users
        })
    } catch (error) {
        next(error);
    }
});

router.get('/get', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.body.id;
        console.log(id);
        if (!id) return res.send('존재하지 않는 아이디입니다.')

        const user: userMngt = await db.getUser(id);
        console.log(user);
        res.json(
            user
        )
    } catch (error) {
        next(error);
    }
});

router.post('/update', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.body.id;
        const phone: string = req.body.phone;
        console.log('id:' + id, "phone:" + phone);
        if (!id || !phone) return res.sendStatus(400);
        await db.updateUser(id, phone);
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.post('/delete', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.body.id;
        // console.log('id:'id, "pw:"pw);
        if (!id) return res.sendStatus(400);
        await db.deleteUser(id);
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});


export default router;

