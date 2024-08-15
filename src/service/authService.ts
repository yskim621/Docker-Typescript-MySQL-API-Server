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

    // 로그인 성공 시 토큰 발행
    const secretKey: string = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({userId: id}, secretKey);
    console.log('token' + token);

    resultObj['resultCode'] = 'pass';
    resultObj['resultMsg'] = '로그인에 성공하셨습니다.';
    resultObj['token'] = token;

    return resultObj
}

async function verifyToken(token: string) {
    console.log('routes/users > verifyToken > token:' + token);

    let result: boolean = false;
    try {
        const extractedToken = await extractTokenFromReq(token);
        // console.log('extractedToken::' + extractedToken);

        // const decodedToken = jwt.verify(extractedToken, process.env.JWT_SECRET_KEY);
        const secretKey: string = process.env.JWT_SECRET_KEY;
        const decodedToken = jwt.verify(extractedToken, secretKey);
        // console.log('decodedToken::' + JSON.stringify(decodedToken));
        // console.log('decodedToken::' + decodedToken.userId);
        if (!decodedToken) {
            console.log('This is incorrect, please sign in first with accurate information');
            return result;
        }

        const id = decodedToken.userId;
        // console.log('id~~~::::' + id);
        const user: userMngt = await db.getUser(id);
        // console.log('user_id:' + user['id']);
        if (id !== user['id']) {
            console.log('디코딩된 유저 정보가 존재하지 않습니다.');
            return result;
        }

        return true;
    } catch (error){
        console.log('System error occur:' + error);
        return null;
    }
}

async function extractTokenFromReq(token: string) {
    const prefix = 'Bearer ';
    return token?.includes(prefix) ? token.split(prefix)[1] : token;
}



export default {
    signIn,
    verifyToken
}