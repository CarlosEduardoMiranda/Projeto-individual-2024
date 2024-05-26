
function cadastrar(){
    var usernameVar = input_username_cadastro.value;
    // var sobrenomeVar = input_sobrenome.value;
    var emailVar = input_email_cadastro.value;
    // var celularVar = input_celular.value;
    var senhaVar = input_senha_cadastro.value;
    // var confirmarsenhaVar = input_confirmarsenha.value;
    console.log('Chegou ate aqui')
    
    if (
      usernameVar == "" ||
    //   sobrenomeVar == "" ||
      emailVar == "" ||
    //   celularVar == "" ||
      senhaVar == ""
    ) { 
        alert ("Mensagem de erro para todos os campos em branco");
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


    function entrar() {
      // aguardar();

      var usernameVar = input_username_login.value;
      var senhaVar = input_senha_login.value;

      if (usernameVar == "" || senhaVar == "") {
          // cardErro.style.display = "block"
          // mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
          // finalizarAguardar();
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
                  // sessionStorage.ID_PREFERENCIA = json.idPreferencia;
                  // if (sessionStorage.ID_PREFERENCIA == sessionStorage.ID_USUARIO){

                      setTimeout(function () {
                          window.location = "./menu.html";
                      }, 1000); // apenas para exibir o loading
                
              });

          } else {

              console.log("Houve um erro ao tentar realizar o login!");

              resposta.text().then(texto => {
                  console.error(texto);
                  finalizarAguardar(texto);
              });
          }

      }).catch(function (erro) {
          console.log(erro);
      })

      return false;
  }