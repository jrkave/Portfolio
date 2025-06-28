import Knight from "../objects/knight.js";
import Player from "../objects/player.js";
import { SingleMessageDialog, MultiMessageDialog } from "../ui/dialogs.js";
import Menu from "../ui/menu.js";
import Popup from "../popups/Popup.js";
import { PhysieConfig, RickipediaConfig, HouseRulesConfig } from "../popups/library.js";
import InteractiveObject from "../objects/interactiveObject.js";

export class Library extends Phaser.Scene {
    constructor() {
        super("Library");
    }

    create() {

        // Create game objects
        this.add.image(0, 0, "library_bg").setOrigin(0);
        const blueBook = new InteractiveObject(this, 120, 83, "blue_book").applyShine();
        const greenBook = new InteractiveObject(this, 170, 83, "green_book").applyShine();
        const scroll = new InteractiveObject(this, 450, 291, "hr_scroll").applyShine();        
        this.add.image(142, 95, "book_shelf");

        this.doorZone = this.add.rectangle(278, 140, 88, 190);
        this.doorZone.setInteractive({useHandCursor: true}).setOrigin(0);

        this.knight = new Knight(this, 260, 292, ["Welcome to th' Library!", "Shhh!"]).setFlipX(true);
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 140, 308, this.cursors);
        const platform = this.physics.add.staticBody(0, 356, 640, 20);
        this.physics.add.collider(this.player, platform);
        this.add.image(0, 0, "sunlight_regular").setOrigin(0);

        this.multiDialog = new MultiMessageDialog(this, this.knight.getMessages());
        this.singleDialog = new SingleMessageDialog(this);

        // Set up popups
        const blueBookPopup = new Popup(this, PhysieConfig);
        blueBook.on("pointerdown", () => blueBookPopup.show());

        const greenBookPopup = new Popup(this, RickipediaConfig);
        greenBook.on("pointerdown", () => greenBookPopup.show());

        const scrollPopup = new Popup(this, HouseRulesConfig);
        scroll.on("pointerdown", () => scrollPopup.show());

        // Set up event listeners
        this.knight.on("knight_clicked", () => {
            if (!this.multiDialog.visible) {
                this.multiDialog.show();
            }
        })

        // Fade in
        this.cameras.main.fadeIn(1500, 0, 0, 0);

    }

    update() {
        this.player.update();
    }
}