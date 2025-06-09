import Knight from '../objects/knight.js';

export class EntranceScene extends Phaser.Scene {
    
    constructor() {
        super('EntranceScene');
    }

    init() {
        // Initialize scene
    }

    create() {
        
        // Create game objects

        this.add.image(0, 0, 'entrance_bg').setOrigin(0, 0);
        this.add.sprite(190, 150, 'candle').play('flicker');
        this.add.sprite(450, 150, 'candle').play('flicker');
        this.add.image(0, 0, 'sunlight_entrance').setOrigin(0, 0);
        this.add.image(4, 4, 'knight_dialog').setOrigin(0, 0).setVisible(true);
        
        const knight = new Knight(this, 194, 224);

        // Create tweens 

        const tween = this.tweens.chain({
            targets: knight,
            tweens: [
                {
                    x: 452,
                    duration: 4000,
                    onStart: () => knight.anims.play('knight_walk'),
                },
                {
                    x: 452,
                    duration: 3000,
                    onStart: () => {
                        knight.anims.stop();
                        knight.setFrame(5);
                    },
                    onComplete: () => {
                        knight.anims.play('knight_walk');
                        knight.flipX = false;
                    }
                },
                {
                    x: 188,
                    duration: 4000,
                },
                {
                    x: 188,
                    duration: 3000,
                    onStart: () => {
                        knight.anims.stop();
                        knight.setFrame(5);
                    },
                    onComplete: () => {
                        knight.flipX = true
                        knight.anims.play('knight_walk')
                    }
                }
            ],
            repeat: -1
        });

        knight.on('pointerdown', () => {
            if (tween.isPlaying()) {
                tween.pause();
                knight.anims.stop();
                knight.setFrame(5);
            } else {
                tween.resume();
                knight.anims.play('knight_walk');
            }
        })

    }
}

