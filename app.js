const express = require("express");
const mongoose = require("mongoose");
const errorHandling = require("./util/error-handling");
const bodyParser = require("body-parser");

require("dotenv").config();

const authRoutes = require("./routes/auth");
const userInfoRoutes = require("./routes/user-info");
const headerMiddleware = require('./middleware/set-headers');

const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(bodyParser.json());

app.use(headerMiddleware);

app.use("/auth", authRoutes);
app.use("/user", userInfoRoutes);

mongoose
	.connect(MONGO_URL)
	.then((result) => {
		console.log("DB connected");
		app.listen(8080);
	})
	.catch(errorHandling);
