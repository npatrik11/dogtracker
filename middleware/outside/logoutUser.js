module.exports = function () {

    return function (req, res, next) {
        req.session.user = undefined;
        return next();
    };

};