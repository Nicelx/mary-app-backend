const express = require('express');
const mongoose = require('mongoose');
const errorHandling = require('./util/error-handling');
const bodyParser = require('body-parser');

require('dotenv').config();

const User = require('./models/User');

const {login} = require('./controllers/auth');
const {signUp} = require('./controllers/auth')

const MONGO_URL = process.env.MONGO_URL;

console.log(MONGO_URL);

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "*");
	next();
});

app.get('/', async (req, res) => {
	const users = await User.find();
	res.json(users);
  })

app.post('/auth/login', login);
app.post('/auth/signup', signUp);

mongoose
	.connect(MONGO_URL)
	.then((result) => {
		console.log('DB connected')
		app.listen(8080);
	})
	.catch(errorHandling);
