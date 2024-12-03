const GRASS_WIDTH = 50
const gameScreenWidth = 1000;
const gameScreenHeight = 800;

class Game {
  constructor() {
    this.gameIntro = document.getElementById('game-intro')
    this.gameScreen = document.getElementById('game-screen')
    this.endScreen = document.getElementById('game-end')
    this.scoreElement = document.getElementById('score')
    this.livesElement = document.getElementById('lives')
    this.width = gameScreenWidth
    this.height = gameScreenHeight
    this.player
    this.gameLoopPlayerId
    this.gameLoopEnemyId
    this.currentFrame = 0
    this.numEnemies = 0;

    this.enemies = []
    this.score = 0
    this.lives = 3
    this.isGameOver = false
  }

  start() {
    this.gameIntro.style.display = 'none'
    this.endScreen.style.display = 'none'
    this.gameScreen.style.display = 'block'

    this.gameScreen.style.width = `${this.width}px`
    this.gameScreen.style.height = `${this.height}px`

    this.player = new Player(this.gameScreen)

    this.gameLoopPlayer()
   // this.gameLoopEnemy()
  }


  /*gameLoopPlayer() {
    this.gameLoopPlayerId = setInterval(() => {
      this.currentFrame += 1
      this.scoreElement.innerText = this.score
      this.livesElement.innerText = this.lives

      if (this.currentFrame % 60 === 0 && this.enemies.length <5) {
        this.enemies.push(new Enemy(this.gameScreen))
      
      }
      this.player.move()

      if (this.isGameOver) {
        clearInterval(this.gameLoopPlayerId)
        this.player.element.remove()
        this.enemies.forEach(currentEnemey => {
          currentEnemey.element.remove()
        })
        this.gameScreen.style.display = 'none'
        this.endScreen.style.display = 'block'
      }
    }, 1000 / 60)
  }
  gameLoopEnemy(){
    this.gameLoopEnemyId = setInterval( () => {
      const nextEnemies = []
      this.enemies.forEach(currentEnemey => {
        currentEnemey.move()
        //const currentEnemyBullet = new Bullet();
        currentEnemy.shoot(this.player);
        if (this.player.didCollide(currentEnemy)) {
          //currentEnemey.element.remove()
          this.lives -= 1
          if (this.lives < 0) {
            this.isGameOver = true
          }
        }
         else {
          nextEnemies.push(currentEnemey)
        }
      })
      this.enemies = nextEnemies;
      if (this.isGameOver) {
        clearInterval(this.gameLoopEnemyId);
      }
    }, 2000/60)
  }
}*/
gameLoopPlayer() {
  this.gameLoopPlayerId = setInterval(() => {
    this.currentFrame += 1;
    this.scoreElement.innerText = this.score;
    this.livesElement.innerText = this.lives;

    // Move player
    this.player.move();

    // Spawn enemies every 2 seconds (120 frames at 60 FPS)
    if (this.currentFrame % 120 === 0) {
      const newEnemy = new Enemy(this.gameScreen);
      this.enemies.push(newEnemy);
    }

    // Handle enemies
    const nextEnemies = [];
    this.enemies.forEach((currentEnemy) => {
      if(this.currentFrame % 120 === 0){
        currentEnemy.move(); // Move enemy
       // this.player.updatePosition() // update player position
        currentEnemy.shootAtPlayer(this.player); // Shoot towards the player
  
      }

      // Check collision with player
      if (this.player.didCollide(currentEnemy)) {
        this.lives -= 1;
        if (this.lives <= 0) {
          this.isGameOver = true;
        }
      } else {
        nextEnemies.push(currentEnemy); // Keep enemies that haven't collided
      }
    })
          // Update remaining enemies
    this.enemies = nextEnemies;

    // Handle game over
    if (this.isGameOver) {
      clearInterval(this.gameLoopPlayerId);
      this.player.element.remove();
      this.enemies.forEach((enemy) => enemy.element.remove());
      this.gameScreen.style.display = 'none';
      this.endScreen.style.display = 'block';
    }
  


  }, 1000 / 60); // Run at 60 FPS
  
}
}