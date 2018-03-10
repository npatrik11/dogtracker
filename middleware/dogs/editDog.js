var Dog = require("../../schema/dog");
var fs = require('fs-extra');


module.exports = function () {

    return function (req, res, next) {

        var dogFromRequest = {
            name: req.body.editInputName,
            type: req.body.editInputType,
            age: req.body.editInputAge,
            sex: req.body.editInputSex,
            userEmail: req.session.user.email
        };

        if (req.file == null) {
            console.log('New Image file not picked')
        } else {
            dogFromRequest.image = fs.readFileSync(req.file.path).toString('base64');
        }

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

        Dog.update({_id: req.params.dogid}, {$set: dogFromRequest}, function () {
            return res.redirect('/dogs');
        });


    };

};