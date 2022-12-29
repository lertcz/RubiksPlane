import React, { useState } from 'react'
import Square from './Square'

export default function PlayingField() {
  const amount = 6
  const colors = ["Red", "Green", "Blue", "Yellow", "Orange", "White"]
  const [squares, setSquares] = useState(generateSquares())

  function generateSquares() {
    return Array.from(Array(amount), (n, i) => new Array(amount).fill(colors[i]))
  }

  function moveSquares(dir, x, y) {
    console.log(dir, x, y)
    if (dir === "right") {
      let temp = JSON.parse(JSON.stringify(squares))
      temp[y].push(temp[y].reverse().shift())
      temp[y].reverse()
      setSquares(temp)
    }
    else if (dir === "left") {
      let temp = JSON.parse(JSON.stringify(squares))
      temp[y].push(temp[y].shift())
      setSquares(temp)
    }
    if (dir === "up") {
      let temp = squares[0].map((col, i) => squares.map(row => row[i])) // transpose
      temp[x].push(temp[x].shift())
      setSquares(temp[0].map((col, i) => temp.map(row => row[i]))) // revert and set
      console.log(temp[0].map((col, i) => temp.map(row => row[i])))
    }
    else if (dir === "down") {
      let temp = squares[0].map((col, i) => squares.map(row => row[i])) // transpose
      temp[x].push(temp[x].reverse().shift())
      temp[x].reverse()
      setSquares(temp[0].map((col, i) => temp.map(row => row[i]))) // revert and set
    }
  }

  return (
    <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
      <div className='border rounded p-3' style={{ backgroundColor: "#121212" }}>
        {squares.map((row, i) => 
          <div key={"div".repeat(i)} className='d-flex flex-row'>
            {row.map((color, j) => <Square key={amount*i + j} color={color} y={i} x={j} moveSquares={moveSquares} />)}
          </div>
        )}
      </div>
    </div>
  )
}
