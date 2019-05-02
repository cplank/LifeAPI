const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes)

//do we need this if we're hitting our API from a different program?
router.use((req, res) =>
    res.sendFile(path.join(_dirname, "../client/buid/index.html"))
);

module.exports = router;