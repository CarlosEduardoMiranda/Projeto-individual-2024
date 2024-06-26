var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.post("/cadastrarTempo", function (req, res) {
    medidaController.cadastrarTempo(req, res);
});

router.post(`/listarTentativa`, function(req, res){
    medidaController.listarTentativa(req, res);
});  

router.get(`/obterRanking`, function(req, res){
    medidaController.obterRanking(req, res);
})


module.exports = router;