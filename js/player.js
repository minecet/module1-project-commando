class Player {
  constructor(gameScreen) {
    this.gameScreen = gameScreen
    this.width = 40
    this.height = 80
    this.positionX = gameScreen.clientWidth / 2 - this.width / 2
    this.positionY = gameScreen.clientHeight - this.height - 20
    this.directionX = 0
    this.directionY = 0
    this.speed = 5
    this.element = document.createElement('img')

    this.element.src = 'images/commando.png'
    this.element.style.position = 'absolute'
    this.element.style.width = `${this.width}px`
    this.element.style.height = `${this.height}px`
    this.element.style.left = `${this.positionX}px`
    this.element.style.top = `${this.positionY}px`

    this.gameScreen.appendChild(this.element)

        // Initialize bullet properties
    //this.bullet = document.createElement('img');
   // this.bullet.src = '../images/bullet.png';
   this.bullet = document.createElement('img');
   this.bullet.src = 'images/bullet.png';
   this.bullet.id= "bullet" + this.id;
    //this.element.style.borderRadius = "50%";
    //this.element.style.backgroundColor = "tomato";
    this.bullet.style.position = 'absolute';
    this.bullet.style.width = '30px';
    this.bullet.style.height = '30px';
    this.bullet.style.display = 'none';
    this.bullet.style.left = `${this.positionX}px`
    this.bullet.style.top = `${this.positionY}px`
    this.gameScreen.appendChild(this.bullet);
  }

  updatePosition() {
    this.positionX += this.speed * this.directionX
    if (this.positionX < 0 + GRASS_WIDTH) {
      this.positionX = 0 + GRASS_WIDTH
    }
    if (this.positionX > this.gameScreen.clientWidth - this.width - GRASS_WIDTH) {
      this.positionX = this.gameScreen.clientWidth - this.width - GRASS_WIDTH
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

  getPlayerPosition() {
      return {
        x: parseFloat(this.element.style.left), // Get current left position
        y: parseFloat(this.element.style.top)  // Get current top position
      };
    }
    
  

  didCollide(Enemy) {
    const playerRect = this.element.getBoundingClientRect()
    const EnemyRect = Enemy.bullet.getBoundingClientRect()

    return (
      playerRect.left < EnemyRect.right &&
      playerRect.right > EnemyRect.left &&
      playerRect.top < EnemyRect.bottom &&
      playerRect.bottom > EnemyRect.top
    )
  }

  shootAtEnemy(directionX, directionY) {
    // if i didnt get the dom values, it was not possible to shoot on time at the player direction
   // const enemyPosition = Enemy.getEnemyPosition();
    //const enemyCenterX = enemyPosition.x + Enemy.width / 2; ;
    //const enemyCenterY = enemyPosition.y + Enemy.height / 2;;
    if (this.bullet.style.display === 'block') return; // Prevent spamming

    // Initialize bullet position
    this.bullet.style.left = `${this.positionX + this.width / 2}px`;
    this.bullet.style.top = `${this.positionY + this.height / 2}px`;
    this.bullet.style.display = 'block';
  
    //const deltaX =  enemyCenterX - this.positionX;
    //const deltaY =  enemyCenterY - this.positionY;
    //const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  // finding the direction was difficult
    //const directionX = deltaX / distance;
    //const directionY = deltaY / distance;
    //const directionX = this.directionX;
    //const directionY = this.directionY;
    const bulletSpeed = 5; // Adjust as needed
    const intervalId = setInterval(() => {

      const bulletPosX = parseFloat(this.bullet.style.left) ;
      const bulletPosY = parseFloat(this.bullet.style.top);
  
      const newPosX = bulletPosX + directionX * bulletSpeed;
      const newPosY = bulletPosY + directionY * bulletSpeed;
  
      this.bullet.style.left = `${newPosX}px`;
      this.bullet.style.top = `${newPosY}px`;
  
      // Debugging
    //  console.log(`Bullet position: (${newPosX}, ${newPosY})`);
  
      // Stop bullet if out of bounds
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
