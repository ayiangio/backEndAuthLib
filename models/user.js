const connection = require('../connection/connect');

module.exports = {
    getUsers: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM user`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getDetailUser: (idUser) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE idUser = ?', Number(idUser), (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    register: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO user SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    getByEmail: (email) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT idUser, email, fullName, salt, password, status FROM user WHERE email = ?', email, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })

        })
    },
    updateToken: (email, token) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE user SET token = ? WHERE email =?`, [token, email], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteToken: (idUser) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE user SET token = ? WHERE idUser =?`, [' ', idUser], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}