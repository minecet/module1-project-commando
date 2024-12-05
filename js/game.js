const gameScreenWidth = 1000;
const gameScreenHeight = 700;
let shipPositionX;
class Game {
  constructor() {
    this.gameIntro = document.getElementById('game-intro')
    this.gameScreen = document.getElementById('game-screen')
    this.endScreen1 = document.getElementById('game-end-lose') // will be changed depending on game result
    this.endScreen2 = document.getElementById('game-end-win') // will be changed depending on game result
    this.spaceship = document.getElementById('ship');
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
    this.spaceshipX = Math.floor(Math.random()*(1000-400)+ 400)
    this.spaceshipY = 30; // from css
    this.spaceship.style.left = `${this.spaceshipX}px`;
  }

  start() {
    this.gameIntro.style.display = 'none'
    this.endScreen1.style.display = 'none'
    this.endScreen2.style.display = 'none'
    this.gameScreen.style.display = 'block'
    //console.log(this.gameScreen.element.backgroundImage.left)
    this.spaceship.style.display = 'block'
    this.scoreElement.style.display = "block"
  //  this.spaceship.style.display = "none"
    this.gameScreen.style.width = `${this.width}px`
    this.gameScreen.style.height = `${this.height}px`
    this.player = new Player(this.gameScreen)    
   // console.log(this.spaceship.element.style.left)
   // shipPositionX = Math.floor(Math.random(1000-300)+ 300);
    //this.spaceship.style.left = `${shipPositionX}px`
    //console.log(shipPositionX)
    this.gameLoopPlayer()
  }
  // helper function to endGame, both in case of win or loss
  endGame(){
    clearInterval(this.gameLoopPlayerId);
    this.player.element.remove();
    this.enemies.forEach((enemy) => enemy.element.remove());
    this.gameScreen.style.display = 'none';
    this.spaceship.style.display = 'none'

    this.scoreElement.innerText = this.score;
    this.livesElement.innerText = this.lives;
   // this.gameScreen.style.display = 'none';
  }

 // tried to separate player and enemy movements into separate intervals, didn't work. everything in single gameloop 
gameLoopPlayer(gameScreen) {
  this.gameLoopPlayerId = setInterval(() => {
    // first thing to check, if the player is still alive and reached the spaceship, player wins
    const playerPosition = this.player.getPlayerPosition();
    console.log(this.player.element.style.top, this.player.element.style.left)
    if(!this.Gamover && ((playerPosition.y >= this.spaceshipY  && playerPosition.y <= this.spaceshipY + 15))){
      this.endGame();
      this.endScreen = document.getElementById('game-end-win');
      this.endScreen.style.display = 'block';
    }

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

    // Handles for each enemy
    for(let i = 0; i< this.enemies.length; i++){
      if(this.currentFrame % 120 === 0){ 
        // every 2 seconds move the enemy
        this.enemies[i].move(); 
      }
        // Shoot towards the player
        this.enemies[i].shootAtPlayer(this.player); 
         // Handle collision between enemy bullets and the player, if player is hit by this enemy, it has collision cooldown period otherwise the time of the frame update is too fast and all lives are deducted 
         if (this.enemies[i].didCollide(this.player) && !this.player.collisionCooldown) {
           this.lives -= 1;
           this.enemies[i].bullet.style.display = 'none'; // Hide bullet if the enemy shots the player
           console.log('Player hit!');
           console.log(this.lives);
             // Start collision cooldown
            this.player.startCollisionCooldown();
           if (this.lives <= 0) {
             this.livesElement.innerText = this.lives; // update lives on screen
             this.isGameOver = true;
           }
         } 
    }

    // handle attacks from player to enemies
    this.enemies.forEach((currentEnemy, index) => {
      if (this.player.didCollide(currentEnemy, gameScreen)) {
        // Collision detected: Handle removal of enemy and scoring
          // Trigger explosion animation at the enemy's position when bullet hits
          const explosion = document.createElement('div');
          explosion.classList.add('explosion');
          const enemyPosition = currentEnemy.getEnemyPosition();
          explosion.style.left = `${enemyPosition.x}px`;
          explosion.style.top = `${enemyPosition.y}px`;
          this.gameScreen.appendChild(explosion);
          setTimeout(() => {
            explosion.remove();
          }, 800); // Match animation duration
          //console.log(enemyPosition.x, enemyPosition.y)
      
          this.score += 50; // Increment score
          this.scoreElement.innerText = this.score; // update score on screen
          currentEnemy.element.remove(); // Remove enemy from DOM
          this.enemies.splice(index, 1); // Remove enemy from array
          this.player.bullet.style.display = 'none'; // Hide bullet
          console.log('Enemy hit!');
      }
    });
    // Handle game over
    if (this.isGameOver) {
      this.endGame();
      this.endScreen = document.getElementById('game-end-lose');
      this.endScreen.style.display = 'block';
    }

  }, 1000 / 60); // Run at 60 FPS
  
}

}