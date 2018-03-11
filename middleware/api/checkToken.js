var User = require('../../schema/user');
var jwt = require('jwt-simple');
var jwtConfig = require('../../config/jwtConfig');


module.exports = function () {

    return function (req, res, next) {

        if (req.token === undefined)
        {
            return res.sendStatus(401);
        }

        var userFromToken = jwt.decode(req.token, jwtConfig.jwtSecret);

        User.find({
            email: userFromToken.email
        }, function (err, usersFromDatabase) {

            if (err) {
                return res.status(500).send('Database error');
            } else {

                if (usersFromDatabase.length === 0) {

                    return res.sendStatus(401);

                } else {
                        if (usersFromDatabase[0].password === userFromToken.password) {
                            return next();

                        } else {
                            return res.sendStatus(401);
                        }
                }
            }

        });
    };

};