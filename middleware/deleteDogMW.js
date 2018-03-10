var Dog = require('../schema/dog')


module.exports = function () {

    return function (req, res, next) {

        Dog.remove({_id: req.params.dogid}, function (err) {
            if (err) {
                console.log(err)
            } else {
                return res.redirect('/dogs');
            }
        });
    };

};