const counterMatch = document.getElementById('count-match');
const counterMoves = document.getElementById('count-moves');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');
const spanTime = document.querySelector('.popup__time');
const spanMoves = document.querySelector('.popup__moves');
const timer = document.getElementById('timer');
const cards = document.querySelectorAll('.game__card');
const pictures = document.querySelectorAll('.game__image');
const cardsArray = [...cards];
let picturesArray = [...pictures];
let openedCards = [];
let matchedCards = [];
let match = 0;
let moves = 0;
let second = 0;
let minute = 0;
let hour = 0;
let interval;

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function startGame() {
  let shuffledImages = shuffle(picturesArray);

  for (i = 0; i < shuffledImages.length; i++) {
    cards[i].appendChild(shuffledImages[i]);
    cards[i].type = `${shuffledImages[i].alt}`;
    cards[i].children[0].classList.remove('game__image_visibilety');
  }
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      openCard(card);
    });
  });

  flashCards();
  match = 0;
  counterMatch.innerHTML = '0';
  moves = 0;
  counterMoves.innerHTML = `${moves} move(s)`;
  timer.innerHTML = '0 mins 0 secs';
  clearInterval(interval);
}

function flashCards() {
  for (i = 0; i < cards.length; i++) {
    cards[i].children[0].classList.add('game__image_visibilety');
  }
  setTimeout(function () {
    for (i = 0; i < cards.length; i++) {
      cards[i].children[0].classList.remove('game__image_visibilety');
    }
  }, 1000);
}

function openCard(card) {
  card.children[0].classList.add('game__image_visibilety');
  tapOnCard(card);
}

function tapOnCard(card) {
  openedCards.push(card);
  let len = openedCards.length;
  if (len === 2) {
    moveCounter();
    if (openedCards[0].type === openedCards[1].type) {
      matched();
    } else {
      unmatched();
    }
  }
}
function disabledCards() {
  cards.forEach((card) => {
    card.classList.add('game__card_disabled');
  });
}
function enabledCards() {
  cards.forEach((card) => {
    card.classList.remove('game__card_disabled');
  });
}
function moveCounterMatch() {
  match++;
  counterMatch.innerHTML = `${match} match`;
}
function moveCounter() {
  moves++;
  counterMoves.innerHTML = `${moves} move(s)`;
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
}
function matched() {
  moveCounterMatch();
  matchedCards.push(openedCards[0]);
  matchedCards.push(openedCards[1]);
  openedCards = [];
  if (matchedCards.length == 2) {
    endGame();
  }
}
function unmatched() {
  disabledCards();
  setTimeout(function () {
    openedCards[0].children[0].classList.remove('game__image_visibilety');
    openedCards[1].children[0].classList.remove('game__image_visibilety');
    enabledCards();
    openedCards = [];
  }, 1100);
}
startGame();

function endGame() {
  matchedCards = [];
  openPopup(popup);
  spanMoves.innerHTML = moves;
  spanTime.innerHTML = `${minute} mins ${second} secs`;
}

function startTimer() {
  interval = setInterval(function () {
    timer.innerHTML = `${minute} mins ${second} secs`;
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  startGame();
}

function pillars(numPill, dist, width) {
  let result;
  let pillars = numPill - 2;
  let distCm = dist * 100 + pillars * width;
  console.log(distCm);
  return distCm;
}
pillars(10, 10, 30);
