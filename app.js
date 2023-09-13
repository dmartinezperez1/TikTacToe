//Player symbols
const player1 = 'X';
const player2 = 'O';

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
let isPlayer2Turn

startGame()

resetButton.addEventListener('click', startGame)

//Start game function, set player 2, and clear board from previous game
function startGame() {
  isPlayer2Turn = false
  cellElements.forEach(cell => {
    cell.classList.remove(player1)
    cell.classList.remove(player2)
    cell.removeEventListener('click', handleCellClick)
    cell.addEventListener('click', handleCellClick, {once:true})
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

//Handles whose turn it is, and check to see if the game has been one before 
//switching turns
function handleCellClick(e) {
  const cell = e.target
  const currentClass = isPlayer2Turn ? player2 : player1
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
    winnerMessageText.innerText = `${isPlayer2Turn ? "O's" : "X's"} Wins!`
  }

  winningMessageElement.classList.add('show')
}

//function to return if game is a draw
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(player1) || cell.classList.contains(player2)
  })
}

//Function to place a X or O in selected cell
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

//swaps turn after each turn
function swapTurns(){
  isPlayer2Turn = !isPlayer2Turn
}

//Function to use cursor to place X or O 
function setBoardHoverClass() {
  boardElement.classList.remove(player1)
  boardElement.classList.remove(player2)
  if (isPlayer2Turn) {
    boardElement.classList.add(player2)
  } else {
    boardElement.classList.add(player1)
  }
}

//Check to see if anyne has won
function checkWin(currentClass) {
  return winning_combinations.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}