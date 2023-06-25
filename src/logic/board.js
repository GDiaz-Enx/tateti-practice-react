import { WINNER_PLAYS } from '../constants.js'

export const checkWinnerFrom = (boardToCheck) => {
  for (const combo of WINNER_PLAYS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  // Si no hay ganador
  return null
}

export const checkEndGame = (newBoard) => {
  // Si no hay espacios vacios, es empate
  return newBoard.every((square) => square !== null)
}