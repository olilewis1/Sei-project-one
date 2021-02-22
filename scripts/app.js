function init () { 

  //*grid*// 
  const grid = document.querySelector('.grid') 
  
  const width = 10 
  const cellCount = width * width 
  const cells = []

  //Snake// 
  const snakeClass = 'snake'
  const snakeStartPosition = [3, 4, 5]
  let snakeCurrentPosition = [5]
  //multiple divs 
  const SnakeTailClass = 'snake'
  let snakeCurrentArray = [3, 4, 5]
  let snakeTail = []
  //*food*// 
  const foodClass = 'food'
  const foodStartPosition = 15
  let foodCurrentPosition = Math.floor(Math.random() * Number(100))

  //*functions 

  function addFood (position) { 
    cells[position].classList.add(foodClass)
  }

  function removeFood(position) { 
    cells[position].classList.remove(foodClass)
  }

  function speedUp() { 
    
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
    snakeStartPosition.forEach(element => {
      addSnake(element)
    })
    // addSnake(snakeStartPosition)
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
      // snakeTail = snakeCurrentArray[snakeCurrentArray.length - 5]
      console.log(snakeTail)
      // snakeCurrentPosition = snakeTail.push(snakeCurrentPosition)
      currentScore += 10 
      score.innerText = `${currentScore}`


      console.log(snakeTail)
      // snakeTail.forEach((element)=> { 
      //   addSnake(element -= 1)
      // })
    } else { 
      console.log('hey')
    }


    //Adding snake to end of snake
    snakeCurrentArray.push(snakeCurrentPosition)
    snakeTail = snakeCurrentArray[snakeCurrentArray.length - 2]
    addSnake(snakeTail)
    snakeTail = [snakeCurrentArray[snakeCurrentArray.length - 3]]
    addSnake(snakeTail)
    let snakeAddTail 
    snakeAddTail = snakeCurrentArray[snakeCurrentArray.length - 4]
    removeSnake(snakeAddTail)
    
    console.log('snake tail', snakeTail)
    console.log('snakecurrentarray', snakeCurrentArray)

    // *add snake end 
    // snaketail last number in array found 
    const snakeCurrentNewTail = snakeTail[snakeTail.length - 1]
    // find last occurence of that in main array 
    const SnakeNewCurrent = snakeCurrentArray.lastIndexOf(snakeCurrentNewTail)
    //find 1 less of that in the array 
    const snakeTailPush = snakeCurrentArray[SnakeNewCurrent - 1]
    //add it to the end of snake 
    snakeTail.push(snakeTailPush)
    console.log(snakeTail)
    // snakeTail.forEach(element => {
    //   addSnake(element)
    // })

    
    console.log(snakeCurrentPosition)
    console.log(snakeTail)

    //*GameOver how do I get it to match up to mutiple. 
    if (snakeCurrentPosition === snakeTail[0]) { 
      console.log('gameover')
    } else if (snakeTail[0] === snakeTail[1]) { 
      console.log('gqmeover')
    }

    //*Game over at walls
    
  



    
    
  

  } 



  
  

  //*eventlisteners*// 
  document.addEventListener('keydown', handleKeyUp)


  createGrid(snakeStartPosition)























}


window.addEventListener('DOMContentLoaded', init)