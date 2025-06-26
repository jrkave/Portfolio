export class Library extends Phaser.Scene {
    constructor() {
        super("Library");
    }

    create() {
        this.add.image(0, 0, "library_bg").setOrigin(0);
    }

    update() {

    }
}