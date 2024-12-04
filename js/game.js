const GRASS_WIDTH = 50
const gameScreenWidth = 1000;
const gameScreenHeight = 700;
//let randomXSpaceshipPosition;
//const spaceshipWidth = 100; // Match the spaceship width

class Game {
  constructor() {
    this.gameIntro = document.getElementById('game-intro')
    this.gameScreen = document.getElementById('game-screen')
    this.endScreen1 = document.getElementById('game-end-lose') // will be changed depending on game result
    this.endScreen2 = document.getElementById('game-end-win') // will be changed depending on game result
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
    this.endScreen1.style.display = 'none'
    this.endScreen2.style.display = 'none'
    //const gameScreenWidth = this.gameScreen.clientWidth;
    //randomXSpaceshipPosition = Math.floor(Math.random() * (gameScreenWidth));
  
    // Update the background-position style
    //this.gameScreen.style.backgroundPosition = `${randomXSpaceshipPosition}px 0px, center`;
    this.gameScreen.style.display = 'block'

    this.gameScreen.style.width = `${this.width}px`
    this.gameScreen.style.height = `${this.height}px`

    this.player = new Player(this.gameScreen)

    this.gameLoopPlayer()
   // this.gameLoopEnemy()
  }
  endGame(){
    clearInterval(this.gameLoopPlayerId);
    this.player.element.remove();
    this.enemies.forEach((enemy) => enemy.element.remove());
    this.gameScreen.style.display = 'none';
    this.scoreElement.innerText = this.score;
    this.livesElement.innerText = this.lives;
 }

 // tried to separate player and enemy movements into separate intervals, didn't work
 
gameLoopPlayer() {
  this.gameLoopPlayerId = setInterval(() => {
    //const finishLimitLeft = randomXSpaceshipPosition - spaceshipWidth/2;
    //const finishLimitRight = randomXSpaceshipPosition + spaceshipWidth/2;

    if(!this.Gamover && this.player.element.style.top == `0px` && (this.player.element.style.left <= `250px` && this.player.element.style.left >= `150px` )){
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

    // Handle enemies
   // const nextEnemies = [];
    for(let i = 0; i< this.enemies.length; i++){
      if(this.currentFrame % 120 === 0){
      this.enemies[i].move(); // Move enemy
      }
        // this.player.updatePosition() // update player position
        this.enemies[i].shootAtPlayer(this.player); // Shoot towards the player
         // Handle collision between enemy bullets and the player
         if (this.enemies[i].didCollide(this.player) && !this.player.collisionCooldown) {
           this.lives -= 1;
           console.log('Player hit!');
           console.log(this.lives);
             // Start collision cooldown
            this.player.startCollisionCooldown();
           if (this.lives <= 0) {
             this.livesElement.innerText = this.lives;
             this.isGameOver = true;
           }
         } 
    }
 //   this.enemies.forEach((currentEnemy, index) => {

      

  //  })

    this.enemies.forEach((currentEnemy, index) => {
        
      if (this.player.didCollide(currentEnemy)) {
        // Collision detected: Handle removal and scoring
        this.score += 50; // Increment score
        this.scoreElement.innerText = this.score;
        currentEnemy.element.remove(); // Remove enemy from DOM
        this.enemies.splice(index, 1); // Remove enemy from array
        this.player.bullet.style.display = 'none'; // Hide bullet
        console.log('Enemy hit!');
      }
    });

          // Update remaining enemies
   // this.enemies = nextEnemies;

      // Check if the player's bullet collided with an enemy

   // this.enemies.forEach((enemy, index) => {

   // });


    // Handle game over
    if (this.isGameOver) {
      this.endGame();
      this.endScreen = document.getElementById('game-end-lose');
      this.endScreen.style.display = 'block';
    }
  


  }, 1000 / 60); // Run at 60 FPS
  
}

}