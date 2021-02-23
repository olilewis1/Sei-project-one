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
  const snakeStartPosition = [3, 4, 5]
  const snakeCurrentPosition = [3, 4, 5]
  const snakeTail = []
  let snakeDirection
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
      console.log('invalid key')
      stopMyInterval()
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
      snakeCurrentPosition.unshift(snakeCurrentPosition[0] - 1)
      addSnake()
      createRandomFood()
      console.log(snakeCurrentPosition)
    } else {
      removeSnake()
    }
  }
  function moveSnake() {
    checkFoodBeingEaten()
    
    if (snakeDirection === 'right') {
      removeSnake()
      // remove snake needs to be looked at
      snakeCurrentPosition.unshift(snakeCurrentPosition[0] + 1)
      snakeCurrentPosition.pop()
      addSnake() 
    } else if (snakeDirection === 'left') { 
      removeSnake()
      snakeCurrentPosition.unshift(snakeCurrentPosition[0] - 1)
      snakeCurrentPosition.pop()
      addSnake()
    } else if (snakeDirection === 'up') { 
      removeSnake()
      snakeCurrentPosition.unshift(snakeCurrentPosition[0] - 10)
      snakeCurrentPosition.pop()
      addSnake()
    } else if (snakeDirection === 'down') { 
      removeSnake()
      snakeCurrentPosition.unshift(snakeCurrentPosition[0] + 10)
      snakeCurrentPosition.pop()
      addSnake()
      
    } 
    // move in all directions
  }
  
  function stopMyInterval() { 
    clearInterval(intervalSet)
  }

  //*timer
  // function startMyInterval() { 
  const intervalSet = setInterval(() => {
    moveSnake()
  }, 1000)
  // }

  //*GameOver how do I get it to match up to mutiple. will be  function. 
  if (snakeCurrentPosition === snakeTail[0]) {
    console.log('gameover')
  } else if (snakeTail[0] === snakeTail[1]) {
    console.log('gqmeover')
  }
  //*Game over at walls
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
