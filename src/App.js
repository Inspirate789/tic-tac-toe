import { useState, useEffect } from 'react';
import { calculateWinner, calculateMove, firstEmptyIndex } from './alorithm'

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function squaresEmpty(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] !== null) {
      return false;
    }
  }
  return true;
}

function Board({ xIsNext, squares, onPlay }) {
    if (!xIsNext && squaresEmpty(squares)) {
      const nextSquares = squares.slice();
      let index = calculateMove(nextSquares, 3, 'X');
      if (index !== null) {
        nextSquares[index] = 'X';
      }
      useEffect(() => {
        onPlay(nextSquares);
      }, []);
    }

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
      let index = calculateMove(nextSquares, 3, 'O');
      if (index !== null) {
        nextSquares[index] = 'O';
      }
    } else {
      nextSquares[i] = 'O';
      let index = calculateMove(nextSquares, 3, 'X');
      if (index !== null) {
        nextSquares[index] = 'X';
      }
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    if (firstEmptyIndex(squares) !== null) {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    } else {
      status = 'Draw';
    }
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  function switchSymbol(symbol) {
    setCurrentMove(0);
    setHistory([history[0]]);
    setXIsNext(symbol == 'X');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info-wrapper">
        <div className="symbol-switcher">
          <div className="symbol-switcher-title">Choose your fighter: </div>
          <button className="symbol-button" onClick={() => { switchSymbol('X'); }}>
            X
          </button>
          <button className="symbol-button" onClick={() => { switchSymbol('O'); }}>
            O
          </button>
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}
