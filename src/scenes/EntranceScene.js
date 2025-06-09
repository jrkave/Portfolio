import Knight from '../objects/knight.js';
import Player from '../objects/player.js';

export class EntranceScene extends Phaser.Scene {
    
    constructor() {
        super('EntranceScene');
    }

    init() {
        // Initialize scene
    }

    create() {
        
        this.cursors = this.input.keyboard.createCursorKeys();

        // Create game objects

        this.add.image(0, 0, 'entrance_bg').setOrigin(0, 0);
        this.add.sprite(190, 150, 'candle').play('flicker');
        this.add.sprite(450, 150, 'candle').play('flicker');
        
        this.knight = new Knight(this, 190, 224);
        this.knight.patrol(450, 190, 6000, 3000);

        this.player = new Player(this, 110, 272, this.cursors);
        const platform = this.physics.add.staticBody(0, 320, 640, 38);
        this.physics.add.collider(this.player, platform);

        this.add.image(0, 0, 'sunlight_entrance').setOrigin(0, 0);
        // this.add.image(4, 4, 'knight_dialog').setOrigin(0, 0);
        // this.add.image(4, 4, 'player_dialog').setOrigin(0, 0);
        
        // Fade in
        this.cameras.main.fadeIn(1500, 0, 0, 0)
    }

    update() {
        this.player.update();
        this.knight.update();
    }
}

