process.env.NODE_ENV = 'test'
'use strict'

var chai = require('chai'),
	 chaiHttp = require('chai-http')

chai.use(chaiHttp)

var expect = chai.expect
var request = require('request')
var mongoose = require('mongoose')
var element = require('../model/element.model')
var element = mongoose.model('element')
var user = require.('../model/user.model')
var user = mongoose.model('user')
let app = require('../server')

describe('Element', function () {
	var elemID = null
	element.collection.drop()
	user.collection.drop()

	afterEach(function (done) {
		element.collection.drop()
		user.collection.drop()
	})

	describe('Element creation', function () {
		var authToken = null

		it('saves new Element', function (done) {
			request.(app).post('/addUser').send({
				nom: 'Pepito Grillo',
				nom_user: 'CCC',
				password: 'password'
			})
			.end(function (err, res) {
				request(app).post('/login').send({
					nom_user: 'CCC',
					password: 'password'
				})
				.end(function (err, res) {
					authToken = res.body.token
					request(app).post('/api/element').send({
						titol: 'Bicicleta',
						descripcio: 'bicicleta roja',
						nom_user: 'CCC',
						token: authToken
					})
					.end(function (err, res) {
						expect(err).to.be.null
						expect(res).to.have.status(200)
						expect(res).to.be.json
						expect(res).to.have.property('body')
						expect(res.body).to.have.property('titol')
						expect(res.body.titol).to.equal('Bicicleta')
						expect(res.body).to.have.property('descripcio')
						expect(res.body.descripcio).to.equal('bicicleta roja')
						expect(res.body).to.have.property('nom_user')
						expect(res.body.nom_user).to.equal('CCC')
						elemID = res.body._id
						done()
					})
				})
			})
		})

		//are there any exceptions to adding elements (?)
	})

	describe('Element deletion', function () {
		var authToken = null

		it('deletes Element', function () {
			request.(app).post('/addUser').send({
				nom: 'Pepito Grillo',
				nom_user: 'CCC',
				password: 'password'
			})
			.end(function (err, res) {
				request(app).post('/login').send({
					nom_user: 'CCC',
					password: 'password'
				})
				.end(function (err, res) {
					authToken = res.body.token
					request(app).delete('/api/element/'+elemID).send({
						token: authToken
					})
					.end(function (err, res) {
						expect(err).to.be.null
						expect(res).not.to.be.null
						expect(res).to.have.status(200)
						done()
					})
				})
			})
		})
	})
})