process.env.NODE_ENV = 'test'
'use strict'

var chai = require('chai')
var chaiHttp = require('chai-http')

chai.use(chaiHttp)

var expect = chai.expect
var mongoose = require('mongoose')
var element = require('../model/element.model')
var element = mongoose.model('element')
var user = require('../model/user.model')
var user = mongoose.model('usuari')
let app = require('../server')
require('./user.test.js')
// No borrar, s'encarrega de executar primer els tests de user i despres els de element

describe('Element', function () {
  var elemID = null
  element.collection.drop()
  user.collection.drop()

  describe('Element creation', function () {
    var authToken = null

    it('saves new Element', function (done) {
      chai.request(app).post('/addUser').send({
        nom: 'Pepito Grillo',
        nom_user: 'CCC2',
        password: 'password'
      })
			.end(function (err, res) {
  chai.request(app).post('/login').send({
    nom_user: 'CCC2',
    password: 'password'
  })
				.end(function (err, res) {
  authToken = res.body.token
  chai.request(app).post('/api/element').send({
    titol: 'Bicicleta',
    descripcio: 'bicicleta roja',
    nom_user: 'CCC2',
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
						expect(res.body).to.have.property('user_id')
						expect(res.body.nom_user).to.equal('CCC2')
						elemID = res.body.element_id
						done()
					})
				})
			})
		})

		// are there any exceptions to adding elements (?)
  })

  describe('Element deletion', function () {
    var authToken = null

    it('deletes Element', function () {
      chai.request(app).post('/addUser').send({
        nom: 'Pepito Grillo',
        nom_user: 'CCC2',
        password: 'password'
      })
			.end(function (err, res) {
  chai.request(app).post('/login').send({
    nom_user: 'CCC2',
    password: 'password'
  })
				.end(function (err, res) {
  authToken = res.body.token
  chai.request(app).delete('/api/element/' + elemID).send({
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
