
module.exports = (app) => {
	const book = require('../controller/book');	
	const auth = require('../response/auth')
	//route Crud Book
	// app.get('/book/filter', book.searchBooks);
	app.get('/book', book.listAll);
	app.get('/book/:idBook', book.listById);
	// app.get('/book', controller.listCatOrLoc);	
	app.post('/book', book.post);
	app.patch('/book/:idBook',  auth.authInfo,auth.accessToken,book.update);
	app.delete('/book/:idBook', auth.authInfo,auth.accessToken,book.delete);
};