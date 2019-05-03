const router = require("express").Router();
const gameController = require("../../controllers/gameController");

router.route("/")
    .get(gameController.findAll)
    .post(gameController.create);

router.route("/updateAvatar/5cccb839e6eb5357088d12e6")
    .get(gameController.findById)
    .put(gameController.updateAvatar)
    .delete(gameController.remove);

module.exports = router;