class Enemy {
    // each game has many randomly generated enemies with an alien image and his bullet image. 
    static id = 0;
    constructor(gameScreen) {
    this.id = Enemy.id++;
    this.numEnemies = 0;
    this.gameScreen = gameScreen
    this.width = 60
    this.height = 100
    this.positionX =
      Math.round(Math.random() * (gameScreen.clientWidth - this.width - 50* 2)) + 50
    this.positionY = Math.round(Math.random() * (gameScreen.clientWidth - this.width - 50 * 2)) + 50
    this.positionBulletX = this.positionX;
    this.positionBulletY = this.positionY;
    this.speed = 50
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement('img')
    // enemy image and position
    this.numEnemies++;
    this.element.src = 'images/alien.png'
    this.element.id = "enemy" + this.id;
    this.element.style.position = 'absolute'
    this.element.style.width = `${this.width}px`
    this.element.style.height = `${this.height}px`
    this.element.style.left = `${this.positionX}px`
    this.element.style.top = `${this.positionY}px`
    this.toggle = Math.floor(Math.random());
    this.gameScreen.appendChild(this.element)
    // Initialize bullet properties
   this.bullet = document.createElement('img');
   this.bullet.src = 'images/bomb_green.png';
   this.bullet.id= "bullet" + this.id;
    this.bullet.style.position = 'absolute';
    this.bullet.style.width = '30px';
    this.bullet.style.height = '30px';
    this.bullet.style.display = 'none';
    this.bullet.style.left = `${this.positionX}px`
    this.bullet.style.top = `${this.positionY}px`
    this.gameScreen.appendChild(this.bullet);

  }
  updatePosition() {
    // update the position of the enemy to a random location
    const randomDirectionX = Math.random() > 0.5 ? 1 : -1;
    const randomDirectionY = Math.random() > 0.5 ? 1 : -1;

    this.positionX += this.speed * randomDirectionX;
    this.positionY += this.speed * randomDirectionY;

    // Keep enemies within screen bounds
    this.positionX = Math.min(this.gameScreen.clientWidth - this.width, this.positionX);
    this.positionY = Math.min(this.gameScreen.clientHeight - this.height, this.positionY);
  }

  move() {
    this.updatePosition()
    this.element.style.top = `${this.positionY}px`
    this.element.style.left = `${this.positionX}px`

  }
    // Enemy shoots at player
    shootAtPlayer(Player) {
      if (this.bullet.style.display === 'block') return; // Prevent spamming

      // if i didnt get the dom values, it was not possible to shoot on time at the player direction
      const playerPosition = Player.getPlayerPosition();
      const playerCenterX = playerPosition.x + Player.width / 2; ;
      const playerCenterY = playerPosition.y + Player.height / 2;;
      
      // Initialize bullet position
      this.bullet.style.left = `${this.positionX + this.width / 2}px`;
      this.bullet.style.top = `${this.positionY + this.height / 2}px`;
      this.bullet.style.display = 'block';
      // shortest path of the bullet from enemy to the player
      const deltaX =  playerCenterX - this.positionX;
      const deltaY =  playerCenterY - this.positionY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    // finding the right direction was difficult
      const directionX = deltaX / distance;
      const directionY = deltaY / distance;
      const bulletSpeed = 5; // Adjust as needed
      // bullet also moves 60fps and is hidden if it gets out of bounds of screen
      const intervalId = setInterval(() => {
      const bulletPosX = parseFloat(this.bullet.style.left) || this.positionX;
      const bulletPosY = parseFloat(this.bullet.style.top) || this.positionY;
      const newPosX = bulletPosX + directionX * bulletSpeed;
      const newPosY = bulletPosY + directionY * bulletSpeed;
      this.bullet.style.left = `${newPosX}px`;
      this.bullet.style.top = `${newPosY}px`;
      // Debugging
      // console.log(`Bullet position: (${newPosX}, ${newPosY})`);
  
      // Stop bullet if out of bounds
      if (
        newPosX < 0 ||
        newPosY < 0 ||
        newPosX > this.gameScreen.clientWidth ||
        newPosY > this.gameScreen.clientHeight
      ) {
        this.bullet.style.display = 'none'; // Hide bullet
        clearInterval(intervalId); // Stop movement
      }
      }, 1000/60); // Runs approximately 60 times per second
    }
    // used for dynamically getting enemy position in DOM
    getEnemyPosition() {
      return {
        x: parseFloat(this.element.style.left), // Get current left position
        y: parseFloat(this.element.style.top)  // Get current top position
      };
    }
    // check if the enemy bullet collides with the player
    didCollide(Player) {
      const enemyBulletRect = this.bullet.getBoundingClientRect()
      const PlayerRect = Player.element.getBoundingClientRect()
      
      return (
        enemyBulletRect.left < PlayerRect.right &&
        enemyBulletRect.right > PlayerRect.left &&
        enemyBulletRect.top < PlayerRect.bottom &&
        enemyBulletRect.bottom > PlayerRect.top
      )
    }

  }
