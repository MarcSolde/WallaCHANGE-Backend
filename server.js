var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var mongoose = require('mongoose')


///////////
var io =require('socket.io')(80)
console.log('Sockets on :80')
var chat = io
.on('connection', function(socket){
	socket.emit('msg', 'Welcome!')

	socket.on('msg', function(msg){
		console.log('We got a msg! :'+msg.msg)
		io.sockets.in(msg.room).emit('msg', msg.msg)
	})
	socket.on('disconnect', function(){
		console.log('a user d/c\'d')
	})
	socket.on('room', function(room){
		socket.join(room)
	})

})



app.get('/chat2/:id', function (req, res) {
  res.sendfile(__dirname + '/index.html');
  //io.to('room-'+req.params.id).emit('msg', 'que pasa negro')
});
/////

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(methodOverride())

app.use(function(res, req, next) {
	res.header("Access-Control-Allow-Origin","*")
	res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept")
	next()
})

var userModel = require('./model/user.model')
var elemModel = require('./model/element.model')
var msgModel = require('./model/message.model')
var intercanviModel = require('./model/intercanvi.model')

var router = express.Router()

app.use('/', require('./routes/user.route'))
app.use('/api', require('./routes/elements.route'))
app.use('/chat', require('./routes/chat.route'))
app.use('/intercanvi', require('./routes/intercanvi.route'))

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