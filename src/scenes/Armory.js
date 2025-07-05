import Knight from "../objects/knight.js";
import Player from "../objects/player.js";
import { SingleMessageDialog, MultiMessageDialog } from "../ui/dialogs.js";
import { LecternConfig, ChestConfig } from "../popups/armory.js";
import { MultiOptionMenu } from "../ui/menu.js";
import Popup from "../popups/Popup.js";
import InteractiveObject from "../objects/interactiveObject.js";
import PopupManager from "../ui/popupmanager.js";

export class Armory extends Phaser.Scene {
    constructor() {
        super("Armory");
    }

    create() {
        this.emitter = new Phaser.Events.EventEmitter();

        // Create game objects
        this.add.image(0, 0, "armory_bg").setOrigin(0);
        this.add.sprite(174, 176, "candle").play("flicker");
        this.add.sprite(370, 176, "candle").play("flicker");

        const postmanHelm = new InteractiveObject(this, 242, 158, "postman_helm")
            .applyShine()
            .setMessage("Ah, yes, the Postman helm! This helm is well-worn, for it 'as borne many summons across kingdoms...");
        const gitHelm = new InteractiveObject(this, 272, 158, "git_helm")
            .applyShine()
            .setMessage("The Git helm bears some marks, aye, guiding the Architect through branching. It shall surely see more battles, indeed!");
        const seleniumHelm = new InteractiveObject(this, 302, 156, "selenium_helm")
            .applyShine()
            .setMessage("This is the Selenium helmet, fresh from the forge. The Architect is just beginnin' to test its depth of defense!");
        this.add.image(272, 170, "big_shelf");

        const rack = new InteractiveObject(this, 320, 305, "weapons_rack")
            .applyShine()
            .setMessage("Ah, yer interested in the weapons rack! Click any o' the weapons and I'll tell you its tale.");
        const pyWeapon  = new InteractiveObject(this, 279, 290, "python_weapon_1")
            .setMessage("Ah, the Python Double-Blade Axe is sharp and balanced. It's the oldest weapon of the Architect.");
        const sqlWeapon = new InteractiveObject(this, 306, 306, "sql_weapon_2")
            .setMessage("Aye, the SQL Long Hammer shows signs of many strikes. The Architect always finds herself coming back to this one.");
        const javaWeapon = new InteractiveObject(this, 334, 304, "java_weapon_3")
            .setMessage("This Java Sword is well-worn, though less used in years recent...");
        const webWeapon = new InteractiveObject(this, 352, 311, "web_weapon_4")
            .setMessage("“The Architect keeps her Web Sword polished and swift. Indeed, she's shaped this very castle with it!");
        const cppWeapon  = new InteractiveObject(this, 368, 292, "cpp_weapon_5")
            .setMessage("The C++ Mace is heavy and timeworn. Though less used, the Architect still knows its powerful swing.");

        const lectern = new InteractiveObject(this, 556, 315, "lectern").applyShine();
        const chest = new InteractiveObject(this, 186, 321, "chest").applyShine();

        this.doorZone = this.add.rectangle(28, 140, 88, 190);
        this.doorZone.setInteractive({useHandCursor: true}).setOrigin(0);

        this.knight = new Knight(this, 40, 292, 
            ["Behold the Architect's arm'ry, a collection of items forged in the fires of a good many projects!",
            "Take a closer look and discover their secrets, for each has its own tale!"]
            )
            .setFlipX(true);
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 140, 298, this.cursors);
        const platform = this.physics.add.staticBody(0, 348, 640, 20);
        this.physics.add.collider(this.player, platform);
        
        this.add.image(0, 0, "sunlight_regular").setOrigin(0);

        // Set up popups
        this.popupManager = new PopupManager(this);
        this.multiDialog = this.popupManager.register(new MultiMessageDialog(this, this.knight.getMessages()));
        this.singleDialog = this.popupManager.register(new SingleMessageDialog(this));
        this.menu = this.popupManager.register(new MultiOptionMenu(this, this.emitter));
        const lecternPopup = this.popupManager.register(new Popup(this, LecternConfig));
        const chestPopup = this.popupManager.register(new Popup(this, ChestConfig));

        // Set up event listeners 
        lectern.on("pointerdown", () => this.popupManager.showOnly(lecternPopup));
        chest.on("pointerdown", () => this.popupManager.showOnly(chestPopup));
        this.knight.on("knight_clicked", () => this.popupManager.showOnly(this.multiDialog));
        this.doorZone.on("pointerdown", () => this.popupManager.showOnly(this.menu));
        this.emitter.on("go_to_prev", () => this.scene.start("Academics"));
        this.emitter.on("go_to_next", () => this.scene.start("Library"));

        // Add event handler for objects that trigger the knight's dialog
        const dialogInteractables = [postmanHelm, gitHelm, seleniumHelm, rack, pyWeapon, sqlWeapon, javaWeapon, webWeapon, cppWeapon];
        dialogInteractables.forEach((interactable) => {
            interactable.on("pointerdown", () => {
                this.singleDialog.update(interactable.message);
                this.popupManager.showOnly(this.singleDialog);
            });
        })

        // Fade in
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    update() {
        this.player.update();
    }
};