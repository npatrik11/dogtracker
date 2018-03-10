var Dog = require("../schema/dog");
var fs = require('fs-extra');


module.exports = function () {

    return function (req, res, next) {

        if (req.file == null) {
            res.tpl.error.push('Image file not picked')
        } else {
            var encodedImage = fs.readFileSync(req.file.path).toString('base64');
        }

        var dogFromRequest = {
            image: encodedImage,
            name: req.body.uploadInputName,
            type: req.body.uploadInputType,
            age: req.body.uploadInputAge,
            sex: req.body.uploadInputSex,
            userEmail: req.session.user.email,
            userPhone: req.session.user.phoneNumber
        };

        if (dogFromRequest.name.length === 0) {
            res.tpl.error.push('Name is not filled')
        }

        if (dogFromRequest.type.length === 0) {
            res.tpl.error.push('Type is not filled')
        }

        if (dogFromRequest.age.length === 0) {
            res.tpl.error.push('Age is not filled')
        }

        if (dogFromRequest.sex.length === 0) {
            res.tpl.error.push('Sex is not filled')
        }

        if (res.tpl.error.length > 0) {
            return next();
        }

        Dog.create(dogFromRequest, function (err, dog) {
            if (err) {
                res.tpl.error.push(err);
                return next();
            } else {
                return res.redirect('/dogs');
            }
        })

    };

};