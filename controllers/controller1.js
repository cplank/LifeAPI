const db = require('../models');

module.exports = {
    findById: function(req, res){
        NAMEOFDB.NAMEOFMODELFILE.findById(req.query.id)
            .then(NAMEOFDB => res.json(NAMEOFDB))
            .catch(err => res.status(442).json(err));
    },
    create:
}