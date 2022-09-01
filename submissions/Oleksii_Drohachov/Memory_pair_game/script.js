const mainContainer = document.querySelector(".container");
const modal = document.querySelector(".modal__container");
const modalBtn = document.querySelector(".modal__btn");
const gameboard = document.querySelector(".gameboard");
const scoreCount = document.querySelector(".score__container");

renderModal(
  "You are welcome, my friend ! Wanna play some memory game to endure your mind and become more powerfull ? Try to find pairs of cards as fast as you can! Tap the button to begin... ",
  "START THE GAME"
);

function renderModal(titleText, btnText) {
  const modalWrapper = document.createElement("div");
  modalWrapper.classList.add("modal__wrapper");
  const modalTitle = document.createElement("p");
  modalTitle.classList.add("modal__title");
  modalTitle.textContent = titleText;
  const modalBtn = document.createElement("button");
  modalBtn.classList.add("modal__btn");
  modalBtn.textContent = btnText;
  modalBtn.addEventListener("click", startGame);
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("modal__btn");
  closeBtn.textContent = "NO, THANKS";
  closeBtn.addEventListener("click", hideModal);

  modalWrapper.append(modalTitle);
  modalWrapper.append(modalBtn);
  modalWrapper.append(closeBtn);

  modal.append(modalWrapper);
  modal.classList.add("shown");
}

function renderModalForReset() {
  renderModal("Are you sure, you want to restart the game?", "RESET");
}

function renderModalAfterWin() {
  renderModal(
    "Good job my friend! You became even stronger! Want to start one more time?",
    "RESET"
  );
}

function hideModal() {
  modal.classList.remove("shown");
  modal.innerHTML = "";
}

function startGame() {
  scoreCount.innerHTML = "";
  gameboard.innerHTML = "";
  modal.innerHTML = "";
  modal.classList.remove("shown");
  prepareGame();
}

function prepareGame() {
  const cardsArray = [
    {
      name: "beast",
      path: "img/Beast.jpg",
    },
    {
      name: "beast",
      path: "img/Beast.jpg",
    },
    {
      name: "death",
      path: "img/Death.jpg",
    },
    {
      name: "death",
      path: "img/Death.jpg",
    },
    {
      name: "fire",
      path: "img/Fire.jpg",
    },
    {
      name: "fire",
      path: "img/Fire.jpg",
    },
    {
      name: "life",
      path: "img/Life.jpg",
    },
    {
      name: "life",
      path: "img/Life.jpg",
    },
    {
      name: "light",
      path: "img/Light.jpg",
    },
    {
      name: "light",
      path: "img/Light.jpg",
    },
    {
      name: "metal",
      path: "img/Metal.jpg",
    },
    {
      name: "metal",
      path: "img/Metal.jpg",
    },
  ];
  let shuffled = [...cardsArray];
  shuffled.sort(function () {
    return 0.5 - Math.random();
  });
  let score = 0;
  let guessedCardPairs = 0;

  renderScoreAndReset();
  renderCards(shuffled);
  cardsHandler();

  const scoreSpan = document.querySelector(".score__span");

  function renderScoreAndReset() {
    const scoreSpan = document.createElement("span");
    scoreSpan.classList.add("score__span");
    scoreSpan.textContent = `Number of tries: ${score}`;
    const resetBtn = document.createElement("button");
    resetBtn.addEventListener("click", renderModalForReset);
    resetBtn.classList.add("reset__btn");
    resetBtn.textContent = "RESTART";
    scoreCount.append(scoreSpan);
    scoreCount.append(resetBtn);
  }

  function updateScore() {
    scoreSpan.textContent = `Number of tries: ${score}`;
  }

  function renderCards(arr) {
    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("card__wrapper");

    arr.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-name", item.name);
      const frontPage = document.createElement("img");
      frontPage.classList.add("front__page");
      frontPage.setAttribute("src", item.path);
      const backPage = document.createElement("img");
      backPage.classList.add("back__page");
      backPage.setAttribute("src", "img/backside.jpeg");

      card.append(frontPage);
      card.append(backPage);
      cardWrapper.append(card);
    });
    gameboard.append(cardWrapper);
  }

  function cardsHandler() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => card.addEventListener("click", flipCard));

    let hasFlipped = false;
    let lockBoard = false;
    let firstCard, secondCard;

    function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;

      this.classList.add("flip");

      if (!hasFlipped) {
        hasFlipped = true;
        firstCard = this;
      } else {
        secondCard = this;
        compareCards();
      }
    }

    function compareCards() {
      score++;
      updateScore();

      let comparison = firstCard.dataset.name === secondCard.dataset.name;
      comparison ? disableCards() : unFlipCards();
    }

    function disableCards() {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);

      resetBoard();
      guessedCardPairs++;

      if (guessedCardPairs === 6) {
        setTimeout(renderModalAfterWin(), 2000);
      }
    }

    function unFlipCards() {
      lockBoard = true;

      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
      }, 1500);
    }

    function resetBoard() {
      [hasFlipped, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
    }
  }
}
