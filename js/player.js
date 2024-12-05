class Player {
  // each game has a single player with an astronout image and bullet image. 
  constructor(gameScreen) {
    this.gameScreen = gameScreen
    this.width = 60
    this.height = 100
    this.positionX = gameScreen.clientWidth / 2 - this.width / 2
    this.positionY = gameScreen.clientHeight - this.height - 20
    this.directionX = 0
    this.directionY = 0
    this.speed = 10
    this.element = document.createElement('img')
    this.element.src = 'images/astronaut.png'
    this.element.style.position = 'absolute'
    this.element.style.width = `${this.width}px`
    this.element.style.height = `${this.height}px`
    this.element.style.left = `${this.positionX}px`
    this.element.style.top = `${this.positionY}px`
    this.gameScreen.appendChild(this.element)
    // Initialize bullet properties
   this.bullet = document.createElement('img');
   this.bullet.src = 'images/bomb_gray.png';
   this.bullet.id= "bullet" + this.id;
    this.bullet.style.position = 'absolute';
    this.bullet.style.width = '30px';
    this.bullet.style.height = '30px';
    this.bullet.style.display = 'none';
    this.bullet.style.left = `${this.positionX}px`
    this.bullet.style.top = `${this.positionY}px`
    this.gameScreen.appendChild(this.bullet);
    this.collisionCooldown = false;

  }
  // to avoid multiple life deduction if the player is shot by an enemy, a cooldown is implemented
  startCollisionCooldown() {
    this.collisionCooldown = true;
    setTimeout(() => {
      this.collisionCooldown = false;
    }, 700); // Cooldown period in milliseconds
  }
  updatePosition() {
    this.positionX += this.speed * this.directionX
    if (this.positionX < 0 + 50) {
      this.positionX = 0 + 50
    }
    if (this.positionX > this.gameScreen.clientWidth - this.width - 50) {
      this.positionX = this.gameScreen.clientWidth - this.width - 50
    }

    this.positionY += this.speed * this.directionY
    if (this.positionY < 0) {
      this.positionY = 0
    }
    if (this.positionY > this.gameScreen.clientHeight - this.height) {
      this.positionY = this.gameScreen.clientHeight - this.height
    }
  }

  move() {
    this.updatePosition()
    this.element.style.left = `${this.positionX}px`
    this.element.style.top = `${this.positionY}px`
  }
  //get active position of player in the DOM 
  getPlayerPosition() {
      return {
        x: parseFloat(this.element.style.left), // Get current left position
        y: parseFloat(this.element.style.top)  // Get current top position
      };
    }
    
  // check if the player bullet collides with an enemy
  didCollide(Enemy) {
    const playerbulletRect = this.bullet.getBoundingClientRect()
    const EnemyRect = Enemy.element.getBoundingClientRect()

    return playerbulletRect.left < EnemyRect.right &&
    playerbulletRect.right > EnemyRect.left &&
    playerbulletRect.top < EnemyRect.bottom &&
    playerbulletRect.bottom > EnemyRect.top
  }

  shootAtEnemy(directionX, directionY) {
    if (this.bullet.style.display === 'block') return; // Prevent spamming, important to prevent a second bullet trigger while first one is still active
    // Initialize bullet position, which is the player position
    this.bullet.style.left = `${this.positionX + this.width / 2}px`;
    this.bullet.style.top = `${this.positionY + this.height / 2}px`;
    this.bullet.style.display = 'block';

    const bulletSpeed = 5; // Adjust as needed
    // start moving bullet in the desired enemy direction passed as parameter, this is triggered by keyDown events defined in script.js
    const intervalId = setInterval(() => {

      const bulletPosX = parseFloat(this.bullet.style.left) ;
      const bulletPosY = parseFloat(this.bullet.style.top);
  
      const newPosX = bulletPosX + directionX * bulletSpeed;
      const newPosY = bulletPosY + directionY * bulletSpeed;
  
      this.bullet.style.left = `${newPosX}px`;
      this.bullet.style.top = `${newPosY}px`;
  
      // Debugging
    //  console.log(`Bullet position: (${newPosX}, ${newPosY})`);
  
      // hide bullet if out of bounds
      if (
        newPosX < 0 ||
        newPosY < 0 ||
        newPosX > this.gameScreen.clientWidth ||
        newPosY > this.gameScreen.clientHeight
      ) {
        this.bullet.style.display = 'none'; // Hide bullet
        clearInterval(intervalId);
      }
    }, 500/60); // Runs approximately 60 times per second

  }
}
