function init () { 

  //*grid*// 
  const grid = document.querySelector('.grid') 
  
  const width = 10 
  const cellCount = width * width 
  const cells = []

  //Snake// 
  const snakeClass = 'snake'
  const snakeStartPosition = 0 
  let snakeCurrentPosition = 0 

  function createGrid (snakeStartPosition) { 
    for (let i = 0; i < cellCount; i++) { 
      const cell = document.createElement('div')
      cell.textContent = i  
      grid.appendChild(cell)
      cells.push(cell)
    }
    addSnake(snakeStartPosition)
  }

  function addSnake(position) { 
    cells[position].classList.add(snakeClass)
  }

  function removeSnake(position) { 
    cells[position].classList.remove(snakeClass)
  }

  function handleKeyUp(event) { 
    const key = event.keyCode
    removeSnake(snakeCurrentPosition)
    if (key === 39 && snakeCurrentPosition % width !== width - 1 ) { 
      snakeCurrentPosition++ 
    } else if (key === 37 && snakeCurrentPosition % width !== 0) { 
      snakeCurrentPosition--
    } else if (key === 38 && snakeCurrentPosition >= width) { 
      snakeCurrentPosition -= width
    } else if (key === 40 && snakeCurrentPosition + width <= width * width - 1) { 
      snakeCurrentPosition += width
    } else { 
      console.log('invalid key')
    }
    addSnake(snakeCurrentPosition)
  }

  document.addEventListener('keydown', handleKeyUp)


  createGrid(snakeStartPosition)























}


window.addEventListener('DOMContentLoaded', init)