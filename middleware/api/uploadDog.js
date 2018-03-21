var Dog = require("../../schema/dog");
var fs = require('fs-extra');


module.exports = function () {

    return function (req, res, next) {

        var dogFromRequest = {
            image: req.body.image,
            name: req.body.name,
            type: req.body.type,
            age: req.body.age,
            sex: req.body.sex,
            userEmail: req.body.userEmail,
            userPhone: req.body.userPhone
        };

        Dog.create(dogFromRequest, function (err, dog) {
            if (err) {
                return res.sendStatus(500);
            } else {
                return res.sendStatus(201);
            }
        })

    };

};