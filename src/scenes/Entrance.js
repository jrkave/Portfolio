import Knight from "../objects/knight.js";
import Player from "../objects/player.js";
import Dialog from "../ui/dialog.js";
import Menu from "../ui/menu.js";

export class Entrance extends Phaser.Scene {
    
    constructor() {
        super("Entrance");
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();

        // Create game objects
        this.add.image(0, 0, "entrance_bg").setOrigin(0, 0);
        this.add.sprite(190, 150, "candle").play("flicker");
        this.add.sprite(450, 150, "candle").play("flicker");
        
        this.doorZone = this.add.rectangle(244, 72, 150, 200);
        this.doorZone.setInteractive({useHandCursor: true}).setOrigin(0);

        this.knight = new Knight(this, 190, 224, [
            "This castle has many mysteries inside, yes indeed...",
            "Well? Are ye goin' to go inside?",
            "If yer havin' trouble gettin' inside, click the door, and I'll let ye in."
        ]);
        this.knight.patrol(450, 190, 6000, 3000);

        this.player = new Player(this, 110, 272, this.cursors);
        const platform = this.physics.add.staticBody(0, 320, 640, 38);
        this.physics.add.collider(this.player, platform);

        this.add.image(0, 0, "sunlight_entrance").setOrigin(0, 0);
        this.add.image(4, 4, "knight_dialog").setOrigin(0, 0).setVisible(false);

        this.dialog = new Dialog(this, this.knight.getMessages());
        this.menu = new Menu(this);

        this.knight.on("knight_clicked", () => {
            if (!this.dialog.visible) {
                this.dialog.show();
            }
        });
        
        this.doorZone.on("pointerdown", () => this.menu.show());
        this.menu.on("yes_clicked", () => {
            this.scene.start("Academics");
        });
        
        // Fade in
        this.cameras.main.fadeIn(1500, 0, 0, 0);
    }

    update() {
        this.player.update();
        this.knight.update();
    }
}

