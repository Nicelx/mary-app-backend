const User = require('../models/User');

exports.login = async (req, res, next) => {
	try {
		const {login, password} = req.body;
		const user = await User.findOne({login});
		console.log(user);
		const isLogin = await user.isCorrectPassword(password)
		console.log(isLogin);
		if (isLogin) {
			res.json({message: 'fulfilled', isLogin})
		} else {
			throw new Error('Incorrect login data')
		}
	} catch(e) {
		console.log(e);
	}
	
	
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