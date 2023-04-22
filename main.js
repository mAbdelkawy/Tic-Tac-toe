let player1 = Player("Player 1", "X");
let player2 = Player("Player 2", "O");
let cells = document.querySelectorAll(".cell");
let announcer = document.querySelector(".turn-announcer");
let newGameButton = document.querySelector("#new-game");

const GameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const add = (index, marker) => {
    board[index] = marker;
    show();
  };
  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    show();
  };
  const get = () => {
    return board;
  };

  const show = () => {
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };

  return { add, reset, get };
})();

function Player(name, marker) {
  const getName = () => {
    return name;
  };
  const getMarker = () => {
    return marker;
  };

  return { getName, getMarker };
}

const Game = (() => {
  let playerTurn = player1.getName();
  let gameOver = false;

  const toggleTurn = () => {
    playerTurn =
      playerTurn === player1.getName() ? player2.getName() : player1.getName();

    announcer.textContent = `It's ${playerTurn}'s turn`;
  };

  const getTurn = () => {
    return playerTurn;
  };

  const getGameOver = () => {
    return gameOver;
  };

  const toggleGameOver = () => {
    gameOver = !gameOver;
  }

  const checkForWin = () => {
    if (
      GameBoard.get()[0] === GameBoard.get()[1] &&
      GameBoard.get()[1] === GameBoard.get()[2] &&
      GameBoard.get()[0] !== ""
    ) {
      gameOver = true;
    } else if (
      GameBoard.get()[3] === GameBoard.get()[4] &&
      GameBoard.get()[4] === GameBoard.get()[5] &&
      GameBoard.get()[3] !== ""
    ) {
      gameOver = true;
    } else if (
      GameBoard.get()[6] === GameBoard.get()[7] &&
      GameBoard.get()[7] === GameBoard.get()[8] &&
      GameBoard.get()[6] !== ""
    ) {
      gameOver = true;
    } else if (
      GameBoard.get()[0] === GameBoard.get()[3] &&
      GameBoard.get()[3] === GameBoard.get()[6] &&
      GameBoard.get()[0] !== ""
    ) {
      gameOver = true;
    } else if (
      GameBoard.get()[1] === GameBoard.get()[4] &&
      GameBoard.get()[4] === GameBoard.get()[7] &&
      GameBoard.get()[1] !== ""
    ) {
      gameOver = true;
    } else if (
      GameBoard.get()[2] === GameBoard.get()[5] &&
      GameBoard.get()[5] === GameBoard.get()[8] &&
      GameBoard.get()[2] !== ""
    ) {
      gameOver = true;
    } else if (
      GameBoard.get()[0] === GameBoard.get()[4] &&
      GameBoard.get()[4] === GameBoard.get()[8] &&
      GameBoard.get()[0] !== ""
    ) {
      gameOver = true;
    } else if (
      GameBoard.get()[2] === GameBoard.get()[4] &&
      GameBoard.get()[4] === GameBoard.get()[6] &&
      GameBoard.get()[2] !== ""
    ) {
      gameOver = true;
    }

    if (gameOver) {
      announcer.textContent = `${playerTurn} has won!`;
      newGameButton.style.display = "block";
    }
  };

  const checkForDraw = () => {
    if (!(GameBoard.get().includes(""))) {
      gameOver = true;
      announcer.textContent = "It's a draw!";
      newGameButton.style.display = "block";
    }
  };

  const checkValidInput = (cell) => {
    if (cell.textContent === "X" || cell.textContent === "O") {
      return false;
    }

    if (gameOver) {
      return false;
    }

    return true;
  };

  return {
    toggleTurn,
    getTurn,
    getGameOver,
    toggleGameOver,
    checkForWin,
    checkForDraw,
    checkValidInput,
  };
})();

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (Game.checkValidInput(cell)) {
      Game.getTurn() === player1.getName()
        ? GameBoard.add(index, "X")
        : GameBoard.add(index, "O");
        Game.checkForWin();
        Game.checkForDraw();
        if (!Game.getGameOver()) {
          Game.toggleTurn();
        }
    }
  });
});

newGameButton.addEventListener("click", () => {
  GameBoard.reset();
  Game.toggleGameOver();
  newGameButton.style.display = "none";
})
