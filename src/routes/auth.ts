import * as express from 'express';
import {NextFunction} from "express-serve-static-core";
import authService from '../service/authService';

const router: express.Router = express.Router();


// console.log('routes/auth >>>>>>>>>>>>>>>>> routing test!!!!!!!!!!!!!!!!!!!');

router.post('/signIn', async (req: express.Request, res: express.Response, next: NextFunction) => {
    console.log('/api/auth/signIn fn call!!!!!!!!!!!!!!!!!!!!!!!!!')
    try {
        const id: string = req.body.id;
        const pw: string = req.body.pw;
        console.log('id:' + id, "pw:" + pw);
        if (!id || !pw) return res.sendStatus(400);

        const resultObj = await authService.signIn(id, pw);

        res.send(resultObj);
    } catch (error) {
        next(error);
    }
});


export default router;





