var User = require('../../schema/user');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');

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

                            var secret = 'secret';
                            var token = jwt.encode(usersFromDatabase[0], secret);

                            return res.status(200).end(res.json(
                                {
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