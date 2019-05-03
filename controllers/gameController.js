const db = require('../models');
const { Traits, Avatar, Question, Response, Outcome } = require("../models/constructors")

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
        db.Game.create({
            name: req.body.name,
            traits: new Traits(req.body.trait1, req.body.trait2, req.body.trait3, req.body.trait4, req.body.trait5),
            avatars: [],
            questions: []
        })
            .then(dbGame => res.json(dbGame))
            .catch(err => res.status(422).json(err));
    },
    updateAvatar: function (req, res) {
        db.Game.findOneAndUpdate({ id: req.params.id }, ({
            avatars: { $push: new Avatar(req.body.name, req.body.t1, req.body.t2, req.body.t3, req.body.t4, req.body.t5) }
        }))
            .then(dbgame => res.josn(dbgame))
            .catch(err => res.status(422).json(err));
    },

    updateQuestion: function (req, res) {
        db.Game.findOneAndUpdate({ id: req.params.id }, (
            
        ))
    }
    remove: function (req, res) {
        db.Game.findById(req.params.id)
            .then(dbgame => dbgame.remove())
            .then(dbgame => res.json(dbgame))
            .catch(err => res.status(422).json(err));
    }
};