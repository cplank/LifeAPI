const express = require('express')
const router = express.Router()
const Admin = require('./admin')
const passport = require('../passport')


// this route is just used to get the Admin basic info
router.get('/Admin', (req, res, next) => {
	console.log('===== Admin!!======')
	console.log(req.Admin)
	if (req.Admin) {
		return res.json({ Admin: req.Admin })
	} else {
		return res.json({ Admin: null })
	}
})

router.post(
	'/login',
	function(req, res, next) {
		console.log(req.body)
		console.log('================')
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
		console.log('POST to /login')
		const Admin = JSON.parse(JSON.stringify(req.Admin)) // hack
		const cleanAdmin = Object.assign({}, Admin)
		if (cleanAdmin.local) {
			console.log(`Deleting ${cleanAdmin.local.password}`)
			delete cleanAdmin.local.password
		}
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
	const { Adminname, password } = req.body
	// ADD VALIDATION
	Admin.findOne({ 'local.Adminname': Adminname }, (err, AdminMatch) => {
		if (AdminMatch) {
			return res.json({
				error: `Sorry, already a Admin with the Adminname: ${Adminname}`
			})
		}
		const newAdmin = new Admin({
			'local.Adminname': Adminname,
			'local.password': password
		})
		newAdmin.save((err, savedAdmin) => {
			if (err) return res.json(err)
			return res.json(savedAdmin)
		})
	})
})

module.exports = router