let currentIndex = 0;
  const cards = document.querySelectorAll('.card');

  function showCards() {
    cards.forEach(card => card.style.display = 'none');
    for (let i = currentIndex; i < currentIndex + 3; i++) {
      if (cards[i]) {
        cards[i].style.display = 'block';
      }
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 3) % cards.length;
    showCards();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 3 + cards.length) % cards.length;
    showCards();
  }

  document.addEventListener("DOMContentLoaded", showCards);