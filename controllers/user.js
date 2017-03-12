var mongoose = require("mongoose")
var usuari = mongoose.model('usuari')

exports.addUser = function (req, res) {
    console.log("POST")
    console.log(req.body)

    var user = new usuari({
        nom: req.body.nom,
        nom_user: req.body.nom_user,
        password: req.body.password,
        path: req.body.path,
        localitat: req.body.localitat,
        preferencies: req.body.preferencies,
        productes: req.body.productes,
        intercanvis: req.body.intercanvis,
        reputacio: req.body.reputacio

    })

    user.save(function (err, user) {
        if (err) return res.status(500).send(err.message)
        res.status(200).json(user)
    })
}

exports.deleteUser = function (req, res) {
    console.log("DELETE")
    console.log(req.body)
    usuari.findOne({nom_user: req.params.nom}, function(err, user) {
        console.log(user)
        user.remove(function (err) {
            if (err) return res.status(500).send(err.message)
            res.status(200).send()
        })
    })
}

exports.updateUser = function (req, res) {
    console.log("PUT")
    console.log(req.body)

    usuari.findOne({nom_user: req.params.nom}, function (err, user) {

            if (req.body.password) user.password = req.body.password
            if (req.body.path) user.path = req.body.path
            if (req.body.localitat) user.localitat = req.body.localitat
            if (req.body.preferencies)user.preferencies = req.body.preferencies
            if (req.body.productes)user.productes = req.body.productes
            if (req.body.intercanvis)user.intercanvis = req.body.intercanvis
            if (req.body.reputacio)user.reputacio = req.body.reputacio

        user.save(function (err) {
                if (err) return res.status(500).send(err.message)
            res.status(200).jsonp(user)

        })
    })

}