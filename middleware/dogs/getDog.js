/**
 * Get the dog image and put the dogs in res.tpl.dogImage
 */

module.exports = function (objectRepository) {

    return function (req, res, next) {

        objectRepository.dogModel.find({
            _id:req.params.dogid
        }, function (err, dogs) {

            if (err) {
                res.tpl.error.push(err);
                return next();
            } else {
                res.tpl.dog = dogs[0];
                return next();
            }
        })
    };

};