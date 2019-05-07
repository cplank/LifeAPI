const path = require("path")
const router = require("express").Router()
const gameRoutes = require("./games")
// const loginRoute = require('../models/auth')

router.use("/games", gameRoutes)
// router.use('/auth', loginRoute)

module.exports = router;