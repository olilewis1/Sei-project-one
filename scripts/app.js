function init () {
  //*grid*//
  let grid = document.querySelector('.grid')
  const width = 20
  const cellCount = width * width
  const cells = []
  //Snake//
  const snakeClass = 'snake'
  //multiple divs
  const snakeStartPosition = [3, 4, 5]
  const snakeCurrentPosition = [148, 149, 150]
  const audio = document.getElementById('audio')
  const audio2 = document.getElementById('audio2')
  let snakeDirection
  let speed = 1000
  let snakeDirectionInvalid = 'true'
  let snakeTimer
  const gameOverSpan = document.querySelector('#game-over-span')
  const gameOverPic = document.querySelector('#game-over-pic')
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
      } else if (speed === 600) {
        playAudio()
        speed -= 50
      } else if ( speed >= 300) { 
        speed -= 50
      } else if (speed > 100) { 
        speed -= 25
      } else if (speed > 50)
        speed -= 3
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
    audio.pause()
    console.log('gameover')
    clearInterval(snakeTimer)
    console.log(snakeCurrentPosition)
    hideGrid()
    gameOverSpan.classList.add('game-over-span')
    gameOverSpan.innerHTML = `Game Over Fwend, your final score: ${currentScore} `
    gameOverPic.classList.add('game-over-pic')
    gameOverPic.innerHTML = '<img src=https://i.imgur.com/iNEQPBw.png>'
    audio.src = 'https://vgmsite.com/soundtracks/pokemon-gameboy-sound-collection/rkkmtqon/116-victory%20%28vs%20trainer%29.mp3'
    audio.play()
    // stopTimeOut()
    setTimeout(() => {
      location.reload()
    }, 20000)
  }

  function startButtonClick () { 
    
    moveSnake()
    snakeDirection = 'left'
    setTimeout(() => {
      playAudioStart()
    }, 1000)
  }
  function playAudio () { 
    audio.src = 'https://vgmsite.com/soundtracks/pokemon-gameboy-sound-collection/vvdpydwp/101-opening.mp3' 
    audio.play()
  }

  function playAudioStart() { 
    audio.src = 'https://vgmsite.com/soundtracks/pokemon-gameboy-sound-collection/gbhogmtx/107-battle%20%28vs%20wild%20pokemon%29.mp3'
    audio.play()
  }

  function hideGrid() { 
    grid = grid.classList.add('hello')
  }




    




  
  

  //*eventlisteners*//
  document.addEventListener('keydown', handleKeyUp)
  startButton.addEventListener('click', startButtonClick)
  createGrid(snakeCurrentPosition)
}
window.addEventListener('DOMContentLoaded', init)

