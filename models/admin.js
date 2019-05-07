const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
mongoose.promise = Promise

const adminSchema = new Schema({
    firstName: { type: String, unique: false },
	lastName: { type: String, unique: false },
    email: { type: String, unique: false, required: true },
    password: { type: String, unique: false, required: true },
    orgName: { type: String, unique: false, required:true}
    
});

// Define schema methods
adminSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.local.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
adminSchema.pre('save', function(next) {
	if (!this.local.password) {
		console.log('=======NO PASSWORD PROVIDED=======')
		next()
	} else {
		this.local.password = this.hashPassword(this.local.password)
		next()
	}
	// this.password = this.hashPassword(this.password)
	// next()
})

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

