const grid = document.querySelector('.grid'); 
const spanPlayer = document.querySelector('.player'); 
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



const createElement = (tag, className) => { 
  const element = document.createElement(tag); // Cria um novo elemento HTML com a tag fornecida
  element.className = className;
  return element; 
}

let firstCard = ''; // Variável para armazenar a primeira carta virada
let secondCard = ''; // Variável para armazenar a segunda carta virada

const checkEndGame = () => { // Função para verificar se o jogo acabou
  const disabledCards = document.querySelectorAll('.disabled-card'); // Seleciona todas as cartas desativadas

  if (disabledCards.length === 20) { // Se todas as cartas estiverem desativadas (total de 20)
    clearInterval(this.loop); // Para o contador de tempo
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`); 
  }
}

const checkCards = () => { //checka pelo nome das cartas//
  const firstCharacter = firstCard.getAttribute('data-character'); 
  const secondCharacter = secondCard.getAttribute('data-character'); 

  if (firstCharacter === secondCharacter) { 
    firstCard.firstChild.classList.add('disabled-card'); 
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = ''; // Reseta a primeira carta
    secondCard = ''; // Reseta a segunda carta

    checkEndGame(); // Verifica se o jogo acabou
  } else {
    setTimeout(() => { // Se os nomes dos personagens não forem iguais, após 500ms
      // Remove a classe 'reveal-card' para esconder as cartas
      firstCard.classList.remove('reveal-card'); 
      secondCard.classList.remove('reveal-card');

      firstCard = ''; // Reseta a primeira carta
      secondCard = ''; // Reseta a segunda carta
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

  front.style.backgroundImage = `url('../public/assets/Jogadores/${character}.png')`; // Define a imagem de fundo da parte da frente da carta

  card.appendChild(front); // Adiciona a parte da frente da carta ao elemento da carta
  card.appendChild(back); // Adiciona a parte de trás da carta ao elemento da carta

  card.addEventListener('click', revealCard); // Adiciona um evento de clique para revelar a carta
  card.setAttribute('data-character', character) // Define o nome do personagem como um atributo da carta

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
    const currentTime = +timer.innerHTML; 
    timer.innerHTML = currentTime + 1; 
  }, 1000); 
}

window.onload = () => { 
  spanPlayer.innerHTML = localStorage.getItem('player'); // Define o nome do jogador com base no valor armazenado no localStorage
  startTimer();
  loadGame(); 
}
