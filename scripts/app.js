function init () { 

  //*grid*// 
  const grid = document.querySelector('.grid') 
  
  const width = 10 
  const cellCount = width * width 
  const cells = []

  //Snake// 
  const snakeClass = 'snake'
  const snakeStartPosition = 5
  let snakeCurrentPosition = [5]
  //multiple divs 
  const SnakeTailClass = 'snake'
  
  let snakeCurrentArray = [3, 4, 5]
  let snakeTail = []
  //*food*// 
  const foodClass = 'food'
  const foodStartPosition = 15
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
      // snakeTail.push(snakeCurrentPosition)
      // snakeTail.forEach((element)=> { 
      //   addSnake(element -= 1)
      // })
    } else if (snakeCurrentPosition === foodCurrentPosition) { 
      removeFood(foodCurrentPosition)
      addFood(foodCurrentPosition = Math.floor(Math.random() * Number(100)))
      // snakeCurrentPosition = snakeTail.push(snakeCurrentPosition)
      currentScore += 10 
      score.innerText = `${currentScore}`
      // snakeTail.forEach((element)=> { 
      //   addSnake(element -= 1)
      // })
    } else { 
      console.log('hey')
    }

    //adding snake tail

    console.log('snake', snakeCurrentPosition)
    
    snakeCurrentArray.push(snakeCurrentPosition)
    console.log(snakeCurrentArray)
    snakeTail = snakeCurrentArray[snakeCurrentArray.length - 2]
    console.log('yes', snakeCurrentArray[snakeCurrentArray.length - 2] )
    
    console.log('snake tail', snakeTail)

    addSnake(snakeTail)
    console.log('started follow', snakeTail)
    removeSnake(snakeTail)
    

    
    
  

    //snake growing// 
    //   if (snakeCurrentPosition === foodStartPosition && key === 39) {
    //     addSnake(SnakeTail = snakeCurrentPosition += 1)
    //   } else  { 
    //     console.log('hello')
    //   }
    
  } 



  
  

  //*eventlisteners*// 
  document.addEventListener('keydown', handleKeyUp)


  createGrid(snakeStartPosition)























}


window.addEventListener('DOMContentLoaded', init)