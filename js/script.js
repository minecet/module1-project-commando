window.onload = function () {
  const startButton = document.getElementById('start-button')
  const restartButton1 = document.getElementById('restart-button1')
  const restartButton2 = document.getElementById('restart-button2')

  let game

  function startGame() {
    console.log('start game')
    game = new Game()
    game.start()
  }

  startButton.addEventListener('click', function () {
    startGame()
  })

  restartButton1.addEventListener('click', function () {
    startGame()
  })
  restartButton2.addEventListener('click', function () {
    startGame()
  })


  document.addEventListener('keydown', event => {
    if (event.code === 'ArrowLeft') {
      game.player.directionX = -1

    }
    if (event.code === 'ArrowRight') {
      game.player.directionX = 1

    }

    if (event.code === 'ArrowUp') {
      game.player.directionY = -1

    }
    if (event.code === 'ArrowDown') {
      game.player.directionY = 1

    }
    if (event.code === 'KeyA') {
      // shoot towards left of the player
      //game.player.directionX = -1;
      //game.player.directionY = parseFloat(game.player.element.style.top) || game.player.positionY;
      game.player.shootAtEnemy(-1, 0);

    }
    if (event.code === 'KeyW') {
      // shoot towards upperside of the player
      //game.player.directionX = parseFloat(game.player.element.style.left) || game.player.positionX;
     // game.player.directionY = -1
      game.player.shootAtEnemy(0, -1);

    }
    if (event.code === 'KeyD') {
      // shoot towards rightside of the player
      //game.player.directionX = 1;
      //game.player.directionY = parseFloat(game.player.element.style.top)|| game.player.positionY;
      //console.log(game.player.directionY )
      game.player.shootAtEnemy(1, 0);
 
    }
    if (event.code === 'KeyS') {
      // shoot towards downwards
     // game.player.directionX = parseFloat(game.player.element.style.left) || game.player.positionX;
     // game.player.directionY = 1;
      game.player.shootAtEnemy(0, 1);

    }

  })

  document.addEventListener('keyup', event => {
    if (
      event.code === 'ArrowLeft' ||
      event.code === 'ArrowRight'
    ) {
      game.player.directionX = 0

    }

    if (
      event.code === 'ArrowUp' ||
      event.code === 'ArrowDown'
    ) {

      game.player.directionY = 0
    }
    if(
      event.code === 'KeyA' ||
      event.code === 'KeyW' ||
      event.code === 'KeyD' ||
      event.code === 'KeyS' 
    ) {

      game.player.directionX = 0
      game.player.directionY = 0



    }

})
}
