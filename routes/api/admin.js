const express = require('express')
const router = express.Router()
const db = require('../../models')
const passport = require('../../passport');


// this route is just used to get the db.Admin basic info
router.get('/admin', (req, res, next) => {
	console.log('===== db.Admin!!======')
	console.log(req.db.Admin)
	if (req.db.Admin) {
		return res.json({ Admin: req.Admin })
	} else {
		return res.json({ Admin: null })
	}
})

router.get('/users', (req, res, next) => {
	db.Admin.find({})
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

	db.Admin.findOne({ 'email': email }, (err, match) => {
		if (match) {
			return res.json({
				error: `Sorry, email is already taken: ${email}`
			})
		}
		const newAdmin = new db.Admin(req.body)
		newAdmin.save((err, savedAdmin) => {
			if (err) return res.json(err)
			return res.json(savedAdmin)
		})
	})
})

module.exports = router