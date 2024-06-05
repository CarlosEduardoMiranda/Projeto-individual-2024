const grid = document.querySelector('.grid'); 
const timer = document.querySelector('.timer'); 

const characters = [ 
  'Wesley',
  'Carlos Miguel',
  'Angel Romero',
  'Yuri Alberto',
  'Raniele',
  'Paulinho',
  'Fagner',
  'Gustavo Henrique',
  'Hugo',
  'Rodrigo Garro',
];


function cadastrarTempo() {
  var tempo = Number(currentTime)
  fetch("/medidas/cadastrarTempo", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          tempoServer: tempo,
          idUsuarioServer: Number(sessionStorage.ID_USUARIO),
      })
  })
      .then(function (resposta) {
          console.log("resposta: ", resposta);

          if (resposta.ok) {
              setTimeout(() => {
                  window.location = "./menu.html";
              }, "2000");
          } else {
              alert('Erro');
          }
      })
}

// Cria um novo elemento HTML com a tag fornecida
const createElement = (tag, className) => { 
  const element = document.createElement(tag); 
  element.className = className;
  return element; 
}

let firstCard = ''; 
let secondCard = ''; 

const checkEndGame = () => { 
  const disabledCards = document.querySelectorAll('.disabled-card'); 

  if (disabledCards.length === 20) { 
    clearInterval(this.loop); 
    alert(`Parabéns,! Seu tempo foi de: ${timer.innerHTML} segundos.`); 
    cadastrarTempo();
  }
}

const checkCards = () => { //checka pelo nome das cartas//
  const firstCharacter = firstCard.getAttribute('data-character'); 
  const secondCharacter = secondCard.getAttribute('data-character'); 

  if (firstCharacter === secondCharacter) { 
    firstCard.firstChild.classList.add('disabled-card'); 
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = ''; 
    secondCard = ''; 

    checkEndGame(); // Verifica se o jogo acabou
  } else {
    setTimeout(() => { 
      // Remove 
      firstCard.classList.remove('reveal-card'); 
      secondCard.classList.remove('reveal-card');

      firstCard = ''; 
      secondCard = ''; 
    }, 500);
  }
}

const revealCard = ({ target }) => { // Função para revelar uma carta ao clicar nela
  if (target.parentNode.className.includes('reveal-card')) { // Se a carta já estiver revelada
    return; // Não faz nada
  }

  if (firstCard === '') { // Se a primeira carta estiver vazia
    target.parentNode.classList.add('reveal-card'); // Adiciona a classe 'reveal-card' para revelar a carta
    firstCard = target.parentNode; 
  } else if (secondCard === '') { // Se a segunda carta estiver vazia
    target.parentNode.classList.add('reveal-card'); // Adiciona a classe 'reveal-card' para revelar a carta
    secondCard = target.parentNode; 
    checkCards(); // Verifica se as duas cartas viradas são iguais
  }
}

const createCard = (character) => { // Função para criar uma carta
  const card = createElement('div', 'card'); // Cria um elemento div com a classe 'card'
  const front = createElement('div', 'face front'); // Cria um elemento div com a classe 'face front' (parte da frente da carta)
  const back = createElement('div', 'face back'); // Cria um elemento div com a classe 'face back' (parte de trás da carta)

  front.style.backgroundImage = `url('./assets/Jogadores/${character}.png')`; // Define a imagem de fundo da parte da frente da carta

  card.appendChild(front); // Adiciona a parte da frente da carta ao elemento da carta
  card.appendChild(back); // Adiciona a parte de trás da carta ao elemento da carta

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character) // atributo da carta

  return card; 
}

const loadGame = () => { // Função para carregar o jogo
  const duplicateCharacters = [...characters, ...characters]; // Duplica os personagens para criar pares

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5); // Embaralha os personagens

  shuffledArray.forEach((character) => { 
    const card = createCard(character);
    grid.appendChild(card); 
  });
}

const startTimer = () => { 
  this.loop = setInterval(() => { 
     currentTime = +timer.innerHTML; 
    timer.innerHTML = currentTime + 1; 
  }, 1000); 
}
    let currentTime = 0

window.onload = () => { 
  startTimer();
  loadGame(); 
}
