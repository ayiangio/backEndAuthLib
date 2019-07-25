module.exports = (app) => {
    const user = require('../controller/user');
    const auth = require('../response/auth')
    app
        .get('/user', auth.authInfo,auth.accessToken,user.getUsers)
        .get('/user/:idUser', auth.authInfo,auth.accessToken,user.getDetailUser)
        .post('/user/register', user.register)
        .post('/user/login',user.login)
        .post('/user/logout', auth.authInfo,auth.accessToken,user.logout)
}