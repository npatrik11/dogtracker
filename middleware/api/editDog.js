var Dog = require("../../schema/dog");

module.exports = function () {

    return function (req, res, next) {

        var dogFromRequest = {
            image: req.body.image,
            name: req.body.name,
            type: req.body.type,
            age: req.body.age,
            sex: req.body.sex
        };

        Dog.update({_id: req.params.dogid}, {$set: dogFromRequest}, function () {
            return res.sendStatus(200);
        });


    };

};