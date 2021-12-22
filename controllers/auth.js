const User = require('../models/User');

exports.login = async (req, res, next) => {
	console.log(req.body);
	res.json({message: 'fulfilled'})
}

exports.signUp = async (req, res, next) => {
	const {name, password, login} = req.body;
	console.log(name, password);
	const user = await new User({
		name, password, login
	})
	await user.save();
	res.status(201).json({message:'created'})
}