var database = require("../database/config")

function TempoJogadas(idusuario) {
    // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", username, senha)
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