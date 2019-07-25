const jwt = require('jsonwebtoken')
const respon = require('./response');
const allowedAccess = process.env.REQUEST_HEADERS

module.exports = {
    authInfo: (req, res, next) => {
        const headerAuth = req.headers['authorization']
        const headerSecret = req.headers['x-access-token']
        console.log(allowedAccess)
        if (headerAuth !== allowedAccess) {
            return respon.response(res, null, 401, 'Unauthorized, Need access token!')
        } else if (typeof headerSecret === 'undefined') {
            next()
        } else {
            const bearerToken = headerSecret.split(' ')
            const token = bearerToken[1]
            req.token = token
            console.log('Token Stored ! ' + token)
            next()
        }
    },
    accessToken: (req, res, next) => {
        const secretKey = process.env.SECRET_KEY
        const accessToken = req.token
        const userToken = req.headers['x-control-user']

        jwt.verify(accessToken, secretKey, (err, decoded) => {
            if (err && err.name === 'TokenExpiredError') return respon.response(res, null, 402, 'Token expired')

            if (err && err.name === 'JsonWebTokenError') return respon.response(res, null, 401, 'Invalid Token')

            if (parseInt(userToken) !== parseInt(decoded.idUser)) return respon.response(res, null, 401, 'Invalid User Token')
            console.log(decoded)
            next()
        })
    }
}