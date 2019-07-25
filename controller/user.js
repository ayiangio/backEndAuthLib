const user = require('../models/user');
const respon = require('../response/response');
const jwt = require('jsonwebtoken')

module.exports = {
    getUsers: (req, res) => {
        user.getUsers()
            .then((resultUser) => {
                resultUser.map((item)=>{
                    delete item.salt
                    delete item.password
                })
                respon.response(res, resultUser, 200)
            })
    },
    getDetailUser: (req, res) => {
        const idUser = req.params.idUser
        console.log(idUser)
        user.getDetailUser(idUser)
            .then((resultUser) => {
                const result = resultUser[0]
                respon.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    register: (req, res) => {
        const salt = respon.getRandomSalt(20)
        const passHash = respon.setPass(req.body.password, salt)

        const data = {
            email: req.body.email,
            fullName: req.body.fullName,
            password: passHash.passHash,
            salt: passHash.salt,
            token: '',
            status: 1
        }
        user.register(data)
            .then((resultUser) => {
                respon.response(res, resultUser, 200)
            })
            .catch((err) => {
                console.log(err)
                respon.response(res, err, 1062)
            })
    },
    login: (req, res) => {
        const email = req.body.email
        const pass = req.body.password
        // const token = req.token || " "
        user.getByEmail(email)
            .then((result) => {
                const dataUser = result[0]
                const userPass = respon.setPass(pass, dataUser.salt).passHash

                if (userPass === dataUser.password) {
                    dataUser.token = jwt.sign({
                        idUser: dataUser.idUser
                    }, process.env.SECRET_KEY, {
                        expiresIn: '30m'
                    })

                    delete dataUser.salt
                    delete dataUser.password
                    user.updateToken(email, dataUser.token)
                        .then((result) => {
                            console.log(result)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    return respon.response(res, dataUser, 200)
                } else {
                    return respon.response(res, null, 403, "Wrong Password !!!")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },
    logout:(req,res)=>{
        const idUser = Number (req.body.idUser)
        console.log(req.body.idUser)
        user.deleteToken(idUser)
        .then((resultUser)=>{
            respon.response(res, resultUser, 200)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}