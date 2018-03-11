var loginUserMW = require('../middleware/api/loginUser');
var getDogListMW = require('../middleware/api/getDogList');
var checkTokenMW = require('../middleware/api/checkToken');

module.exports = function (app) {


    app.post('/api/login',
        loginUserMW()
    );

    app.get('/api/dogs',
        checkTokenMW(),
        getDogListMW()
    );


};