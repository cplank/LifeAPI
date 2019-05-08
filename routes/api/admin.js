const express = require('express')
const router = express.Router()
const Admin = require('./admin')
const passport = require('../../passport');


// this route is just used to get the Admin basic info
router.get('/admin', (req, res, next) => {
	console.log('===== Admin!!======')
	console.log(req.Admin)
	if (req.Admin) {
		return res.json({ Admin: req.Admin })
	} else {
		return res.json({ Admin: null })
	}
})

router.get('/users', (req, res, next) => {
	Admin.find({})
		.then(users => {
			res.json(users)
	})
})

router.post('/login', passport.authenticate('local'), function(req, res) {
		console.log('POST to /login')
		const Admin = JSON.parse(JSON.stringify(req.user)) // hack
		const cleanAdmin = Object.assign({}, Admin)
		// if (cleanAdmin.local) {
		// 	console.log(`Deleting ${cleanAdmin.local.password}`)
		// 	delete cleanAdmin.local.password
		// }
		res.json({ Admin: cleanAdmin })
	}
)

router.post('/logout', (req, res) => {
	if (req.Admin) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no Admin to log out!' })
	}
})

router.post('/signup', (req, res) => {
	const { email } = req.body
	// ADD VALIDATION

	Admin.findOne({ 'email': email }, (err, match) => {
		if (match) {
			return res.json({
				error: `Sorry, already a Admin with the email: ${email}`
			})
		}
		const newAdmin = new Admin(req.body)
		newAdmin.save((err, savedAdmin) => {
			if (err) return res.json(err)
			return res.json(savedAdmin)
		})
	})
})

module.exports = router