const User = require('../models/User');

exports.login = async (req, res, next) => {
	console.log(req.body);
	res.json({message: 'fulfilled'})
}