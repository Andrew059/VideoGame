class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }
  
  preload() {
    this.load.audio('score', 'score1.mp3'); 
    this.load.audio('laser', 'laser.mp3'); 
    this.load.audio('death', 'death.mp3'); 
    this.load.image('boba', 'copy_321958841.png');
    this.load.image('stormtrooper', 'stormtrooper.png');
    this.load.image('scouttrooper', 'scouttrooper.png');
    this.load.image('bottomPlatforms', 'terrain.png');
    this.load.image('floatingPlatforms', 'terrain2.png');
    this.load.image('fireball', 'fireball.png');
    this.load.image('laser', 'laser.png');
    this.load.image('deathstar', 'deathstar.png');
  }
 
  create() {
    this.add.image(200,300 , 'deathstar').setScale(1.6);
	  
    gameState.player = this.physics.add.sprite(80, 500, 'boba').setScale(.5);
	  
    const bottomPlatforms = this.physics.add.staticGroup();
	  
    bottomPlatforms.create(420, 590, 'bottomPlatforms').setScale(2, .6).refreshBody();
    bottomPlatforms.create(380, 590, 'bottomPlatforms').setScale(2, .6).refreshBody();
    bottomPlatforms.create(360, 590, 'bottomPlatforms').setScale(2, .6).refreshBody();
    bottomPlatforms.create( 300, 590, 'bottomPlatforms').setScale(2, .6).refreshBody();
    bottomPlatforms.create(260, 590, 'bottomPlatforms').setScale(2, .6).refreshBody();
    bottomPlatforms.create(240, 590, 'bottomPlatforms').setScale(2, .6).refreshBody();
    bottomPlatforms.create(180, 590, 'bottomPlatforms').setScale(2, .6).refreshBody();
    bottomPlatforms.create(140, 590, 'bottomPlatforms').setScale(2, .6).refreshBody();
    bottomPlatforms.create(120, 590, 'bottomPlatforms').setScale(2, .6).refreshBody();
    bottomPlatforms.create(60, 590, 'bottomPlatforms').setScale(2, .6).refreshBody();
    bottomPlatforms.create(20, 590, 'bottomPlatforms').setScale(2, .6).refreshBody();

    const fireball = this.physics.add.staticGroup();

    fireball.create(10, 10, 'fireball').setScale(0.1, .1).refreshBody();
    fireball.create(10, 40, 'fireball').setScale(0.1, .1).refreshBody();
    fireball.create(10, 70, 'fireball').setScale(0.1, .1).refreshBody();
    fireball.create(10, 100, 'fireball').setScale(0.1, .1).refreshBody();
    fireball.create(10, 130, 'fireball').setScale(0.1, .1).refreshBody();
    fireball.create(10, 160, 'fireball').setScale(0.1, .1).refreshBody();
    fireball.create(10, 190, 'fireball').setScale(0.1, .1).refreshBody();
    fireball.create(10, 220, 'fireball').setScale(0.1, .1).refreshBody();
    fireball.create(10, 250, 'fireball').setScale(0.1, .1).refreshBody();
    fireball.create(10, 280, 'fireball').setScale(0.1, .1).refreshBody();
    fireball.create(10, 310, 'fireball').setScale(0.1, .1).refreshBody();
    fireball.create(10, 340, 'fireball').setScale(0.1, .1).refreshBody();
    fireball.create(10, 370, 'fireball').setScale(0.1, .1).refreshBody();
    fireball.create(10, 400, 'fireball').setScale(0.1, .1).refreshBody();
    fireball.create(10, 430, 'fireball').setScale(0.1, .1).refreshBody();
    fireball.create(10, 460, 'fireball').setScale(0.1, .1).refreshBody();
    fireball.create(10, 490, 'fireball').setScale(0.1, .1).refreshBody();
    fireball.create(10, 520, 'fireball').setScale(0.1, .1).refreshBody();
    fireball.create(10, 550, 'fireball').setScale(0.1, .1).refreshBody();
	  
    this.physics.add.collider(gameState.player, fireball, () => {
        setFloatingPlatformsLoop.destroy();
        this.scene.stop('GameScene');
        this.scene.start('EndScene');
        let soundSample1 = this.sound.add('death');
        soundSample1.play();
    });
   
    gameState.player.setCollideWorldBounds(true);

    this.physics.add.collider(gameState.player, bottomPlatforms);

    gameState.cursors = this.input.keyboard.createCursorKeys();

    gameState.enemy = this.physics.add.sprite(400, 510, 'stormtrooper').setScale(.8);

    gameState.enemy.setCollideWorldBounds(true);
	  
    this.physics.add.collider(gameState.enemy, bottomPlatforms);

    gameState.enemy.move = this.tweens.add({
      targets: gameState.enemy,
      x: 60,
      ease: 'Linear',
      duration: 5000,
      repeat: -1,
      yoyo: true
    });
	  
    function setShoot() {
      const laser = this.physics.add.sprite(gameState.enemy.x - 40, gameState.enemy.y, 'laser').setScale(.5);
      laser.body.allowGravity = false;
      laser.body.immovable = true;
      const destx = gameState.player.x;
      const desty = gameState.player.y;
      const speed = 100;
      const startx = gameState.enemy.x;
      const starty = gameState.enemy.y;

      const dx = destx - startx;
      const dy = desty - starty;
      const totalDistance = Math.ceil(Math.sqrt(dx * dx + dy + dy));
      const percent = Math.ceil(speed / totalDistance);
      laser.body.velocity.x = percent * dx;
      laser.body.velocity.y = percent * dy;
    
      this.physics.add.collider(gameState.player, laser, () => {
        setShootLoop.destroy();
	this.scene.stop('GameScene');
	this.scene.start('EndScene');
        let soundSample2 = this.sound.add('death');
        soundSample2.play();
      });
	    
      let soundSample3 = this.sound.add('laser');
      soundSample3.play();
    }
	  
    const setShootLoop = this.time.addEvent({
      delay: 2000,
      callback: setShoot,
      callbackScope: this,
      loop: true,
    });
	  
    gameState.scoreText = this.add.text(200, 10, 'Score: 0', { fontSize: '15px', fill: '#808080' });

    function setFloatingPlatforms () {
      const yCoord = Math.random() * 580 - 130;
      const floatingPlatforms = this.physics.add.sprite(500, yCoord, 'floatingPlatforms');
      floatingPlatforms.body.allowGravity = false;
      floatingPlatforms.body.immovable = true;
      floatingPlatforms.body.velocity.x = -100;
	    
      this.physics.add.collider(gameState.player, floatingPlatforms, () => {
        setFloatingPlatformsLoop.destroy();
        this.scene.stop('GameScene');
        this.scene.start('EndScene');
        let soundSample4 = this.sound.add('death');
        soundSample4.play();
      });
	    
      this.physics.add.collider(fireball, floatingPlatforms, () => {
        floatingPlatforms.destroy();
        gameState.score += 10;
        gameState.scoreText.setText(`Score: ${gameState.score}`);
	let soundSample5 = this.sound.add('score').setVolume(0.5);
        soundSample5.play();
      });
    }
 
    const setFloatingPlatformsLoop = this.time.addEvent({
      delay: 1400,
      callback: setFloatingPlatforms,
      callbackScope: this,
      loop: true,
    });
	  
    this.physics.add.collider(gameState.player, gameState.enemy, () => {
      setFloatingPlatformsLoop.destroy();
      this.scene.stop('GameScene');
      this.scene.start('EndScene');
      let soundSample6 = this.sound.add('death');
      soundSample6.play();
    });
  }

  update() {
    if (gameState.cursors.left.isDown) {
      gameState.player.setVelocityX(-300);
    } else if (gameState.cursors.right.isDown) {
      gameState.player.setVelocityX(300);
    } else if (gameState.cursors.up.isDown) {
      gameState.player.setVelocityY(-200);
    } else if  (gameState.cursors.down.isDown) {
      gameState.player.setVelocityY(200);
    } else {
      gameState.player.setVelocityX(0);
    }
  } 
}
