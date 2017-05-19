process.env.NODE_ENV = 'test'
'use strict'

var chai = require('chai'),
	 chaiHttp = require('chai-http')

chai.use(chaiHttp)

var mongoose = require('mongoose')
var user = require('../model/user.model')
var usuari = mongoose.model('usuari')
let app = require('../server')

describe('User', function () {
  user.collection.drop()

  /*beforeEach(function (done) {
    var def = new user({
      nom: 'default',
      nom_user: 'default'
    })
    def.save(function (err) {
      done()
    })
  })*/

  afterEach(function (done) {
    	user.collection.drop()
    done()
  })

  describe('#createUserFunctionalityTesting', function () {
    it('should save the new User data', function (done) {
      chai.request(app)
				.post('/addUser')
				.send({
  nom: 'Pepito Grillo',
  nom_user: 'CCC',
  password: 'password'
})
				.end(function (err, res) {
  chai.expect(err).to.be.null
  chai.expect(res).to.have.status(200)
  chai.expect(res).to.be.json
  chai.expect(res).to.have.property('body')
  chai.expect(res.body).to.have.property('nom')
  chai.expect(res.body.nom).to.equal('Pepito Grillo')
  chai.expect(res.body).to.have.property('nom_user')
  chai.expect(res.body.nom_user).to.equal('CCC')
  chai.expect(res.body).to.have.property('password_hash')
  chai.expect(res.body).to.have.property('salt')
  done()
})
    })
    it('should claim an error when adding a user with an existing name on the DB', function (done) {
      chai.request(app)
				.post('/addUser')
				.send({
  nom: 'default',
  nom_user: 'default'
})
				.end(function (err, res) {
  chai.expect(err).not.to.be.null
  chai.expect(res).not.to.be.null
  chai.expect(res).to.have.status(500)
  done()
})
    })
  })

  describe('#deleteUserFunctionalityTesting', function () {
    var authToken = null

    it('should delete the user properly', function (done) {
      chai.request(app)
				.post('/addUser')
				.send({
  nom: 'Pepito Grillo',
  nom_user: 'CCC',
  password: 'password'
})
				.end(function (err, res) {
  chai.request(app)
						.post('/login')
						.send({
  nom_user: 'CCC',
  password: 'password'
})
						.end(function (err, res) {
  authToken = res.body.token
  chai.request(app)
								.delete('/deleteUser/CCC')
								.send({
									token: authToken
								})
								.end(function(err, res) {
									chai.expect(err).to.be.null
									chai.expect(res).not.to.be.null
									chai.expect(res).to.have.status(200)
									done()
								})
						})
					})
		})
	})

	describe('#updateUserFunctionalityTesting', function() {
		var authToken = null

		it('should update the user properly',function(done){
			chai.request(app)
				.post('/addUser')
				.send({
					nom: "Pepito Grillo",
					nom_user: "CCC",
					password: "password"
					})
				.end(function (err, res){
					chai.request(app)
						.post('/login')
						.send({
							nom_user: 'CCC',
							password: 'password'
						})
						.end(function(err, res) {
							authToken=res.body.token
							chai.request(app)
								.put('/updateUser/CCC')
								.send({
									token: authToken,
									localitat: 'Barcelona'
								})
								.end(function(err, res) {
									chai.expect(err).to.be.null
									chai.expect(res).not.to.be.null
									chai.expect(res).to.have.status(200)
									chai.expect(res).to.have.property('body')
									chai.expect(res.body).to.have.property('nom')
									chai.expect(res.body.nom).to.equal('Pepito Grillo')
									chai.expect(res.body).to.have.property('nom_user')
									chai.expect(res.body.nom_user).to.equal('CCC')
									chai.expect(res.body).to.have.property('localitat')
									chai.expect(res.body.localitat).to.equal('Barcelona')
									done()
								})
						})
					})
				
		})
	})

	describe('#getUserFunctionalityTesting', function() {

		it('should get the user specified', function(done) {
			chai.request(app)
				.post('/addUser')
				.send({
					nom: "Pepito Grillo",
					nom_user: "CCC",
					password: "password"
					})
				.end(function (err, res){
					chai.request(app)
					.get('/user/CCC')
					.end(function(err, res) {
						chai.expect(err).to.be.null
						chai.expect(res).not.to.be.null
						chai.expect(res).to.have.status(200)
						chai.expect(res).to.have.property('body')
						chai.expect(res.body).to.have.property('nom')
						chai.expect(res.body.nom).to.equal('Pepito Grillo')
						chai.expect(res.body).to.have.property('nom_user')
						chai.expect(res.body.nom_user).to.equal('CCC')
						done()
					})
				})
		})

		it('should get all the users', function(done) {
			chai.request(app)
				.post('/addUser')
				.send({
					nom: "Pepito Grillo",
					nom_user: "CCC",
					password: "password"
					})
				.end(function (err, res){
					chai.request(app)
					.post('/addUser')
					.send({
						nom: "Pepito Grillo",
						nom_user: "BBB",
						password: "password"
						})
					.end(function (err, res){
						chai.request(app)
						.get('/allUsers')
						.end(function(err, res) {
							chai.expect(err).to.be.null
							chai.expect(res).not.to.be.null
							chai.expect(res).to.have.status(200)
							chai.expect(res).to.be.a('object')
							chai.expect(res).to.have.property('body')
							chai.expect(res.body[0]).to.have.property('nom')
							chai.expect(res.body[0].nom).to.equal('Pepito Grillo')
							chai.expect(res.body[0]).to.have.property('nom_user')
							chai.expect(res.body[0].nom_user).to.equal('CCC')
							chai.expect(res.body[1]).to.have.property('nom')
							chai.expect(res.body[1].nom).to.equal('Pepito Grillo')
							chai.expect(res.body[1]).to.have.property('nom_user')
							chai.expect(res.body[1].nom_user).to.equal('BBB')
							done()
						})
					})
				})
		})

		it('should get the elements based on the parametres in the headers', function(done) {
			chai.request(app)
				.post('/addUser')
				.send({
					nom: "Pepito Grillo",
					nom_user: "CCC",
					password: "password",
					preferencies: ["A", "B"]
					})
				.end(function (err, res){
					chai.request(app)
					.post('/addUser')
					.send({
						nom: "Pepito Grillo",
						nom_user: "BBB",
						password: "password",
						preferencies: ["A"]
					})
					.end(function (err, res){
						chai.request(app)
						.get('/user')
						.set('preferencies', 'B')
						.send()
						.end(function(err, res) {
							chai.expect(err).to.be.null
							chai.expect(res).not.to.be.null
							chai.expect(res).to.have.status(200)
							chai.expect(res.body[0]).to.have.property('_id')
							chai.expect(res.body[0]).to.have.property('nom_user')
							chai.expect(res.body[0].nom_user).to.equal('CCC')
							done()
						})
					})
				})
		})
	}) 
})
