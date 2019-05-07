const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes)

//do we need this if we're hitting our API from a different program?
// router.use((req, res) => {
//     console.log(req.body);
//     res.send('apeye');
// }

// );

router.use((req, res) => {
    console.log(req.body)
    res.send(req.body)
})

module.exports = router;