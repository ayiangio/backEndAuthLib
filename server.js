require('dotenv').config();
const express = require('express');
const app = express();
const Cors = require('cors')
const xssFilter = require('x-xss-protection')
const logger = require('morgan')
const port = process.env.PORT;
const bodyPraser = require('body-parser');
const book = require('./route/book');
const borrow = require('./route/borrow');
const user = require('./route/user');

app.use(
	bodyPraser.urlencoded({
		extended: false
	})
);


app.use(bodyPraser.json());
const whitelist = process.env.WHITELIST
app.listen(port);
const corsOptions = (req, callback) => {
	if (whitelist.split(',').indexOf(req.header('Origin')) !== -1) {
	  console.log('Success')
	  return callback(null, {
		origin: true
	  })
	} else {
	  console.log('Failed')
	  return callback(null, {
		origin: false
	  })
	}
  }
app.use(Cors())
app.options('*', Cors(corsOptions))
app.use(xssFilter())
console.log('Connect Succes On '+port);
app.use(logger('dev'))

//Route to endpoint
book(app);
borrow(app)
user(app)