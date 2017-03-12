var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(methodOverride())

var router = express.Router()

var models = require('./model/user')
var usrCtrl = require('./controllers/user')

router.get('/helloWorld/', function (req, res) {
    res.send("hello")
})

router.route('/addUser').post(usrCtrl.addUser)
router.route('/deleteUser/:nom').delete(usrCtrl.deleteUser)
router.route('/updateUser/:nom').put(usrCtrl.updateUser)

app.use(router)

mongoose.connect('mongodb://192.168.99.100:27017/pesDB', function (err, res) {
    if (err) {
        console.log("Error connecting to the DB")
    }
    app.listen(3000, function() {
        console.log("Node server running on http://localhost:3000");
    });
})