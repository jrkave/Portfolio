export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        this.scene = scene;
        this.cursors = scene.cursors;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setFlipX(true);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.setFlipX(false);
            this.setVelocityX(-80);
            this.anims.play('walk', true);
        }
        else if (this.cursors.right.isDown) {
            this.setFlipX(true);
            this.setVelocity(80);
            this.anims.play('walk', true);
        } else {
            this.setVelocity(0);
            this.anims.stop();
            this.setFrame(4);
        }
    }
}