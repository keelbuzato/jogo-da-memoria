const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"


startGame();

function startGame() {
  initializeCards(game.createCardsFromTechs());

}

function initializeCards(cards) {
  let gameBoard = document.getElementById("gameBoard")
  gameBoard.innerHTML = '';
  game.cards.forEach(card => {
    let cardElemente = document.createElement('div');
    cardElemente.id = card.id
    cardElemente.classList.add(CARD);
    cardElemente.dataset.icon = card.icon
    createCardContent(card, cardElemente)

    cardElemente.addEventListener('click', flipCard)
    gameBoard.appendChild(cardElemente)

  })

}

function createCardContent(card, cardElement) {

  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);

}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement('div')
  cardElementFace.classList.add(face)
  if (face === FRONT) {
    let iconElement = document.createElement('img')
    iconElement.classList.add(ICON)
    iconElement.src = "./images/" + card.icon + ".png"
    cardElementFace.appendChild(iconElement);

  } else {
    cardElementFace.innerHTML = "&lt/&gt";
  }
  element.appendChild(cardElementFace);

}


function flipCard() {

  if (game.setCard(this.id)) {

    this.classList.add("flip");

    if (game.secondCard) {
      if (game.checkMatch()) {
        game.clearCards();
        if (game.checkGameOver()) {
          let gameOverLayer = document.getElementById("gameOver")
          gameOverLayer.style.display = 'flex'
        };
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);

          firstCardView.classList.remove('flip');
          secondCardView.classList.remove('flip');
          game.unflipCard()
        }, 1000);
        console.log(game.secondCard)
      };
    };
  };
}

function restart() {
  game.clearCards();
  startGame();
  let gameOverLayer = document.getElementById("gameOver")
  gameOverLayer.style.display = 'none'

}