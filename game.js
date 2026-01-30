// ==== JavaScript ====
let selector = (element) => document.querySelector(element);
let board = selector("#game-board");
let message = selector("#message");

// Create cards (8 pairs)
// this is  arary
const icons = ["🍎", "🍌", "🍇", "🍓", "🍍", "🥝", "🍒", "🍉"];
let cardsArray = [...icons, ...icons];

// Shuffle cards
cardsArray.sort(() => 0.5 - Math.random());

let flippedCards = [];
let matchedCards = [];

//this is  where you will  gonna  Create card elements
cardsArray.forEach((icon) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.icon = icon;
  card.innerText = "";
  board.appendChild(card);

  card.addEventListener("click", () => flipCard(card));
});

function flipCard(card) {
  if (
    flippedCards.length < 2 &&
    !card.classList.contains("flipped") &&
    !matchedCards.includes(card)
  ) {
    card.classList.add("flipped");
    card.innerText = card.dataset.icon;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.icon === card2.dataset.icon) {
    matchedCards.push(card1, card2);
    message.innerText = "Match Found! 🎉";
    flippedCards = [];
    if (matchedCards.length === cardsArray.length) {
      message.innerText = "You Won! 🏆";
    }
  } else {
    message.innerText = "Try Again!";
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.innerText = "";
      card2.innerText = "";
      flippedCards = [];
    }, 1000);
  }
}
