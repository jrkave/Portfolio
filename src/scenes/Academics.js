import Knight from "../objects/knight.js";
import Player from "../objects/player.js";
import { MultiMessageDialog } from "../ui/dialogs.js";
import { MultiOptionMenu } from "../ui/menu.js";
import InteractiveObject from "../objects/interactiveObject.js";
import Popup from "../popups/Popup.js";
import { UMConfig, GVConfig, GRConfig } from "../popups/academics.js";

export class Academics extends Phaser.Scene {
    constructor() {
        super("Academics");
    }

    create() {
        // Create game objects
        this.add.image(0, 0, "academics_bg").setOrigin(0, 0);
        this.add.sprite(155, 230, "candle").play("flicker");
        this.add.sprite(319, 230, "candle").play("flicker");
        this.add.sprite(485, 230, "candle").play("flicker");

        const gvPlaque = new InteractiveObject(this, 568, 186, "gv_plaque").applyShine();
        const umPlaque = new InteractiveObject(this, 402, 186, "um_plaque").applyShine();
        const grScroll = new InteractiveObject(this, 236, 194, "grcc_scroll").applyShine();
        this.add.image(238, 200, "shelf");

        this.doorZone = this.add.rectangle(28, 140, 88, 190);
        this.doorZone.setInteractive({useHandCursor: true}).setOrigin(0);
    
        this.knight = new Knight(this, 40, 292, ["This here is the Academics room, where th' Architect keeps a record of 'er educational journey.", "My advice? Look for objects that shimmer. Those are the one's you'll be wantin' to see."]).setFlipX(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 160, 298, this.cursors);
        const platform = this.physics.add.staticBody(0, 348, 640, 20);
        this.physics.add.collider(this.player, platform);
        this.add.image(0, 0, "sunlight_regular").setOrigin(0);

        this.dialog = new MultiMessageDialog(this, this.knight.getMessages());

        this.emitter = new Phaser.Events.EventEmitter();
        this.menu = new MultiOptionMenu(this, this.emitter, "Oh!");

        // Set up popups 
        const umPopup = new Popup(this, UMConfig);
        umPlaque.on("pointerdown", () => umPopup.show());

        const gvPopup = new Popup(this, GVConfig);
        gvPlaque.on("pointerdown", () => gvPopup.show());

        const grccPopup = new Popup(this, GRConfig);
        grScroll.on("pointerdown", () => grccPopup.show());

        // Set up event listeners 
        this.knight.on("knight_clicked", () => {
            if (!this.dialog.visible) {
                this.dialog.show();
            }
        })

        this.doorZone.on("pointerdown", () => this.menu.show());

        // Set up emitter
        this.emitter.on("go_to_prev", () => this.scene.start("Entrance"));
        this.emitter.on("go_to_next", () => this.scene.start("Armory"));
        


        // Fade in
        this.cameras.main.fadeIn(1500, 0, 0, 0);
    }

    update() {
        this.player.update();
    }
}

