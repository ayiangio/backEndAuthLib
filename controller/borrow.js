const borrow = require('../models/borrow');
const respon = require('../response/response');

exports.getById = (req, res) => {
    let idBook = Number (req.params.idBook);
	borrow.getList(idBook)
		.then((resultBook) => {
			respon.response(res, resultBook, 200);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.post = (req,res)=>{
    let date = new Date();
    date.setDate(date.getDate() + 3);
    const newBorrow = {
        idBook: req.body.idBook,
        idUser: req.body.idUser,
        dateBorrow: new Date(),
        dateReturn : null,
        expireDate:date,
		penalty : null
        }
	borrow.createBorrow(newBorrow)
		.then(() => {
			respon.response(res, newBorrow, 200);
		})
		.catch((err) => {
			console.log(err);
    });
}

exports.update = (req, res) => {
    let idBook = Number (req.params.idBook);
    let date = new Date();
	let penalty = req.body.penalty;
	console.log(penalty)
	borrow.updateById(idBook,date,penalty)
		.then((result)=>{
			respon.response(res,result,200)
		})
		.catch((err)=>{
			console.log(err)
		})
};