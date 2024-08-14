import * as db from "../database";
import * as jwt from 'jsonwebtoken';

import userMngt from "../interfaces/user";

async function signIn(id: string, pw: string) {
    const resultObj: object = {
        responseCode: 200,
        resultCode: 'fail',
        resultMsg: '아이디 혹은 비밀번호가 일치하지 않습니다.',
        token: ''
    };
    // console.log('auth Service call!!!!!!!!!!!!!!!!!!!!!!!!!');
    // console.log('checking params in service~~' + '> id:' + id, "pw:" + pw);

    const user: userMngt = await db.getUser(id);
    // console.log('user:' + user.id);

    if (user.id !== id || user.pw !== pw) {
        console.log('아이디 혹은 비밀번호가 일치하지 않습니다.');
        return resultObj;
    }

    const secretKey: string = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({userId: id}, secretKey);
    console.log('token' + token);

    resultObj['resultCode'] = 'pass';
    resultObj['resultMsg'] = '로그인에 성공하셨습니다.';
    resultObj['token'] = token;

    return resultObj

}



export default {
    signIn
}