var Dog = require('../../schema/dog')


module.exports = function () {

    return function (req, res, next) {

        Dog.remove({_id: req.params.dogid}, function (err) {

            if (err) {
                return res.status(500).send('Database error');
            } else {
                return res.status(200).end();
            }
        });

    };

};