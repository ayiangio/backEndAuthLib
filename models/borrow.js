const conn = require('../connection/connect');

var borrow = function borrow(data) {
	(this.idBook = data.idBook), (this.idUser = data.idUser), 
    (this.dateBorrow = data.dateBorrow),
    (this.dateReturn = data.dateReturn),(this.expireDate = data.expireDate),
    (this.penalty = data.penalty) ;
};

borrow.getList = (idBook) => {
	console.log(idBook)
	return new Promise((resolve, reject) => {
		conn.query(
            `SELECT *
				FROM borrow 
				WHERE idBook = ? and dateReturn is null`,idBook,
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
	return new Promise ((resolve,reject)=>{
		conn.query('INSERT INTO borrow SET ?', newBorrow, (err, res) => {
			if (!err) {
				resolve(newBorrow)
			} else {
				reject(new Error(err))
			}
        });
        conn.query(`UPDATE book SET statusBorrow = 1 WHERE idBook =?`, [newBorrow.idBook])
	})
};

borrow.updateById = (idBook, date ,penalty,result) => {
	return new Promise ((resolve,reject)=>{
        console.log(penalty)
        conn.query(`UPDATE borrow SET dateReturn = ? ,penalty = ? WHERE idBook =? and dateReturn is null`, [date,penalty,idBook], (err, res) => {
			if (!err) {
				resolve(res);
			} else {
				reject(new Error(err));
			}
        });
        conn.query(`UPDATE book SET statusBorrow = 0 WHERE idBook =?`, [idBook])
	})
};
module.exports = borrow;