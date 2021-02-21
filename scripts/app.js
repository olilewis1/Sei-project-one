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
  //multiple divs 
  let snakeTail = []

  //*food*// 
  const foodClass = 'food'
  const foodStartPosition = 5
  let foodCurrentPosition = Math.floor(Math.random() * Number(100))

  function addFood (position) { 
    cells[position].classList.add(foodClass)
  }

  function removeFood(position) { 
    cells[position].classList.remove(foodClass)
  }

  //*current score// 
  let currentScore = 0 
  const score = document.querySelector('#current-score')


  //making grid work// 
  function createGrid (snakeStartPosition) { 
    for (let i = 0; i < cellCount; i++) { 
      const cell = document.createElement('div')
      cell.textContent = i  
      grid.appendChild(cell)
      cells.push(cell)
    }
    addSnake(snakeStartPosition)
    addFood(foodStartPosition)
  }

  function addSnake(position) {  
    cells[position].classList.add(snakeClass) 
  }

  function removeSnake(position) { 
    cells[position].classList.remove(snakeClass) 
  }


  //*keys*// 
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

    //food being eaten// 
    if (snakeCurrentPosition === foodStartPosition) { 
      addFood(foodCurrentPosition)
      removeFood(foodStartPosition)
      currentScore += 10 
      score.innerText = `${currentScore}`
    } else if (snakeCurrentPosition === foodCurrentPosition) { 
      removeFood(foodCurrentPosition)
      addFood(foodCurrentPosition = Math.floor(Math.random() * Number(100)))
      addSnake(snakeCurrentPosition += 1 )
      currentScore += 10 
      score.innerText = `${currentScore}`
      
    }

    //snake growing// 
    if (snakeCurrentPosition === foodStartPosition && key === 39) {
      addSnake(SnakeTail = snakeCurrentPosition += 1)
    } else { 
      console.log(snakeCurrentPosition)
    }
  }



  
  

  //*eventlisteners*// 
  document.addEventListener('keydown', handleKeyUp)


  createGrid(snakeStartPosition)























}


window.addEventListener('DOMContentLoaded', init)