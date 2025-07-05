import Knight from "../objects/knight.js";
import Player from "../objects/player.js";
import { MultiMessageDialog } from "../ui/dialogs.js";
import { SingleOptionMenu } from "../ui/menu.js";
import Popup from "../popups/Popup.js";
import { LecternConfig } from "../popups/final.js";
import InteractiveObject from "../objects/interactiveObject.js";
import PopupManager from "../ui/popupmanager.js";

export class FinalScene extends Phaser.Scene {
    constructor() {
        super("FinalScene");
    }

    create() {
        this.emitter = new Phaser.Events.EventEmitter();

        // Create game objects
        this.add.image(0, 0, "final_bg").setOrigin(0);
        this.add.sprite(180, 200, "candle").play("flicker");
        this.add.sprite(450, 200, "candle").play("flicker");

        const lectern = new InteractiveObject(this, 500, 300, "lectern").applyShine();

        this.doorZone = this.add.rectangle(241, 110, 150, 210);
        this.doorZone.setInteractive({useHandCursor: true}).setOrigin(0);

        this.knight = new Knight(this, 190, 272, ["Well, dwarf, you've reached the end o' the castle!", "Thanks for comin'!"]).setFlipX(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 450, 272, this.cursors);
        const platform = this.physics.add.staticBody(0, 320, 640, 38);
        this.physics.add.collider(this.player, platform);
        this.add.image(0, 0, "sunlight_entrance").setOrigin(0);

        this.add.bitmapText(215, 40, "righteous", "Thanks for visiting!", 8).setCharacterTint(0, -1, true, 12224061);

        // Create popups
        this.popupManager = new PopupManager(this);
        this.menu = this.popupManager.register(new SingleOptionMenu(this, this.emitter, "BACK"));
        this.multiDialog = this.popupManager.register(new MultiMessageDialog(this, this.knight.getMessages()));
        const lecternPopup = this.popupManager.register(new Popup(this, LecternConfig));

        // Create event listeners
        this.doorZone.on("pointerdown", () => this.popupManager.showOnly(this.menu));
        this.emitter.on("change_scene", () => this.scene.start("Library"));
        lectern.on("pointerdown", () => this.popupManager.showOnly(lecternPopup));
        this.knight.on("pointerdown", () => this.popupManager.showOnly(this.multiDialog));

        // Fade in
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    update() {
        this.player.update();
    }
}