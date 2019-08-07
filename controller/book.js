const book = require('../models/book');
const respon = require('../response/response');
const cloudinary = require('cloudinary')

exports.listAll = (req, res) => {
	let jumlah =0
	book.getCountList()
	.then((resultBook)=>{
		jumlah = resultBook.length
		console.log(jumlah)
	})
	let page = parseInt(req.query.page) || 1
	book
		.getList(page)
		.then((resultBook) => {
			respon.response(res, resultBook, 200,null,jumlah);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.listById = (req, res) => {
	const idBook = Number(req.params.idBook);
	book
		.getListById(idBook)
		.then((resultBook) => {
			respon.response(res, resultBook, 200);
		})
		.catch((err) => {
			console.log(err);
		});
};
exports.searchBooks = (req, res) => {
	const search = req.query.search ;
	book
		.search(search)
		.then((resultBook) => {
			respon.response(res, resultBook, 200);
		})
		.catch((err) => {
			console.log(err);
		});
};
exports.post = async (req, res) => {
	let path = req.file.path
	let geturl = async (req) => {
		cloudinary.config({
			cloud_name: process.env.NAME,
			api_key: process.env.APIKEY,
			api_secret: process.env.APISECRET
		})

		let data
		await cloudinary.uploader.upload(path, (result) => {
			const fs = require('fs')
			fs.unlinkSync(path)
			data = result.url
		})

		return data
	}
	
	let newBook = {
		bookName: req.body.bookName,
		author: req.body.author,
		desc: req.body.desc,
		locRack: req.body.locRack,
		image:  await geturl(),
		idCat: req.body.idCat,
		statusBorrow: 0
	};

	book
		.createBook(newBook)
		.then((result) => {
			respon.response(res, {...newBook, idBook : result.insertId}, 200);
		})
		.catch((err) => {
			// return respon.response(res, null, 403, "Book is Avalaible !!!")
			console.log(err)
		});
};

exports.update = (req, res) => {
	let idBook = req.params.idBook;
	let updateBook = {
		bookName: req.body.bookName,
		author: req.body.author,
		desc: req.body.desc,
		locRack: req.body.locRack,
		image: req.body.image,
		idCat: req.body.idCat,
		statusBorrow: req.body.statusBorrow
	};
	book
		.updateById(idBook, updateBook)
		.then(() => {
			respon.response(res, {...updateBook, idBook : idBook}, 200);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.delete = (req, res) => {
	let idBook = req.params.idBook;
	book
		.delete(idBook)
		.then(() => {
			respon.response(res, idBook, 200);
		})
		.catch((err) => {
			console.log(err);
		});
};
