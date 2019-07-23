module.exports = (app) => {
    const user = require('../controller/user');
    const auth = require('../response/auth')
    app
        // .all('/*', auth.authInfo)
        .get('/user', auth.authInfo,user.getUsers)
        .get('/user/:userid', auth.authInfo,user.getDetailUser)
        .post('/user/register', user.register)
        .post('/user/login',user.login)
        .post('/user/logout', auth.authInfo,user.logout)
}