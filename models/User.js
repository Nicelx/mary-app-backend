const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const saltRounds = 10;

const userSchema = new Schema({
	login: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	city : {
		type: String,
	},
	birthdate : {
		type : Date,
	},
	avatar: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
});

userSchema.pre("save", function (next) {
	if (this.isNew || this.isModified("password")) {
		const document = this;
		bcrypt.hash(document.password, saltRounds, function (err, hashedPassword) {
			if (err) {
				next(err);
			} else {
				document.password = hashedPassword;
				next();
			}
		});
	} else {
		next();
	}
});

userSchema.methods.isCorrectPassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (err) {
		throw new Error("password is not correct");
	}

};

module.exports = mongoose.model("User", userSchema);
