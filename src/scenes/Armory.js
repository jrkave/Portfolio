export class Armory extends Phaser.Scene {
    constructor() {
        super("Armory");
    }

    create() {
        this.add.image(0, 0, "armory_bg").setOrigin(0);
    }

    update() {

    }
};