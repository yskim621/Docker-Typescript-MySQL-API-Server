import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express-serve-static-core';

import constRes from '../const/respone';
import userMngt from '../interfaces/user';
import * as db from '../database';
import userService from '../service/uesrService'
import authService from "../service/authService";

const router: express.Router = express.Router();


router.get('/', (req:Request,res:Response) => res.send('<h1>Users API Server</h1>'))

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resultObj: object = {
            responseCode: 200,
            resultCode: 'fail',
            resultMsg: '사용자 생성에 실패하였습니다.',
        };
        const id: string = req.body.id;
        const pw: string = req.body.pw;
        const phone: string = req.body.phone;

        if (!id) {
            resultObj['responseCode'] = 400;
            resultObj['resultCode'] = 'fail';
            resultObj['resultMsg'] = '아이디를 입력해주세요.';
            return resultObj;
        }

        if (!pw) {
            resultObj['responseCode'] = 400;
            resultObj['resultCode'] = 'fail';
            resultObj['resultCode'] = '비밀번호를 입력해주세요.';
            return resultObj;
        }

        if (!phone) {
            resultObj['responseCode'] = 400;
            resultObj['resultCode'] = 'fail';
            resultObj['resultCode'] = '휴대폰 번호를 입력해주세요.';
            return resultObj;
        }

        await userService.createUser(id, pw, phone);

        resultObj['resultCode'] = 'success';
        resultObj['resultMsg'] = '정상 처리 되었습니다.';
        res.send(resultObj);
    } catch (error) {
        next(error);
    }
});

router.post('/list', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers['authorization'];
        // console.log('token: ' + token);
        const resultObj: object = constRes.getResData();
        resultObj['token'] = token;

        if (!token) {
            console.log('There is no token');
            resultObj['responseCode'] = 400;
            return resultObj;
        }

        const result = await authService.verifyToken(token);
        if (!result) {
            res.send(resultObj);
            return;
        }

        const users = await userService.getUsers(token);
        resultObj['body'] = users;

        resultObj['resultCode'] = 'success';
        resultObj['resultMsg'] = '정상 처리 되었습니다.';

        res.send(resultObj);
    } catch (error) {
        next(error);
    }
});

router.get('/get', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.body.id;
        let token = req.headers['authorization'];

        const resultObj: object = constRes.getResData();
        resultObj['token'] = token;

        if (!id) {
            resultObj['responseCode'] = 400;
            resultObj['resultCode'] = 'fail';
            resultObj['resultMsg'] = '존재하지 않는 아이디입니다.';
            return resultObj;
        }

        const result = await authService.verifyToken(token);
        if (!result) {
            res.send(resultObj);
            return;
        }

        const user = await userService.getUser(id, token);
        resultObj['body'] = user;

        resultObj['resultCode'] = 'success';
        resultObj['resultMsg'] = '정상 처리 되었습니다.';

        res.send(resultObj);
    } catch (error) {
        next(error);
    }
});

router.post('/update', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.body.id;
        const phone: string = req.body.phone;
        let token = req.headers['authorization'];

        const resultObj: object = constRes.getResData();
        resultObj['token'] = token;


        if (!id) {
            resultObj['responseCode'] = 400;
            resultObj['resultCode'] = 'fail';
            resultObj['resultMsg'] = '존재하지 않는 아이디입니다.';
            return resultObj;
        }

        if (!phone) {
            resultObj['responseCode'] = 400;
            resultObj['resultCode'] = 'fail';
            resultObj['resultCode'] = '변경할 휴대폰 번호를 입력해주세요.';
            return resultObj;
        }

        const result = await authService.verifyToken(token);
        if (!result) {
            res.send(resultObj);
            return;
        }

        const user = await userService.updateUser(id, phone, token);
        resultObj['body'] = user;

        resultObj['resultCode'] = 'success';
        resultObj['resultMsg'] = '정상 처리 되었습니다.';

        res.send(resultObj);
    } catch (error) {
        next(error);
    }
});

router.post('/delete', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.body.id;
        // console.log('id:' + id);
        let token = req.headers['authorization'];

        const resultObj: object = constRes.getResData();
        resultObj['token'] = token;

        if (!id) {
            resultObj['responseCode'] = 400;
            resultObj['resultCode'] = 'fail';
            resultObj['resultMsg'] = '존재하지 않는 아이디입니다.';
            return resultObj;
        }

        const result = await authService.verifyToken(token);
        if (!result) {
            res.send(resultObj);
            return;
        }

        await userService.deleteUser(id, token);

        resultObj['resultCode'] = 'success';
        resultObj['resultMsg'] = '정상 처리 되었습니다.';
        res.send(resultObj);
    } catch (error) {
        next(error);
    }
});



export default router;

