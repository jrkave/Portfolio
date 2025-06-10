import Knight from '../objects/knight.js';
import Player from '../objects/player.js';
import Dialog from '../ui/dialog.js';
import Menu from '../ui/menu.js';

export class EntranceScene extends Phaser.Scene {
    
    constructor() {
        super('EntranceScene');
    }

    create() {
        
        this.cursors = this.input.keyboard.createCursorKeys();

        // Create game objects
        this.add.image(0, 0, 'entrance_bg').setOrigin(0, 0);
        this.add.sprite(190, 150, 'candle').play('flicker');
        this.add.sprite(450, 150, 'candle').play('flicker');
        
        const doorZone = this.add.rectangle(244, 72, 150, 200);
        doorZone.setInteractive({useHandCursor: true}).setOrigin(0);
        doorZone.on('pointerdown', () => console.log('clicked'));

        this.knight = new Knight(this, 190, 224);
        this.knight.patrol(450, 190, 6000, 3000);

        this.player = new Player(this, 110, 272, this.cursors);
        const platform = this.physics.add.staticBody(0, 320, 640, 38);
        this.physics.add.collider(this.player, platform);

        this.add.image(0, 0, 'sunlight_entrance').setOrigin(0, 0);
        this.add.image(4, 4, 'knight_dialog').setOrigin(0, 0).setVisible(false);

        const messages = [
            'This castle has many mysteries inside, yes indeed...',
            'Well? Are you going to go inside?',
            'Just click the door to begin.'
        ];

        this.dialog = new Dialog(this, messages);
        this.menu = new Menu(this);

        // Set up event listeners
        this.dialog.on('dialog_closed', () => {
            this.dialog.hide();
        });
        this.knight.on('knight_clicked', () => {
            if (!this.dialog.visible) {
                this.dialog.show();
            }
        });
        
        // Fade in
        this.cameras.main.fadeIn(1500, 0, 0, 0);
    }

    update() {
        this.player.update();
        this.knight.update();
    }
}

