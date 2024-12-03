window.onload = function () {
  const startButton = document.getElementById('start-button')
  const restartButton = document.getElementById('restart-button')

  let game

  function startGame() {
    console.log('start game')
    game = new Game()
    game.start()
  }

  startButton.addEventListener('click', function () {
    startGame()
  })

  restartButton.addEventListener('click', function () {
    startGame()
  })

  document.addEventListener('keydown', event => {
    if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
      game.player.directionX = -1
    }
    if (event.code === 'KeyD' || event.code === 'ArrowRight') {
      game.player.directionX = 1
    }

    if (event.code === 'KeyW' || event.code === 'ArrowUp') {
      game.player.directionY = -1
    }
    if (event.code === 'KeyS' || event.code === 'ArrowDown') {
      game.player.directionY = 1
    }
  })

  document.addEventListener('keyup', event => {
    if (
      event.code === 'KeyA' ||
      event.code === 'ArrowLeft' ||
      event.code === 'KeyD' ||
      event.code === 'ArrowRight'
    ) {
      game.player.directionX = 0
    }

    if (
      event.code === 'KeyW' ||
      event.code === 'ArrowUp' ||
      event.code === 'KeyS' ||
      event.code === 'ArrowDown'
    ) {
      game.player.directionY = 0
    }
  })
}
