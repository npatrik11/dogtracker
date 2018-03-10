var Dog = require('../schema/dog')
var User = require('../schema/user')

/**
 * Get the dog list and put the dogs in res.tpl.dogs
 */

module.exports = function () {

    return function (req, res, next) {

        Dog.find({}, function (err, dogs) {

            if (err) {
                res.tpl.error.push(err);
                return next();
            } else {

                res.tpl.user = req.session.user;
                res.tpl.dogs = dogs;
                return next();
            }
        })
    };

};