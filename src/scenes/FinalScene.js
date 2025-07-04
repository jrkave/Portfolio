import Knight from "../objects/knight.js";
import Player from "../objects/player.js";
import { MultiMessageDialog } from "../ui/dialogs.js";
import { SingleOptionMenu } from "../ui/menu.js";
import Popup from "../popups/Popup.js";
import { LecternConfig } from "../popups/final.js";
import InteractiveObject from "../objects/interactiveObject.js";

export class FinalScene extends Phaser.Scene {
    constructor() {
        super("FinalScene");
    }

    create() {
        this.emitter = new Phaser.Events.EventEmitter();

        // Create game objects
        this.add.image(0, 0, "final_bg").setOrigin(0);

        const lectern = new InteractiveObject(this, 500, 315, "lectern").applyShine();

        this.doorZone = this.add.rectangle(278, 140, 88, 190);
        this.doorZone.setInteractive({useHandCursor: true}).setOrigin(0);

        this.knight = new Knight(this, 200, 292, ["Well, dwarf, you've reached the end o' the castle!", "Thanks for comin'!"]).setFlipX(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 450, 298, this.cursors);
        const platform = this.physics.add.staticBody(0, 348, 640, 20);
        this.physics.add.collider(this.player, platform);
        this.add.image(0, 0, "sunlight_regular").setOrigin(0);

        // Create popups
        this.menu = new SingleOptionMenu(this, this.emitter, "PREV");
        this.multiDialog = new MultiMessageDialog(this, this.knight.getMessages());
        const lecternPopup = new Popup(this, LecternConfig);

        // Create event listeners
        this.doorZone.on("pointerdown", () => this.menu.show());
        this.emitter.on("change_scene", () => this.scene.start("Library"));
        lectern.on("pointerdown", () => lecternPopup.show());
        lecternPopup.show();

        this.knight.on("pointerdown", () => this.multiDialog.show());

        // Fade in
        this.cameras.main.fadeIn(1500, 0, 0, 0);
    }

    update() {
        this.player.update();
    }
}