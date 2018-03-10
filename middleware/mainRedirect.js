module.exports = function () {

    return function (req, res, next) {

        if (req.session.user === undefined) {
            return res.redirect('/login');
        } else {
            return res.redirect('/dogs');
        }
    };

};