export default class Knight extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'knight');
        scene.add.existing(this);

        this.setFlipX(true)
        this.setFrame(1).setInteractive();
    }
}