// const TempoJogadasModel = require("../../src/models/tempoJogadasModel");

function cadastrar(){
    var usernameVar = input_username_cadastro.value;
    var emailVar = input_email_cadastro.value;
    var senhaVar = input_senha_cadastro.value;
    console.log('Chegou ate aqui')
    
    if (
      usernameVar == "" ||
      emailVar == "" ||
      senhaVar == ""
    ) { 
      alert ("Por favor, insira seus dados.");
      return;
    } else if (!validateEmail(emailVar)) {
      alert("Por favor, insira um endereço de email válido.");
      return;
    } else if (senhaVar.length < 6) {
    alert("A senha deve ter no mínimo 6 caracteres.");
    return;
    } else {
      console.log('Chegou ate aqui')
      fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // crie um atributo que recebe o valor recuperado aqui
          // Agora vá para o arquivo routes/usuario.js
          usernameServer: usernameVar,
          emailServer: emailVar,
          senhaServer: senhaVar
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);
          setTimeout(() => {
            window.location = "./login.html";
          }, "1000");
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        });
      
    }
    }

    function validateEmail(email) {
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
  }

    function entrar() {

      var usernameVar = input_username_login.value;
      var senhaVar = input_senha_login.value;

      if (usernameVar == "" || senhaVar == "") {
          return false;
      }
      else {
          console.log('Conseguido!')
      }
      console.log('cheguei até aqui')
      console.log("FORM LOGIN: ", usernameVar);
      console.log("FORM SENHA: ", senhaVar);

      fetch("/usuarios/autenticar", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              usernameServer: usernameVar,
              senhaServer: senhaVar
          })
      }).then(function (resposta) {
          console.log("ESTOU NO THEN DO entrar()!")

          if (resposta.ok) {
              console.log(resposta);

              resposta.json().then(json => {
                  console.log(json);
                  console.log(JSON.stringify(json));
                  // sessionStorage.EMAIL_USUARIO = json.email;
                  sessionStorage.USERNAME_USUARIO = json.username;
                  sessionStorage.ID_USUARIO = json.idusuario;
                  sessionStorage.TEMPO_USUARIO = json.tempo;
                  sessionStorage.TEMPO_JOGADAS = JSON.stringify(json.tempoJogadas);
                  // sessionStorage.ID_PREFERENCIA = json.idPreferencia;
                  // if (sessionStorage.ID_PREFERENCIA == sessionStorage.ID_USUARIO){

                      setTimeout(function () {
                          window.location = "./menu.html";
                      }, 1000); // apenas para exibir o loading
                
              });

          } else {

              console.log("Houve um erro ao tentar realizar o login!");

          }

      }).catch(function (erro) {
          console.log(erro);
      })

      return false;
  }