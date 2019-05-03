const path = require("path")
const router = require("express").Router()
const gameRoutes = require("./games")

router.use("/games", gameRoutes)

module.exports = router;