import Knight from '../objects/knight.js';
import Player from '../objects/player.js';
import Dialog from '../ui/dialog.js';
import Menu from '../ui/menu.js';

export class AcademicsScene extends Phaser.Scene {
    constructor() {
        super('AcademicsScene');
    }

    create() {
        
        this.cursors = this.input.keyboard.createCursorKeys();

        // Create game objects
        this.add.image(0, 0, 'academics_bg').setOrigin(0, 0);
        this.add.sprite(155, 230, 'candle').play('flicker');
        this.add.sprite(319, 230, 'candle').play('flicker');
        this.add.sprite(485, 230, 'candle').play('flicker');    

        // Fade in
        this.cameras.main.fadeIn(1500, 0, 0, 0);
    }

    update() {

    }
}

