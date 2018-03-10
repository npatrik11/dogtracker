var User = require('../schema/user');
var bcrypt = require('bcrypt');

module.exports = function () {

    return function (req, res, next) {

        var userFromRequest = {
            email: req.body.loginInputEmail,
            password: req.body.loginInputPassword
        };

        User.find({
            email: userFromRequest.email,
        }, function (err, usersFromDatabase) {

            if (err) {
                res.tpl.error.push(err);
                return next();
            } else {

                if (usersFromDatabase.length === 0) {

                    res.tpl.error.push('Bad credentials');
                    return next();


                } else {

                    bcrypt.compare(userFromRequest.password, usersFromDatabase[0].password, function (err, result) {
                        if (result === true) {
                            req.session.user = usersFromDatabase[0];
                            return res.redirect('/dogs');
                        } else {
                            res.tpl.error.push('Bad credentials');
                            return next();
                        }
                    })
                }
            }

        });

    };

};