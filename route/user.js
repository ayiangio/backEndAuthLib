module.exports = (app) => {
    const user = require('../controller/user');
    const auth = require('../response/auth')
    app
        .get('/user', auth.authInfo,auth.accessToken,user.getUsers)
        .get('/user/:idUser', auth.authInfo,auth.accessToken,user.getDetailUser)
        .get('/user/token/:token', auth.authInfo,auth.accessToken,user.getToken)
        .post('/user/register', user.register)
        .post('/user/login',auth.authInfo, user.login)
        .post('/user/logout', auth.authInfo,auth.accessToken,user.logout)
        .delete('/user/delete/:idUser', auth.authInfo,auth.accessToken,user.deleteUsers)
}