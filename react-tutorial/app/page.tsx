"use client";

import Image from "next/image";
import { useState } from "react";

const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic',  isFruit: false, id: 2 },
  { title: 'Apple',   isFruit: true,  id: 3 }
]

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  const listItems = products.map(p => 
    <li
      key={p.id}
      style={{
        color: p.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {p.title}
    </li>
  );

  return (
    <div>
      <ul>{listItems}</ul>
      <MyButton count = {count} onClick = {handleClick}/>
      <MyButton count = {count} onClick = {handleClick}/>
    </div>
  );
}

function MyButton({count, onClick}: any) {
    return (
      <button onClick={onClick}>
        Clicked {count} times!
      </button>
    )
}
