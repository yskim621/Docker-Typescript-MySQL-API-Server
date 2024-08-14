import * as express from 'express';
import {NextFunction} from "express-serve-static-core";
import * as jwt from 'jsonwebtoken';
import authService from '../service/authService';

const router: express.Router = express.Router();


console.log('routes/auth >>>>>>>>>>>>>>>>> routing test!!!!!!!!!!!!!!!!!!!');

router.post('/signIn', async (req: express.Request, res: express.Response, next: NextFunction) => {
    console.log('/api/auth/signIn fn call!!!!!!!!!!!!!!!!!!!!!!!!!dsailjdaslid')
    try {
        const id: string = req.body.id;
        const pw: string = req.body.pw;
        console.log('id:' + id, "pw:" + pw);
        await authService.signIn(id, pw);

        const secretKey: string = process.env.JWT_SECRET_KEY || "jwt-secret-key";
        const token = jwt.sign({userId: id}, secretKey);
        console.log('token' + token);

        if (!id || !pw) return res.sendStatus(400);
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});


export default router;





