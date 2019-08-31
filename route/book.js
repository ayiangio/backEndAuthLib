
module.exports = (app) => {
	const book = require('../controller/book');
	const auth = require('../response/auth')
	const multer = require('multer');

	const storage = multer.diskStorage({
		filename: function (req, file, cb) {
			cb(null, file.originalname);
		}
	})
	let upload = multer({ storage: storage, limits: { fileSize: 100000000 } })

	// upload.single('image'),
	//route Crud Book
	// app.get('/book/filter', book.searchBooks);
	app.get('/book', book.listAll);
	app.get('/book/:idBook', book.listById);
	// app.get('/book', controller.listCatOrLoc);	
	app.post('/book',upload.single('image'), book.post);
	app.patch('/book/:idBook', auth.authInfo, auth.accessToken, book.update);
	app.delete('/book/:idBook', auth.authInfo, auth.accessToken, book.delete);
};