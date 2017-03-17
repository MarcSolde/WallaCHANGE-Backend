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

var models = require('./model/user')
var usrCtrl = require('./controllers/user')


router.get('/helloWorld/', function (req, res) {
    res.send("hello")
})

router.route('/addUser').post(usrCtrl.addUser)
router.route('/autenticate').post(usrCtrl.login)
router.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err){
                return res.json({
                    success: false,
                    message: 'Failed to auth token'
                })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided'
        })
    }
})
router.route('/deleteUser/:nom_user').delete(usrCtrl.deleteUser)
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