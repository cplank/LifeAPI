const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
mongoose.promise = Promise

const adminSchema = new Schema({
	_id: Schema.Types.ObjectId,
	firstName: { type: String, unique: false },
	lastName: { type: String, unique: false },
	email: { type: String, unique: false, required: true },
	password: { type: String, unique: false, required: true },
	games:[{type: Schema.Types.ObjectId, ref: 'Game'}],
	orgName: { type: String, unique: false, required:true }
	
});

adminSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

  
  //hashing a password before saving it to the database
  adminSchema.pre('save', function (next) {
		var user = this;
		bcrypt.hash(user.password, 10, function (err, hash) {
			if (err) {
			return next(err);
			}
			user.password = hash;
			next();
		})
  });

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

