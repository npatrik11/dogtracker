/**
 * Get the dog list and put the dogs in res.tpl.dogs
 */

module.exports = function (objectRepository) {

    return function (req, res, next) {

        objectRepository.dogModel.find({}, function (err, dogs) {

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