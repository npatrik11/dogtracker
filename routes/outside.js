var renderMW = require('../middleware/render');
var loginUserMW = require('../middleware/loginUser');
var registerUserMW = require('../middleware/registerUser');
var checkUserLoggedInMW = require('../middleware/checkUserLoggedIn');
var logoutUserMW = require('../middleware/logoutUser');
var mainRedirectMW = require('../middleware/mainRedirect');

module.exports = function (app) {

    /**
     * Main page
     */
     app.get('/',
         mainRedirectMW()
     );

    /**
     * Login page
     */
    app.get('/login',
        renderMW('login')
    );

    app.post('/login',
        loginUserMW(),
        renderMW('login')
    );

    /**
     * Register page
     */
    app.get('/register',
        renderMW('register')
    );

    app.post('/register',
        registerUserMW(),
        renderMW('register')
    );

    /**
     * Logout page
     */
    app.get('/logout',
        logoutUserMW(),
        checkUserLoggedInMW()
    );

};