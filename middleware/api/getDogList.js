var Dog = require('../../models/dog')

/**
 * Get the dog list and put the dogs in res.tpl.dogs
 */

module.exports = function () {

    return function (req, res, next) {

        Dog.find({}, function (err, dogs) {

            if (err) {
                return res.status(500).send('Database error');
            } else {

                return res.status(200).end(res.json(dogs));
            }
        })
    };

};