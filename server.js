var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var mongoose = require('mongoose')

//  var config = require('./config/config')
//  var jwt = require('jsonwebtoken')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(methodOverride())

app.use(function(res, req, next) {
	res.header("Access-Control-Allow-Origin","*")
	res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept")
	next()
})

var userModel = require('./model/user.model');	
var elemModel = require('./model/element.model');

var router = express.Router()

app.use('/', require('./routes/user.route'))
app.use('/api', require('./routes/elements.route'))

app.use(router)

var Mongodb

if (process.argv[2] === 'docker') Mongodb = 'mongodb://192.168.99.100:27017/pesDB'
else Mongodb = 'mongodb://localhost:27017/pesDB'

mongoose.connect(Mongodb, function (err, res) {
  if (err) {
    console.log('Error connecting to the DB')
  }
  app.listen(3000, function () {
    console.log('Node server running on http://localhost:3000')
  })
})

module.exports = app
