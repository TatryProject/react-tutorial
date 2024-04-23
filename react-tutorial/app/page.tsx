"use client";

import Image from "next/image";
import { useState } from "react";

interface SquareProps {
  index: number;
  symbol: string;
  value: string;
  onClick: (index: number) => void;
}

interface BoardState {
  squares: any[];
  symbol: string;
}

function Square(props: SquareProps) {
  function handleClick() {
    props.onClick(props.index);
  }

  return (
    <button
      className="square"
      onClick={handleClick}
    >
      {props.value}
    </button>
  );
}

export default function Board() {
  const [state, setState] = useState<BoardState>({ squares: Array(9).fill(null), symbol: 'X' });

  function handleClick(index: number): void  {
    setState({squares: state.squares.with(index, state.symbol), symbol: state.symbol == 'X' ? 'O' : 'X'});
  }

  return (
    <>
      <div className="board-row">
        <Square index={0} value={state.squares[0]} onClick={handleClick} symbol={state.symbol}/>
        <Square index={1} value={state.squares[1]} onClick={handleClick} symbol={state.symbol}/>
        <Square index={2} value={state.squares[2]} onClick={handleClick} symbol={state.symbol}/>
      </div>
      <div className="board-row">
        <Square index={3} value={state.squares[3]} onClick={handleClick} symbol={state.symbol}/>
        <Square index={4} value={state.squares[4]} onClick={handleClick} symbol={state.symbol}/>
        <Square index={5} value={state.squares[5]} onClick={handleClick} symbol={state.symbol}/>
      </div>
      <div className="board-row">
        <Square index={6} value={state.squares[6]} onClick={handleClick} symbol={state.symbol}/>
        <Square index={7} value={state.squares[7]} onClick={handleClick} symbol={state.symbol}/>
        <Square index={8} value={state.squares[8]} onClick={handleClick} symbol={state.symbol}/>
      </div>
    </>
  );
}
