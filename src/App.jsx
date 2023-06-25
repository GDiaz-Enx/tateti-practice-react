import { useState } from 'react'

import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'
import { SquareComponent } from './components/Square.jsx'
import { WinnerModal } from './components/WinnerModal.jsx'

function App () {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // Cambio de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Guarda estado de la partida por si se cierra
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    // Chequea ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // Si es false es porque hay empate
    }
  }

  return (
    <main className='board'>
      <h1>Tateti</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <SquareComponent
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </SquareComponent>
            )
          })
        }
      </section>

      <section className='turn'>
        <SquareComponent isSelected={turn === TURNS.X}>
          {TURNS.X}
        </SquareComponent>
        <SquareComponent isSelected={turn === TURNS.O}>
          {TURNS.O}
        </SquareComponent>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App