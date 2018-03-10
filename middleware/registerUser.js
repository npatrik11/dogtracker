var User = require("../schema/user");

module.exports = function () {

    return function (req, res, next) {

        var userFromRequest = {
            email: req.body.registerInputEmail,
            password: req.body.registerInputPassword,
            phoneNumber: req.body.registerInputPhoneNumber
        };

        if (userFromRequest.email.length === 0) {
            res.tpl.error.push('Email is not filled')
        }

        if (userFromRequest.password.length === 0) {
            res.tpl.error.push('Password is not filled')
        }

        if (userFromRequest.phoneNumber.length === 0) {
            res.tpl.error.push('Phone number is not filled')
        }

        if (res.tpl.error.length > 0) {
            return next();
        }

        User.find({
            email: userFromRequest.email
        }, function (err, usersFromDatabase) {

            if (err) {
                res.tpl.error.push(err);
                return next();
            } else {

                if (usersFromDatabase.length === 0) {

                    User.create(userFromRequest, function (err, user) {
                        if (err) {
                            res.tpl.error.push(err);
                            return next();
                        } else {
                            return res.redirect('/login');
                        }
                    })

                } else {
                    res.tpl.error.push('User already exists with email: '+userFromRequest.email);
                    return next();
                }
            }

        });

    };

};