const express = require('express');
const mongoose = require('mongoose');
const errorHandling = require('./util/error-handling');

require('dotenv').config();

const User = require('./models/User');

const MONGO_URL = process.env.MONGO_URL;

console.log(MONGO_URL);

const app = express();

app.get('/', (req, res) => {
	// res.json({message: process.env.TEST})
	const user = new User({name : 'mee'});
	user.save().then(result => {
		res.json({message: 'User created'})
	});
  })

app.listen(3000);

mongoose
	.connect(MONGO_URL)
	.then((result) => {
		console.log('DB connected')
		app.listen(8080);
	})
	.catch(errorHandling);
