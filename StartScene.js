class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    this.load.audio('bobastart', 'bobastart.mp3'); 
    this.load.audio('yoda', 'doordonot.mp3'); 
    this.load.image('background', 'https://res.cloudinary.com/teepublic/image/private/s--BIO45lME--/t_Preview/b_rgb:ffffff,c_lpad,f_jpg,h_630,q_90,w_1200/v1515742101/production/designs/2274226_0.jpg')
  }

  create() {
    let soundSample8 = this.sound.add('yoda').setVolume(2);
    soundSample8.play();
    this.add.image(200,300 , 'background');
    this.add.text(60,40, "Boba's Epic Adventure" , { fill: '#A9A9A9', fontSize: '50px', fontFamily: 'Odibee Sans'});
    this.add.text(90, 510, 'Ready for a Thrilling Experience?\n               Click to start!', { fill: '#A9A9A9', fontSize: ' 30px',  fontFamily: 'Odibee Sans'});
			
    this.input.on('pointerup', () => {
      let soundSample9 = this.sound.add('bobastart');
      soundSample9.play();
      this.scene.stop('StartScene');
      this.scene.start('GameScene');
    });
  }
}

