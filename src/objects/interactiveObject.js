export default class InteractiveObject extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.scene = scene;
        this.scene.add.existing(this);
        
        this.setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        });
    }

    applyShine() {
        const fx = this.postFX.addShine(0.5, 0.2, 5);
        this.scene.tweens.add({
            targets: fx,
            duration: 9000,
            repeatDelay: 500,
            repeat: -1
        });
        return this;
    }

    setMessage(message) {
        this.message = message;
        return this;
    }

    getMessage() {
        if (this.message) {
            return "This object doesn't have a message.";
        }
    }
}