function init () {
  //*grid*//
  const grid = document.querySelector('.grid')
  const width = 10
  const cellCount = width * width
  const cells = []
  //Snake//
  const snakeClass = 'snake'
  //multiple divs
  // const SnakeTailClass = 'snake'
  // const snakeStartPosition = [3, 4, 5]
  const snakeCurrentPosition = [3, 4, 5]
  const snakeTail = []
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
    removeSnake(snakeCurrentPosition)
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
      gameOver()
    }
    addSnake(snakeCurrentPosition)
  }
  //*food being eaten//
  function checkFoodBeingEaten() {
    const foodCheck = cells[snakeCurrentPosition[0]].classList.contains(foodClass)
    if (foodCheck) {
      removeFood()
      currentScore += 10
      score.innerText = `${currentScore}`
      snakeCurrentPosition.push(snakeCurrentPosition[0])
      addSnake()
      createRandomFood()
      speed -= 100
      console.log(speed)
    } else {
      removeSnake()
    }
  }
  function moveSnake() {
    checkFoodBeingEaten()
    if (snakeDirection === 'right') {
      removeSnake()
      snakeCurrentPosition.unshift(snakeCurrentPosition[0] + 1)
      snakeCurrentPosition.pop()
      addSnake() 
      gameOver()
      console.log('right', snakeCurrentPosition)
    } else if (snakeDirection === 'left') { 
      removeSnake()
      snakeCurrentPosition.unshift(snakeCurrentPosition[0] -= 1)
      snakeCurrentPosition.pop()
      snakeCurrentPosition[1] += 1
      addSnake()
      gameOver()
      console.log('left', snakeCurrentPosition)
    } else if (snakeDirection === 'up') { 
      removeSnake()
      snakeCurrentPosition.unshift(snakeCurrentPosition[0] -= width)
      snakeCurrentPosition[1] += width
      snakeCurrentPosition.pop()
      addSnake()
      gameOver()
      console.log('up', snakeCurrentPosition)
    } else if (snakeDirection === 'down') { 
      removeSnake()
      snakeCurrentPosition.unshift(snakeCurrentPosition[0] += width)
      snakeCurrentPosition[1] -= width
      snakeCurrentPosition.pop()
      addSnake()
      gameOver()
      console.log('down', snakeCurrentPosition)
      
    } 
    // move in all directions
  }
  
  

  function gameOver() { 
    const gameOverSnake = snakeCurrentPosition.filter((element)=> { 
      return element === snakeCurrentPosition[0]
    })
    if ( gameOverSnake.length >= 2){ 
      console.log('GAME OVER SNAKE')
      stopMyInterval()
      console.log(snakeCurrentPosition)
      // alert('GAME OVER FWEND!')
    } else if (snakeDirectionInvalid === 'invalid') { 
      console.log('GAME OVER Wall')
      stopMyInterval()
      // alert('GAME OVER FWEND!')
    }
  }

  function stopMyInterval() { 
    clearInterval(intervalSet)
  }

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
  const intervalSet = setInterval(() => {
    moveSnake()
  }, speed)
  console.log('interval set', setInterval)
  // }

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
