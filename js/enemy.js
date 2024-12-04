class Enemy {
   static id = 0;
  constructor(gameScreen) {
    this.id = Enemy.id++;
    this.numEnemies = 0;
    this.gameScreen = gameScreen
    this.width = 40
    this.height = 80
    let randomPositionX = 0;
    this.positionX =
      Math.round(Math.random() * (gameScreen.clientWidth - this.width - GRASS_WIDTH * 2)) +
      GRASS_WIDTH
    this.positionY = Math.round(Math.random() * (gameScreen.clientWidth - this.width - GRASS_WIDTH * 2)) +
    GRASS_WIDTH
    this.positionBulletX = this.positionX;
    this.positionBulletY = this.positionY;
    this.speed = 20
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement('img')
    // enemy image and position
    this.numEnemies++;
    this.element.src = '/images/enemy.png'
    this.element.id = "enemy" + this.id;
    this.element.style.position = 'absolute'
    this.element.style.width = `${this.width}px`
    this.element.style.height = `${this.height}px`
    this.element.style.left = `${this.positionX}px`
    this.element.style.top = `${this.positionY}px`
    this.toggle = Math.floor(Math.random());
    this.gameScreen.appendChild(this.element)
    // Initialize bullet properties
    //this.bullet = document.createElement('img');
   // this.bullet.src = '../images/bullet.png';
   this.bullet = document.createElement('img');
   this.bullet.src = '/images/bullet.png';
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
    const randomDirectionX = Math.random() > 0.5 ? 1 : -1;
    const randomDirectionY = Math.random() > 0.5 ? 1 : -1;

    this.positionX += this.speed * randomDirectionX;
    this.positionY += this.speed * randomDirectionY;

    // Keep enemies within screen bounds
    this.positionX = Math.max(GRASS_WIDTH, Math.min(this.gameScreen.clientWidth - this.width - GRASS_WIDTH, this.positionX));
    this.positionY = Math.max(0, Math.min(this.gameScreen.clientHeight - this.height, this.positionY));


  }

  move() {
    this.updatePosition()
    this.element.style.top = `${this.positionY}px`
    this.element.style.left = `${this.positionX}px`

  }



  /*shoot(playerPositionX, playerPositionY) {
    const playerCenterX = playerPositionX;
    const playerCenterY = playerPositionY;


    this.bullet.style.display = 'block';
 
    const deltaX = playerCenterX - this.positionX;
    const deltaY = playerCenterY - this.positionY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    const directionX = deltaX / distance;
    const directionY = deltaY / distance;

    const bulletInterval = setInterval(() => {
      const bulletPosX = this.bullet.positionX ;
      const bulletPosY = this.bullet.positionY;
  
      const newPosX = bulletPosX + directionX * 5;
      const newPosY = bulletPosY + directionY * 5;
  
      this.bullet.style.left = `${newPosX}px`;
      this.bullet.style.top = `${newPosY}px`;
      this.bullet.positionX = newPosX;
      this.bullet.positionY = newPosY;
      // Check bounds or collision
      if (
        newPosX < 0 ||
        newPosY < 0 ||
        newPosX > this.gameScreen.clientWidth ||
        newPosY > this.gameScreen.clientHeight
       // player.didCollide({ element: this.bullet })
      ) {
        this.bullet.style.display = 'none';
        clearInterval(bulletInterval); // Stop the interval

      }
  
    }, 1000/60);

  }*/
    shootAtPlayer(Player) {
      // if i didnt get the dom values, it was not possible to shoot on time at the player direction
      const playerPosition = Player.getPlayerPosition();
      const playerCenterX = playerPosition.x + Player.width / 2; ;
      const playerCenterY = playerPosition.y + Player.height / 2;;
      
      // Initialize bullet position
      this.bullet.style.left = `${this.positionX + this.width / 2}px`;
      this.bullet.style.top = `${this.positionY + this.height / 2}px`;
      this.bullet.style.display = 'block';
    
      const deltaX =  playerCenterX - this.positionX;
      const deltaY =  playerCenterY - this.positionY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    // finding the direction was difficult
      const directionX = deltaX / distance;
      const directionY = deltaY / distance;
    
      const bulletSpeed = 5; // Adjust as needed
    
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
      }, 16); // Runs approximately 60 times per second
    }
    getEnemyPosition() {
      return {
        x: parseFloat(this.element.style.left), // Get current left position
        y: parseFloat(this.element.style.top)  // Get current top position
      };
    }
    didCollide(Player) {
      const enemyRect = this.element.getBoundingClientRect()
      const playerRect = Player.bullet.getBoundingClientRect()
  
      return (
        enemyRect.left < playerRect.right &&
        enemyRect.right > playerRect.left &&
        enemyRect.top < playerRect.bottom &&
        enemyRect.bottom > playerRect.top
      )
    }
  }
