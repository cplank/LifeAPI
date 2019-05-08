const Admin = require('../models/admin')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password' // not necessary, DEFAULT
	},
	function(email, password, done) {
		console.log('LOGGING IN')
		Admin.findOne({ "email": email}, (err, userMatch) => {
			if (err) {
				return done(err)
			}
			if (!userMatch) {
				return done(null, false, { message: 'Incorrect email' })
			}
			if (!userMatch.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, userMatch)
		})
	}
)

module.exports = strategy
