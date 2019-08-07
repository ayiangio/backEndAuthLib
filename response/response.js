const crypto = require('crypto')

module.exports = {

  response: (res, result, status, error,jumlah) => {
    let resultPrint = {}

    resultPrint.error = error || null
    resultPrint.status_code = status || 200
    resultPrint.jumlah = jumlah 
    resultPrint.result = result

    return res.status(resultPrint.status_code).json(resultPrint)
  },
  getRandomSalt :(length)=>{
    return crypto.randomBytes(Math.ceil(length*4)).toString('hex').slice(0,length)
  },
  setPass : (password,salt)=>{
    let hash = crypto.createHmac('sha256',salt)
    hash.update(password)
    let value = hash.digest('hex')
    return{
      salt :salt,
      passHash:value
    }
  }
}