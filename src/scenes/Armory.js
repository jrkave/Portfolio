import Knight from "../objects/knight.js";
import Player from "../objects/player.js";
import { SingleMessageDialog, MultiMessageDialog } from "../ui/dialogs.js";
import { LecternConfig } from "../popups/armory.js";
import Menu from "../ui/menu.js";
import Popup from "../popups/Popup.js";
import InteractiveObject from "../objects/interactiveObject.js";

export class Armory extends Phaser.Scene {
    constructor() {
        super("Armory");
    }

    create() {

        // Create game objects
        this.add.image(0, 0, "armory_bg").setOrigin(0);
        this.add.sprite(174, 176, "candle").play("flicker");
        this.add.sprite(370, 176, "candle").play("flicker");

        const postmanHelm = new InteractiveObject(this, 242, 158, "postman_helm")
            .applyShine()
            .setMessage("Ah, yes, the Postman helm!");
        const gitHelm = new InteractiveObject(this, 272, 158, "git_helm")
            .applyShine()
            .setMessage("Ah, yes, the Git helm!");
        const seleniumHelm = new InteractiveObject(this, 302, 156, "selenium_helm")
            .applyShine()
            .setMessage("Ah yes, the Selenium helm!");
        this.add.image(272, 170, "big_shelf");

        const rack = new InteractiveObject(this, 320, 305, "weapons_rack")
            .applyShine()
            .setMessage("Ah, you're interested in the weapons rack! Click any of the weapons and I'll tell ye more.");
        const pyWeapon  = new InteractiveObject(this, 279, 290, "python_weapon_1")
            .setMessage("Python!");
        const sqlWeapon = new InteractiveObject(this, 306, 306, "sql_weapon_2")
            .setMessage("SQL!");
        const javaWeapon = new InteractiveObject(this, 334, 304, "java_weapon_3")
            .setMessage("Java!");
        const webWeapon = new InteractiveObject(this, 352, 311, "web_weapon_4")
            .setMessage("The Web Sword!");
        const cppWeapon  = new InteractiveObject(this, 368, 292, "cpp_weapon_5")
            .setMessage("C++!");

        const lectern = new InteractiveObject(this, 556, 315, "lectern").applyShine();
        const chest = new InteractiveObject(this, 186, 321, "chest").applyShine();

        this.doorZone = this.add.rectangle(28, 140, 88, 190);
        this.doorZone.setInteractive({useHandCursor: true}).setOrigin(0);

        this.knight = new Knight(this, 40, 292, ["Welcome to th' Armory!", "Careful of the weapons!"]).setFlipX(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 140, 298, this.cursors);
        const platform = this.physics.add.staticBody(0, 348, 640, 20);
        this.physics.add.collider(this.player, platform);
        this.add.image(0, 0, "sunlight_regular").setOrigin(0);

        this.multiDialog = new MultiMessageDialog(this, this.knight.getMessages());
        this.singleDialog = new SingleMessageDialog(this);
        this.menu = new Menu(this);

        // Set up popups
        const lecternPopup = new Popup(this, LecternConfig);
        lectern.on("pointerdown", () => lecternPopup.show());

        // Set up event listeners 
        this.knight.on("knight_clicked", () => {
            if (this.singleDialog.visible) {
                this.singleDialog.hide();
            }
                this.multiDialog.show();
        });

        this.doorZone.on("pointerdown", () => this.menu.show());

        this.menu.on("yes_clicked", () => {
            this.scene.start("Library");
        });

        // Add event handler for objects that trigger the knight's dialog
        const dialogInteractables = [postmanHelm, gitHelm, seleniumHelm, rack, pyWeapon, sqlWeapon, javaWeapon, webWeapon, cppWeapon];
        dialogInteractables.forEach((interactable) => {
            interactable.on("pointerdown", () => {
                if (this.multiDialog.visible) {
                    this.multiDialog.hide();
                }

                this.singleDialog.update(interactable.message);
                this.singleDialog.show();
            });
        })

        // Fade in
        this.cameras.main.fadeIn(1500, 0, 0, 0);
    }

    update() {
        this.player.update();
    }
};