function init () {
  //*grid*//
  const grid = document.querySelector('.grid')
  const width = 20
  const cellCount = width * width
  const cells = []
  //Snake//
  const snakeClass = 'snake'
  //multiple divs
  const snakeStartPosition = [3, 4, 5]
  const snakeCurrentPosition = [3, 4, 5]
  const roundedSquareTopLeft = [0]
  const roundedSquareTopRight = [19]
  const roundedSquareBottomLeft = [380]
  const roundedSquareBottomRight = [399]
  const topLeftClass = 'border'
  const topRightClass = document.getElementsByClassName('border-radius-top-right')
  const bottomLeftClass = document.getElementsByClassName('border-radius-bottom-left')
  const bottomRightClass = document.getElementsByClassName('border-radius-bottom-right ')
  // roundedSquareTopLeft.classList.add(topLeftClass)
  // cells[0].classList.add('border')
  let snakeDirection
  let speed = 1000
  let snakeDirectionInvalid = 'true'
  let snakeTimer
  //*food*//
  const foodClass = 'food'
  //*start button*// 
  const startButton = document.querySelector('button')
  console.log('clicked', startButton)
  console.log('start button ', startButton)

  //*functions
  function createRandomFood() {
    const foodCurrentPosition = Math.floor(Math.random() * Number(399))
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
    // myTimeout()
    if (key === 39) {
      snakeDirection = 'right'
      moveSnake()
    } else if (key === 37) {
      // snakeCurrentPosition--
      snakeDirection = 'left'
      moveSnake()
    } else if (key === 38) {
      // snakeCurrentPosition -= width
      snakeDirection = 'up'
      moveSnake()
      
    } else if (key === 40) {
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
      if (speed >= 700) { 
        speed -= 100
      } else if ( speed >= 300) { 
        speed -= 50
      } else if (speed > 50) { 
        speed -= 25
      }
      console.log(speed)
    } else {
      removeSnake() 
    }
  }
  function moveSnake() {
    clearInterval(snakeTimer)
    snakeTimer = setInterval(() => {
      checkFoodBeingEaten()
      const gameOverSnake = snakeCurrentPosition.filter((element)=> { 
        return element === snakeCurrentPosition[0]
      })
      if (snakeDirection === 'right' && snakeCurrentPosition[0] % width !== width - 1 && gameOverSnake.length < 2) {
        removeSnake()
        snakeCurrentPosition.unshift(snakeCurrentPosition[0] + 1)
        snakeCurrentPosition.pop()
        addSnake() 
      } else if (snakeDirection === 'left' && snakeCurrentPosition[0] % width !== 0 && gameOverSnake.length < 2) { 
        removeSnake()
        snakeCurrentPosition.unshift(snakeCurrentPosition[0] -= 1 && gameOverSnake.length < 2)
        snakeCurrentPosition.pop()
        snakeCurrentPosition[1] += 1
        addSnake()
      } else if (snakeDirection === 'up' && snakeCurrentPosition[0] >= width && gameOverSnake.length < 2) { 
        removeSnake()
        snakeCurrentPosition.unshift(snakeCurrentPosition[0] -= width)
        snakeCurrentPosition[1] += width
        snakeCurrentPosition.pop()
        addSnake()
      } else if (snakeDirection === 'down' && snakeCurrentPosition[0] + width <= width * width - 1 && gameOverSnake.length < 2) { 
        removeSnake()
        snakeCurrentPosition.unshift(snakeCurrentPosition[0] += width)
        snakeCurrentPosition[1] -= width
        snakeCurrentPosition.pop()
        addSnake()
      } else { 
        gameOver()
      }
    }, speed)
  }
  
  function gameOver() { 
    console.log('gameover')
    clearInterval(snakeTimer)
    console.log(snakeCurrentPosition)
    alert(`Game Over Fwend, your final score: ${currentScore}`)
    // stopTimeOut()
    setTimeout(() => {
      location.reload()
    }, 3000)
  }

  function startButtonClick () { 
    moveSnake()
    snakeDirection = 'left'
  }


  
  

  //*eventlisteners*//
  document.addEventListener('keydown', handleKeyUp)
  startButton.addEventListener('click', startButtonClick)
  createGrid(snakeCurrentPosition)
}
window.addEventListener('DOMContentLoaded', init)

