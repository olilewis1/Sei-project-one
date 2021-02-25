function init () {
  //*grid*//
  const grid = document.querySelector('.grid')
  const width = 10
  const cellCount = width * width
  const cells = []
  //Snake//
  const snakeClass = 'snake'
  //multiple divs
  const snakeStartPosition = [3, 4, 5]
  const snakeCurrentPosition = [3, 4, 5]
  let snakeDirection
  let speed = 1000
  let snakeDirectionInvalid = 'true'
  //*food*//
  const foodClass = 'food'
  //*functions


  function createRandomFood() {
    const foodCurrentPosition = Math.floor(Math.random() * Number(100))
    addFood(foodCurrentPosition)
  }
  function addFood (position) {
    cells[position].classList.add(foodClass)
  }
  function removeFood() {
    snakeCurrentPosition.forEach(position => {
      cells[position].classList.remove(foodClass)
    })
  }
  //*current score//
  let currentScore = 0
  const score = document.querySelector('#current-score')
  //*making grid work//
  function createGrid () {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    addSnake()
    createRandomFood()
  }
  function addSnake() {
    snakeCurrentPosition.forEach(position => {
      cells[position].classList.add(snakeClass)
    })
  }
  function removeSnake() {
    snakeCurrentPosition.forEach(position => {
      cells[position].classList.remove(snakeClass)
    })
  }
  //*keys*//
  function handleKeyUp(event) {
    const key = event.keyCode
    // removeSnake(snakeCurrentPosition)
    addSnake()
    myTimeout()
    if (key === 39 && snakeCurrentPosition[0] % width !== width - 1 ) {
      snakeDirection = 'right'
      moveSnake()
    } else if (key === 37 && snakeCurrentPosition[0] % width !== 0) {
      // snakeCurrentPosition--
      snakeDirection = 'left'
      moveSnake()
    } else if (key === 38 && snakeCurrentPosition[0] >= width) {
      // snakeCurrentPosition -= width
      snakeDirection = 'up'
      moveSnake()
      
    } else if (key === 40 && snakeCurrentPosition[0] + width <= width * width - 1 ) {
      // snakeCurrentPosition += width
      snakeDirection = 'down'
      moveSnake()
    } else {
      snakeDirectionInvalid = 'invalid'
      console.log('invalid key')
      // gameOver()
    }
    // addSnake(snakeCurrentPosition)
  }
  //*food being eaten//
  function checkFoodBeingEaten() {
    const foodCheck = cells[snakeCurrentPosition[0]].classList.contains(foodClass)
    if (foodCheck) {
      removeFood()
      currentScore += 10
      score.innerText = `${currentScore}`
      snakeCurrentPosition.push(snakeCurrentPosition[1])
      addSnake()
      createRandomFood()
      speedUp()
      console.log(speed)
    } else {
      removeSnake() 
    }
  }
  function moveSnake() {
    checkFoodBeingEaten()
    const gameOverSnake = snakeCurrentPosition.filter((element)=> { 
      return element === snakeCurrentPosition[0]
    })
    if (snakeDirection === 'right' && snakeCurrentPosition[0] % width !== width - 1 && gameOverSnake.length < 2) {
      removeSnake()
      snakeCurrentPosition.unshift(snakeCurrentPosition[0] + 1)
      snakeCurrentPosition.pop()
      addSnake() 
      myTimeout()
    } else if (snakeDirection === 'left' && snakeCurrentPosition[0] % width !== 0 && gameOverSnake.length < 2) { 
      removeSnake()
      snakeCurrentPosition.unshift(snakeCurrentPosition[0] -= 1 && gameOverSnake.length < 2)
      snakeCurrentPosition.pop()
      snakeCurrentPosition[1] += 1
      addSnake()
      myTimeout()
    } else if (snakeDirection === 'up' && snakeCurrentPosition[0] >= width && gameOverSnake.length < 2) { 
      removeSnake()
      snakeCurrentPosition.unshift(snakeCurrentPosition[0] -= width)
      snakeCurrentPosition[1] += width
      snakeCurrentPosition.pop()
      addSnake()
      myTimeout()
    } else if (snakeDirection === 'down' && snakeCurrentPosition[0] + width <= width * width - 1 && gameOverSnake.length < 2) { 
      removeSnake()
      snakeCurrentPosition.unshift(snakeCurrentPosition[0] += width)
      snakeCurrentPosition[1] -= width
      snakeCurrentPosition.pop()
      addSnake()
      myTimeout()
    } else { 
      gameOver()
      console.log('are we going here?')
      clearTimeout()
    }
    
  }
  
  

  function gameOver() { 
    console.log('gameover')
    // stopMyInterval()
    console.log(snakeCurrentPosition)
    // alert('GAME OVER FWEND!')
    stopTimeOut()
  }

  function stopTimeOut () { 
    clearTimeout(myTimeout)
  }
  function myTimeout() { setTimeout(() => {
    moveSnake()
    console.log('speed', speed)
  }, speed)
  }

  function speedUp() { 
    if (speed > 100) { 
      speed -= 100
    }
  }
  // function stopMyInterval() { 
  //   clearInterval(intervalSet)
  // }


  // function speedUp (newSpeed) { 
  //   // if (typeof loopGame === undefined) { 
  //   //   stopMyInterval()
  //   // } else { 
  //   // console.log('speeding')
  //   loopGame = setInterval(newSpeed)  
  //   speed -= 500
  //   newSpeed = speed -= 100
  //   console.log('speed =', speed)
  //   // }
  // }

  //*timer
  // function startMyInterval() { 
  
  

  //*eventlisteners*//
  document.addEventListener('keydown', handleKeyUp)
  createGrid(snakeCurrentPosition)
}
window.addEventListener('DOMContentLoaded', init)
// next steps
// get snake moving right left up and down
// check our remove snake function - console.log your way through it
// make sure its being called in the right places
// use console.log to figure out why our food check is always true
// get it moving on a timer
