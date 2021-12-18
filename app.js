const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
	res.json({message: process.env.TEST})
  })

app.listen(3000);