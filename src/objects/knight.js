export default class Knight extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'knight');
        
        this.scene = scene;
        scene.add.existing(this);
        this.setFrame(1).setInteractive({useHandCursor: true});

        this.on('pointerdown', () => this.emit('knight_clicked'));
    }
    
    update() {
        this.on('pointermove', () => {
            this.patrolTween?.pause();
            this.anims.pause();
        });

        this.on('pointerout', () => {
            this.patrolTween?.resume();
            this.anims.resume();
        })
    }

    patrol(travel_to, travel_back, walk_duration, pause_duration) {
        this.patrolTween = this.scene.tweens.chain({
            targets: this,
            tweens: [
                // forward walk
                {
                    x: travel_to,
                    duration: walk_duration,
                    onStart: () => {
                        this.play('patrol');
                        this.setFlipX(true);
                    },
                    onComplete: () => {
                        this.anims.stop();
                        this.setFrame(1);
                    }
                },
                // pause
                {   
                    x: travel_to,
                    duration: pause_duration,
                    onComplete: () => this.play('patrol'),
                },
                // back walk
                {
                    x: travel_back,
                    duration: walk_duration,
                    onStart: () => {
                        this.setFlipX(false);
                    }
                },
                // pause
                {
                    x: travel_back,
                    duration: pause_duration,
                    onStart: () => {
                        this.anims.stop();
                        this.setFrame(1);
                    }
                }
            ],
            repeat: -1,
            onPause: () => {
                this.setFrame(1);
            }
        })
    }
}