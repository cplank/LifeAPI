const db = require('../models');

module.exports = {
    findAll: function (req, res) {
        db.Game.find(req.query)
            .then(dbGame => res.json(dbGame))
            .catch(err => res.status(422).json(err));
    },

    findById: function (req, res) {
        db.Game.findById(req.query.id)
            .then(dbGame => res.json(dbGame))
            .catch(err => res.status(442).json(err));
    },
    create: function (req, res) {
        db.Book.find(req.body)
            .then(dbGame => res.join(dbGame))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Game.findOneAndUpdate({ id: req.params.id }, req.body)
            .then(dbGame => res.josn(dbGame))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        //finds book in db by its id
        db.Game.findById(req.params.id)
            //then deletes the book from db
            .then(dbGame => dbGame.remove())
            //same thing but in json form
            .then(dbGame => res.json(dbGame))
            //catches error
            .catch(err => res.status(422).json(err));
    }
};