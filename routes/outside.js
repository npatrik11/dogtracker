var renderMW = require('../middleware/common/render');
var loginUserMW = require('../middleware/outside/loginUser');
var registerUserMW = require('../middleware/outside/registerUser');
var checkUserLoggedInMW = require('../middleware/common/checkUserLoggedIn');
var logoutUserMW = require('../middleware/outside/logoutUser');
var mainRedirectMW = require('../middleware/outside/mainRedirect');

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