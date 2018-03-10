var loginUserMW = require('../middleware/api/loginUser');

module.exports = function (app) {


    app.post('/api/login',
        loginUserMW()
    );


};