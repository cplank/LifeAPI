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
        db.Game.create({
            name: req.body.name,
            traits: new Traits(req.body.trait1, req.body.trait2, req.body.trait3, req.body.trait4, req.body.trait5),
            avatars: [new Avatar(req.body.name, req.body.t1, req.body.t2, req.body.t3, req.body.t4, req.body.t5),
            ],
            questions: [new Question(req.body.q, new Response(req.body.r, req.body.oc), new Outcome(req.body.trait, req.body.amount, req.body.upDown), req.body.trait1, req.body.trait2)]
        }
        })
            .then(dbGame => res.json(dbGame))
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