var User = require('../../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var jwtConfig = require('../../config/jwtConfig');

module.exports = function () {

    return function (req, res, next) {

        var userFromRequest = {
            email: req.body.email,
            password: req.body.password
        };

        User.find({
            email: userFromRequest.email
        }, function (err, usersFromDatabase) {

            if (err) {
                return res.status(500).send(err);
            } else {

                if (usersFromDatabase.length === 0) {

                    return res.status(403).send('Bad credentials');

                } else {

                    bcrypt.compare(userFromRequest.password, usersFromDatabase[0].password, function (err, result) {
                        if (result === true) {

                            var token = jwt.encode(usersFromDatabase[0], jwtConfig.jwtSecret);

                            return res.status(200).end(res.json(
                                {
                                    email: usersFromDatabase[0].email,
                                    phoneNumber: usersFromDatabase[0].phoneNumber,
                                    token: token
                                }
                            ));

                        } else {
                            return res.status(403).send('Bad credentials');
                        }
                    })
                }
            }

        });

    };

};