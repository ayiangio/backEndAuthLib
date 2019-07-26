const conn = require('../connection/connect');

var book = function book(data) {
	(this.bookName = data.bookName), (this.author = data.author), (this.desc = data.desc),
    (this.locRack = data.locRack),
    (this.image = data.image),(this.idCat = data.idCat),( this.statusBorrow = data.statusBorrow) ;
};

book.getList = () => {
	return new Promise((resolve, reject) => {
		conn.query(
			`SELECT book.idBook, book.bookName, book.author, 
			book.locRack, book.image, category.catName, book.desc, book.statusBorrow as Status
				FROM book 
				INNER JOIN category
				ON book.idCat = category.idCat`,
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
book.search = (search) => {
	return new Promise((resolve, reject) => {
		conn.query(
			`SELECT book.idBook, book.bookName, book.author, 
			book.locRack, book.image, category.catName, book.desc, book.statusBorrow as Status
				FROM book 
				INNER JOIN category
				ON book.idCat = category.idCat
				WHERE bookName LIKE ? `,[`${search}%`],
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
book.getListById = (idBook, result) => {
	return new Promise ((resolve,reject)=>{
		conn.query(
			`SELECT book.idBook, book.bookName, book.author, book.locRack, book.image, category.catName,
					book.desc,book.statusBorrow as Status, book.idUser
					FROM book 
					INNER JOIN category
					ON book.idCat = category.idCat					
					WHERE book.idBook = ?`,
			Number(idBook),
			(err, res) => {
				if (!err) {
					resolve(res);
				} else {
					reject(new Error(err));
				}
			}
		);
	})
};
book.createBook = (newBook, result) => {
	return new Promise ((resolve,reject)=>{
		conn.query('INSERT INTO book SET ?', newBook, (err, res) => {
			if (!err) {
				resolve(res)
			} else {
				reject(new Error(err))
			}
		});
	})
};

book.updateById = (idBook, bookUpdate, result) => {
	return new Promise ((resolve,reject)=>{
		conn.query(`UPDATE book SET ? WHERE idBook =?`, [ bookUpdate, idBook ], (err, res) => {
			if (!err) {
				resolve(res);
			} else {
				reject(new Error(err));
			}
		});
	})
};

book.delete = (idBook, result) => {
	return new Promise((resolve,reject)=>{
		conn.query(`DELETE FROM book WHERE idBook = ?`, idBook, (err, res) => {
			if (!err) {
				resolve(res);
			} else {
				reject(new Error(err));
			}
		});
	})
};
module.exports = book;