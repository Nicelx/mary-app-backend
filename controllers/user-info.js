const User = require('../models/User');

exports.publicUserInfo =  async(req, res, next) => {
	const userId = req.params.userId;

	console.log(userId);
	const user = await User.findById(userId);

	res.json({
		name: user.name,
	})

} 