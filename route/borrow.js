module.exports = (app) =>{

	const borrow = require('../controller/borrow');
	const auth = require('../response/auth')
	//route Borrow
	app.get('/borrow/:idBook',auth.authInfo,auth.accessToken,borrow.getById)
	app.get('/borrow/',auth.authInfo,auth.accessToken,borrow.getAll)
	app.get('/borrow/list/:idUser',auth.authInfo,auth.accessToken,borrow.getListById)
	app.post('/borrow',auth.authInfo,auth.accessToken, borrow.post)
	app.patch('/borrow/:idBook', auth.authInfo,auth.accessToken,borrow.update)
}