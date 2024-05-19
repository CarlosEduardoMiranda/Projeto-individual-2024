
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