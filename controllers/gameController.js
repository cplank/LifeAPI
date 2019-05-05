const db = require('../models');
const { Traits, Avatar, Question, Response, Outcome } = require("../models/constructors")

module.exports = {
    findAll: function (req, res) {
        console.log(req)
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
        console.log(req.body)
        db.Game.create(req.body)
            .then(dbGame => res.json(dbGame))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Game.findOneAndUpdate({ id: req.params.id }, ({
            avatars: { $push: new Avatar(req.body.name, req.body.t1, req.body.t2, req.body.t3, req.body.t4, req.body.t5) }
        }))
            .then(dbgame => res.json(dbgame))
            .catch(err => res.status(422).json(err));
    },

    // updateQuestion: function (req, res) {
    //     db.Game.findOneAndUpdate({ id: req.params.id }, ({
    //         questions: {
    //             $push: new Questions(req.body.q)
    //         }))
    // }
    remove: function (req, res) {
        db.Game.findById(req.params.id)
            .then(dbgame => dbgame.remove())
            .then(dbgame => res.json(dbgame))
            .catch(err => res.status(422).json(err));
    }
};