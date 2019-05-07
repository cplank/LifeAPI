const db = require('../models');


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

        db.Game.create(req.body)
            .then(dbGame => { console.log('return: ', (dbGame)); res.json(dbGame) })
            .catch(err => { console.log(err); res.status(422).json(err) });
    },
    update: function (req, res) {
        console.log(req.params.id)
        console.log(req.body)
        db.Game.findOneAndUpdate(
            { _id: req.params.id },
            req.body)
            // { upsert: false, new: true, runValidators: true })
            .then(dbgame => { res.json(dbgame); console.log(dbgame) })
            .catch(err => console.log(err))
    },

    remove: function (req, res) {
        db.Game.findById(req.params.id)
            .then(dbgame => dbgame.remove())
            .then(dbgame => res.json(dbgame))
            .catch(err => res.status(422).json(err));
    }
};