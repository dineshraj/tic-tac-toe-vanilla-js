const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], 
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const squares = Array.from(document.querySelectorAll('.square'));

let board = [];
let turn = 'X';

class Player {
  constructor (mark) {
    this.mark = mark;
    this.play();
  }

  play() {
    setInterval(() => {
      if (turn === this.mark) {
        const move = this.getMove();
        takeTurn(move);
      }
    }, 200);
  }

  getMove() {
    const possibleMoves = [];
    board.forEach((value, index) => {
      if (value === '') {
        possibleMoves.push(index);
      }
    });
    // currently random
    return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];;
  }
}

// game functions 
function render() {
  board.forEach((mark, index) => {
    squares[index].textContent = mark;
  });
}

function setClickHandlers() {
  squares.forEach(square => {
    square.addEventListener('click', handleTurn)
  })
}

function changeTurn() {
  turn = turn === 'X' ? 'O' : 'X';
  document.querySelector('.turn').textContent = `It's ${turn}'s turn!`;
}

function isGameOver() {
  let winner;

  winningCombinations.forEach((combo) => {
    if (
      board[combo[0]] &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    ) {
      winner = board[combo[0]];
    }
  });
  if (winner) {
    return winner;
  }
  return board.includes('') ? null : 'T'
}

function setFinalMessage(winner) {
  const message = winner === 'T' ? "It's a Tie!" : `${turn} wins the game!`
  document.querySelector('.turn').textContent = message;
}

function removeAllClickListeners() {
  squares.forEach(square => {
    square.removeEventListener('click', handleTurn)
  })
}

function handleTurn(e) {
  const indexClicked = squares.findIndex(square => square === e.target);
  takeTurn(indexClicked, e); 
}


function takeTurn(index, e = null) {
  if (board[index] == '') {
    board[index] = turn;
    const gameOver = isGameOver();

    if (gameOver) {
      setFinalMessage(gameOver);
      removeAllClickListeners();
    } else {
      changeTurn();
      if (e) {
        e.target.removeEventListener('click', handleTurn);
      }
    }
    render();
  }
}

function init() {
  board = [
    '', '', '',
    '', '', '',
    '', '', ''
  ];
  render();
  new Player('X');
  setClickHandlers()
}

document.querySelector('.reset').addEventListener('click', init)
init();
