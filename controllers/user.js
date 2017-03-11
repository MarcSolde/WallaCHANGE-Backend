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