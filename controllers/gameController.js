const db = require('../models');

module.exports = {
    findAll: function (req, res) {
        db.Game.find(req.query)
            .then(dbgame => res.json(dbgame))
            .catch(err => res.status(422).json(err));
    },

    findById: function (req, res) {
        db.Game.findById(req.query.id)
            .then(dbgame => res.json(dbgame))
            .catch(err => res.status(442).json(err));
    },
    create: function (req, res) {
        db.Game.create(req.body)
            .then(dbgame => res.join(dbgame))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Game.findOneAndUpdate({ id: req.params.id }, req.body)
            .then(dbgame => res.josn(dbgame))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        //finds book in db by its id
        db.Game.findById(req.params.id)
            //then deletes the book from db
            .then(dbgame => dbgame.remove())
            //same thing but in json form
            .then(dbgame => res.json(dbgame))
            //catches error
            .catch(err => res.status(422).json(err));
    }
};