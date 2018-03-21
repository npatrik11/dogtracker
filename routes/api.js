var loginUserMW = require('../middleware/api/loginUser');
var getDogListMW = require('../middleware/api/getDogList');
var checkTokenMW = require('../middleware/api/checkToken');
var deleteDogMW = require('../middleware/api/deleteDog');

module.exports = function (app) {


    app.post('/api/login',
        loginUserMW()
    );

    app.get('/api/dogs',
        checkTokenMW(),
        getDogListMW()
    );

    app.delete('/api/dogs/:dogid/delete',
        checkTokenMW(),
        deleteDogMW()
    );


};