const conn = require('../connection/connect');

var borrow = function borrow(data) {
	(this.idBook = data.idBook), (this.idUser = data.idUser),
		(this.dateBorrow = data.dateBorrow),
		(this.dateReturn = data.dateReturn), (this.expireDate = data.expireDate),
		(this.penalty = data.penalty);
};

borrow.getList = (idBook) => {
	console.log(idBook)
	return new Promise((resolve, reject) => {
		conn.query(
			`SELECT *
				FROM borrow 
				WHERE idBook = ? and dateReturn is null`, idBook,
			(err, res) => {
				if (!err) {
					resolve(res);
				} else {
					reject(new Error(err));
				}
			}
		);
	});
};

borrow.getAllList = () => {
	return new Promise((resolve, reject) => {
		conn.query(
			`SELECT borrow.dateBorrow,borrow.dateReturn,penalty,user.fullName,book.bookName
			FROM borrow 
			INNER JOIN user
			ON borrow.idUser = user.idUser
			INNER JOIN book 
			ON borrow.idBook = book.idBook
			ORDER BY borrow.dateReturn, borrow.dateBorrow DESC`,
			(err, res) => {
				if (!err) {
					resolve(res);
				} else {
					reject(new Error(err));
				}
			}
		);
	});
};

borrow.getListId = (idUser) => {
	return new Promise((resolve, reject) => {
		conn.query(
			`SELECT borrow.dateBorrow,borrow.dateReturn,penalty,user.fullName,book.bookName,book.image
				FROM borrow 
				INNER JOIN user
				ON borrow.idUser = user.idUser
				INNER JOIN book 
				ON borrow.idBook = book.idBook
				WHERE borrow.idUser = ?`, Number(idUser),
			(err, res) => {
				if (!err) {
					resolve(res);
				} else {
					reject(new Error(err));
				}
			}
		);
	});
};

borrow.createBorrow = (newBorrow, result) => {
	return new Promise((resolve, reject) => {
		conn.query('INSERT INTO borrow SET ?', newBorrow, (err, res) => {
			if (!err) {
				resolve(newBorrow)
			} else {
				reject(new Error(err))
			}
		});
		console.log(newBorrow.idUser)
		console.log(newBorrow.idBook)
		conn.query(`UPDATE book SET statusBorrow = 1, idUser = ? WHERE idBook =?`, [newBorrow.idUser,newBorrow.idBook])
	})
};

borrow.updateById = (idBook, date, penalty, result) => {
	return new Promise((resolve, reject) => {
		console.log(penalty)
		conn.query(`UPDATE borrow SET dateReturn = ? ,penalty = ? WHERE idBook =? and dateReturn is null`, [date, penalty, idBook], (err, res) => {
			if (!err) {
				resolve(res);
			} else {
				reject(new Error(err));
			}
		});
		conn.query(`UPDATE book SET statusBorrow = 0, idUser =0 WHERE idBook =?`, [idBook])
	})
};
module.exports = borrow;