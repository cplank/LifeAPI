const router = require("express").Router()
const gameController = require("../../controllers/gameController");

router.route("/")
    .get(gameController.findAll)
    .post(gameController.create);

router.route("/:id")
    .get(gameController.findById)
    .put(gameController.update)
    .delete(gameController.remove);

module.exports = router;