var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(methodOverride())

var router = express.Router()

router.get('/helloWorld/', function (req, res) {
    res.send("hello")
})

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
