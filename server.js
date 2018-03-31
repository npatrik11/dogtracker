var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('./config/db');
var db = mongoose.connection;
var bearerToken = require('express-bearer-token');


/**
 * For my own api
 */
app.use(bearerToken());

/**
 * Static stuff
 */
app.use(express.static('public'));

app.set('view engine', 'ejs');

/**
 * Create session
 */
app.use(session({
    secret: 'session secret',
    cookie: {
        maxAge: 600000
    },
    resave: true,
    saveUninitialized: false
}));

/**
 * Parse parameters in POST
 */
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

/**
 * Create the .tpl and .tpl.error on the res object
 */
app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = [];

    return next();
});

/**
 * Include the routes
 */
require('./routes/dogs')(app);
require('./routes/outside')(app);
require('./routes/api')(app);

/**
 * Standard error handler
 */
app.use(function (err, req, res, next) {
    res.status(500).send('An error occurred');


    console.error(err.stack);
});


db.on('error', function() {
    console.log('Unable to connect to Mongo.');
    process.exit(1)
});

db.once('open', function() {
    app.listen(process.env.PORT || 3000, function() {
        console.log('Listening on port: '+(process.env.PORT || 3000));
    })
});
