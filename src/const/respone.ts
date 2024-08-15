function getResData() {
    return{
        responseCode: 200,
        resultCode: 'fail',
        resultMsg: '토큰이 올바르지 않습니다. 로그인 후 다시 진행 바랍니다,',
        token: '',
        body: {}
    }
}

export default {
    getResData
}