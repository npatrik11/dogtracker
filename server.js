var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('./config/db');
var db = mongoose.connection;
var bearerToken = require('express-bearer-token');


/**
 * For own api
 */
app.use(bearerToken());

/**
 * Static stuff
 */
app.use(express.static('public'));

app.set('view engine', 'ejs');

/**
 * Session above all
 */
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 600000
    },
    resave: true,
    saveUninitialized: false
}));

/**
 * Parse parameters in POST
 */
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Let's creat the .tpl and .error on the res object
 */
app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = [];

    return next();
});

/**
 * Include all the routes
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
