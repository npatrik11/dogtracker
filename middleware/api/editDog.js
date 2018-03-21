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

        if (dogFromRequest.name.length === 0) {
            return res.send(422).end('Name is not filled');
        }

        if (dogFromRequest.type.length === 0) {
            return res.send(422).end('Type is not filled')
        }

        if (dogFromRequest.age.length === 0) {
            return res.send(422).end('Age is not filled')
        }

        if (dogFromRequest.sex.length === 0) {
            return res.send(422).end('Sex is not filled')
        }

        Dog.update({_id: req.params.dogid}, {$set: dogFromRequest}, function () {
            return res.send(200);
        });


    };

};