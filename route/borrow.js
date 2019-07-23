module.exports = (app) =>{

	const borrow = require('../controller/borrow');
	const auth = require('../response/auth')
	//route Borrow
	app.get('/borrow/:idBook',auth.authInfo,borrow.getById)
	app.post('/borrow', borrow.post)
	app.patch('/borrow/:idBook', borrow.update)
}