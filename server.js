var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose');

var config = require('./config')
var jwt = require('jsonwebtoken')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(methodOverride())
var router = express.Router()

var models = require('./model/user', './model/element.model.js')
var usrCtrl = require('./controllers/user')
var elemCtrl = require('./controllers/element.controller');

app.use('/', require('./routes'))

router.route('/updateUser/:nom_user').put(usrCtrl.updateUser)


app.use(router)

mongoose.connect('mongodb://192.168.99.100:27017/pesDB', function (err, res) {
    if (err) {
        console.log("Error connecting to the DB")
    }
    app.listen(3000, function() {
        console.log("Node server running on http://localhost:3000");
    });
})

module.exports = app;