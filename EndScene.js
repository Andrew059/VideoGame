class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EndScene' })
  }

  preload() {
    this.load.image('bobaend', 'bobaend.png');
    this.load.audio('nooo', 'noooo.mp3'); 
  }


  create() {
    let soundSample7 = this.sound.add('nooo').setVolume(0.4);
    soundSample7.play();
    this.add.image(210, 280,'bobaend').setScale(1.2);
    this.add.text(140, 140, 'Game Over', { fontSize: '50px', fill: '#000000', fontFamily: 'Odibee Sans' });
    this.add.text(32, 180, 'Refresh the Page to Restart', { fontSize: '50px', fill: '#000000', fontFamily: 'Odibee Sans'  });
    gameState.scoreText = this.add.text(60, 490, ' Your Final Score is 0', { fontSize: '50px', fill: '#808080', fontFamily: 'Odibee Sans'});
    gameState.scoreText.setText(`Your Final Score is ${gameState.score}`);

    this.input.on('pointerup', () => {
      gameState.score = 0;
      this.scene.stop('EndScene');
      this.scene.start('StartScene');
    });
  }
}




