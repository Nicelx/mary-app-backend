const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

exports.login = async (req, res, next) => {
	try {
		const { login, password } = req.body;
		const user = await User.findOne({ login });
		if (!user) {
			const error = new Error("User not found");
			error.status = 401;
			throw error;
		}

		const isLogin = await user.isCorrectPassword(password);
		if (isLogin) {
			const payload = { login: user.login, userId: user._id.toString() };

			const token = jwt.sign(payload, secret, {
				expiresIn: "1h",
			});
			res.status(200).json({ token, userId: user._id.toString() });
		} else {
			throw new Error("Incorrect login data");
		}
	} catch (e) {
		console.log(e);
	}
};

exports.signUp = async (req, res, next) => {
	const { name, password, login } = req.body;
	
	const user = await new User({
		name,
		password,
		login,
	});
	await user.save();
	res.status(201).json({ message: "created" });
};
