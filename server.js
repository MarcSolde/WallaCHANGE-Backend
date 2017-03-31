var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose');

var config = require('./config/config')
var jwt = require('jsonwebtoken')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(methodOverride())
var router = express.Router()

var models = require('./model/user')
var usrCtrl = require('./controllers/user')

app.use('/', require('./routes/user'))

router.route('/updateUser/:nom_user').put(usrCtrl.updateUser)

app.use(router)

if (process.argv[2]== 'docker') Mongodb = 'mongodb://192.168.99.100:27017/pesDB'
else Mongodb = 'mongodb://192.168.99.100:27017/pesDB'

mongoose.connect(Mongodb, function (err, res) {
    if (err) {
        console.log("Error connecting to the DB")
    }
    app.listen(3000, function() {
        console.log("Node server running on http://localhost:3000");
    });
})

module.exports = app;
