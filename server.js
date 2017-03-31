var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose');

var config = require('./config');
var jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

var userModel = require('./model/user.model');
var elemModel = require('./model/element.model');

var router = express.Router();

app.use('/', require('./routes/user.route'));
app.use('/api', require('./routes/elements.route'));

app.use(router);

if (process.argv[2]== 'docker') Mongodb = 'mongodb://localhost/pesDB';
else Mongodb = 'mongodb://localhost/pesDB';

mongoose.connect(Mongodb, function (err, res) {
    if (err) {
        console.log("Error connecting to the DB");
    }
    app.listen(3000, function() {
        console.log("Node server running on http://localhost:3000");
    });
});

module.exports = app;