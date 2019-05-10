const path = require("path")
const router = require("express").Router()
const gameRoutes = require("./games")
const loginRoute = require("./admin")

router.use("/games", gameRoutes)
router.use("/admin", loginRoute)

module.exports = router;