"use client";

import { useEffect, useState } from "react";

interface BoardProps {
  squares: any[];
  onPlay: any;
  winner: string | null;
  xIsNext: boolean;
}

interface SquareProps {
  value: string;
  onSquareClick: any;
}

interface GameState {
  history: any[][];
  winner: string | null;
}

function Square(props: SquareProps) {
  return (
    <button
      className="square"
      onClick={props.onSquareClick}
    >
      {props.value}
    </button>
  );
}

function Board(props: BoardProps) {
  function handleClick(index: number): void {
    if (props.squares[index] || props.winner) return;

    const nextSquares = props.squares.with(index, props.xIsNext ? "X" : "O");
    props.onPlay(nextSquares);
  }

  let status;
  if (props.winner) {
    status = "Winner: " + props.winner;
  } else {
    status = "Next player: " + (props.xIsNext ? "X" : "O")
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={props.squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={props.squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={props.squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={props.squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={props.squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={props.squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={props.squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={props.squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={props.squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}

export default function Game() {
  const [state, setState] = useState<GameState>({ history: [Array(9).fill(null)], winner: null });
  const currentSquares = state.history[state.history.length - 1];
  const xIsNext = state.history.length % 2 == 1;

  useEffect(() => {
    const possibleWinner = calculateWinner(currentSquares)
    if (possibleWinner != null) {
      setState({...state, winner: possibleWinner});
    } else if (state.winner) { // Reset winner if we travel back in time
      setState({...state, winner: null})
    }
  }, [currentSquares]);

  function handlePlay(nextSquares: any[]): void  {
    setState({
      ...state,
      history: [...state.history, nextSquares ]
    });
  }

  function jumpTo(move: number): void {
    setState({
      ...state,
      history: [ ...state.history.slice(0, move + 1) ]
    })
  }

  const moves = state.history.map((_, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button className="history-button" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onPlay={handlePlay} winner={state.winner} xIsNext={xIsNext}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: any[]): string | null {
  const winConditions = [
    [ 0, 1, 2 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ],
    [ 0, 3, 6 ],
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
    [ 0, 4, 8 ],
    [ 2, 4, 6 ]
  ]

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
