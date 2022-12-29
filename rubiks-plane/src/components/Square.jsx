import React, { useRef, useState } from 'react'

const DRAGOFFSET = 10

export default function Square({ color, x, y, moveSquares }) {
  const [direction, setDirection] = useState(null);
  const initialMousePos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const [delayElapsed, setDelayElapsed] = useState(false);

  const handleMouseDown = (event) => {
    initialMousePos.current.x = event.clientX;
    initialMousePos.current.y = event.clientY;
    isDragging.current = true;
  }

  const handleMouseMove = (event) => {
    if (isDragging.current) {
      const currentX = event.clientX;
      const currentY = event.clientY;
      const deltaX = currentX - initialMousePos.current.x;
      const deltaY = currentY - initialMousePos.current.y;
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Drag is horizontal
        if (deltaX > 0) {
          setDirection('right');
        } else {
          setDirection('left');
        }
      } else {
        // Drag is vertical
        if (deltaY > 0) {
          setDirection('down');
        } else {
          setDirection('up');
        }
      }
    }

    if (direction) {
      moveSquares(direction, x, y);
      isDragging.current = false;
      initialMousePos.current.x = 0;
      initialMousePos.current.y = 0;
      setDirection(null);
    }
  }

  const handleMouseUp = () => {
    isDragging.current = false;
    initialMousePos.current.x = 0;
    initialMousePos.current.y = 0;
    setDirection(null);
  }

  return (
    <div className='Square rounded m-1' 
      onClick={() => console.log(y, x)}
      style={{ width: "50px", height: "50px", backgroundColor: color}} 
      onMouseDown={handleMouseDown} /* onTouchStart={console.log()} */
      onMouseMove={handleMouseMove} /* onTouchMove={handleTouchMove} */
      onMouseUp={handleMouseUp} />
  )
}
