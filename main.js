let player1 = Player("Player 1", "X");
let player2 = Player("Player 2", "O");
let cells = document.querySelectorAll(".cell");
let turnAnnouncer = document.querySelector(".turn-announcer");

const GameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const add = (index, marker) => {
    board[index] = marker;
  };
  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };
  const get = () => {
    return board;
  };

  const show = () => {
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  }

  return { add, reset, get, show };
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
  playerTurn = player1.getName();
  gameOver = false;



  const toggleTurn = () => {
    playerTurn =
      playerTurn === player1.getName() ? player2.getName() : player1.getName();

    turnAnnouncer.textContent = `It's ${playerTurn}'s turn`;
  };

  const getTurn = () => {
    return playerTurn;
  }

  const getGameOver = () => {
    return gameOver;
  }

  return { toggleTurn , getTurn , getGameOver};

  
})();


cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (cell.textContent === "X" || cell.textContent === "O") {
        return;
      }
  
      if (Game.getGameOver()) {
        return;
      }
  


      if (Game.getTurn() === "Player 1") {
        GameBoard.add(index, player1.getMarker());
        GameBoard.show();
        Game.toggleTurn();
      } else if (Game.getTurn() === "Player 2") {
        GameBoard.add(index, player2.getMarker());
        GameBoard.show();
        Game.toggleTurn();
      }
  
    });
  });


