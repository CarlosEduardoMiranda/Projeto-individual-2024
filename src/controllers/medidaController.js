
var medidaModel = require("../models/medidaModel");


function cadastrarTempo(req, res) {
    tempo = req.body.tempoServer;
    idusuario = req.body.idUsuarioServer;
    console.log('estou no controller', tempo, idusuario)
    medidaModel.cadastrarTempo(tempo, idusuario)
        .then(
            function (resultado) {
                res.json(resultado)
            }).catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
}

// function listarTentativa(req, res) {
//     var idusuario = req.body.idusuarioServer;
//     medidaModel.listarTentativa(idusuario)
//         .then(
//             function (resultado) {
//                 if (resultado.length > 0) {
//                     res.status(200).json(resultado);
//                     console.log(resultado.json())
//                 } else {
//                     res.status(204).send(resultado);
//                 }
//             }
//         ).catch(function (erro){
//             console.log(erro);
//             console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
//             res.status(500).json(erro.sqlMessage);
//         });
// }

function listarTentativa(req, res) {
    var idusuario = req.body.idusuarioServer;
    console.log(idusuario)

    medidaModel.listarTentativa(idusuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    })
}


function buscarUltimasMedidas(req, res) {

    const limite_linhas = 7;

    var idAquario = req.params.idAquario;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(idAquario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var idAquario = req.params.idAquario;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idAquario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    cadastrarTempo,
    listarTentativa

}