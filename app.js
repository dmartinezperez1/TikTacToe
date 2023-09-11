//Player symbols
const player1 = "X";
const player2 = "O";

//table of all possible winner combinations
const winning_combinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

//getting all values from HTML using the ID tags
const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const resetButton = document.getElementById('resetButton')
const winnerMessageText = document.getElementById('winner')
let isPlayer2 = false

startGame()

resetButton.addEventListener('click', startGame)

//Start game function, set player 2, and clear board from previous game
function startGame() {
  isPlayer2 = false
  cellElements.forEach(cell => {
    cell.classList.remove(player1)
    cell.classList.remove(player2)
    cell.removeEventListener('click', handleCellClick)
    cell.removeEventListener('click', handleCellClick, {once:true})
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

//Handles whose turn it is, and check to see if the game has been one before 
//switching turns
function handleCellClick(e) {
  const cell = e.target
  const currentClass = isPlayer2 ? player2 : player1
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

//End game function will produce a message on who won or if it is a draw
function endGame(draw) {
  if (draw) {
    winnerMessageText.innerText = "It's a draw!"
  } else {
    winnerMessageText.innerText = 'Player with $(isPlayer2 ? "O" : "X"}wins!'
  }

  winningMessageElement.classList.add('show')
}