import Knight from "../objects/knight.js";
import Player from "../objects/player.js";
import Dialog from "../ui/dialog.js";
import Menu from "../ui/menu.js";
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

        const gv_plaque = new InteractiveObject(this, 568, 186, "gv_plaque").applyShine();
        const um_plaque = new InteractiveObject(this, 402, 186, "um_plaque").applyShine();
        const gr_scroll = new InteractiveObject(this, 236, 194, "grcc_scroll").applyShine();
        this.add.image(238, 200, "shelf");
    
        this.knight = new Knight(this, 40, 292, ["Welcome to th' Academics Room! Go ahead, look around!", "You can touch anythin' that's shinin' about. Otherwise, keep yer hands off!"]).setFlipX(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 160, 298, this.cursors);
        const platform = this.physics.add.staticBody(0, 348, 640, 20);
        this.physics.add.collider(this.player, platform);

        this.dialog = new Dialog(this, this.knight.getMessages());
        this.menu = new Menu(this);

        // Set up popups 
        const um_popup = new Popup(this, UMConfig);
        um_plaque.on("pointerdown", () => um_popup.show());

        const gv_popup = new Popup(this, GVConfig);
        gv_plaque.on("pointerdown", () => gv_popup.show());

        const grcc_popup = new Popup(this, GRConfig);
        gr_scroll.on("pointerdown", () => grcc_popup.show());

        // Set up event listeners 
        this.knight.on("knight_clicked", () => {
            if (!this.dialog.visible) {
                this.dialog.show();
            }
        })

        // Fade in
        this.cameras.main.fadeIn(1500, 0, 0, 0);
    }

    update() {
        this.player.update();
    }
}

