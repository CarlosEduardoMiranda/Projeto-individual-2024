var database = require("../database/config")

function TempoJogadas(idusuario) {
    var instrucaoSql = `
    select tempo from jogoDaMemoria join usuario
		on usuario.idusuario = jogoDaMemoria.fk_usuario where idusuario = '${idusuario}'
        limit 5;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    TempoJogadas
};