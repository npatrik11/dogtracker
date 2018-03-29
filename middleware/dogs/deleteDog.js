module.exports = function (objectRepository) {

    return function (req, res, next) {

        objectRepository.dogModel.remove({_id: req.params.dogid}, function (err) {
            if (err) {
                console.log(err)
            } else {
                return res.redirect('/dogs');
            }
        });
    };

};