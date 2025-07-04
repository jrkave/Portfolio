import Knight from "../objects/knight.js";
import Player from "../objects/player.js";
import { MultiMessageDialog } from "../ui/dialogs.js";
import { SingleOptionMenu } from "../ui/menu.js";

export class Entrance extends Phaser.Scene {
    
    constructor() {
        super("Entrance");
    }

    create() {
        this.emitter = new Phaser.Events.EventEmitter();
        this.cursors = this.input.keyboard.createCursorKeys();

        // Create game objects
        this.add.image(0, 0, "entrance_bg").setOrigin(0, 0);
        this.add.sprite(190, 150, "candle").play("flicker");
        this.add.sprite(450, 150, "candle").play("flicker");
        
        this.doorZone = this.add.rectangle(244, 72, 150, 200);
        this.doorZone.setInteractive({useHandCursor: true}).setOrigin(0);

        this.knight = new Knight(this, 190, 224, [
        "Ah! A traveler! It 'as been some time since footsteps echoed in these halls!",
        "The one who built this place, the Architect, no longer dwells 'ere, yet their presence still clings to the stone...",
        "for every chamber an' artifact ye see be a reflection of their long road, their triumphs an' trials alike.",
        "I am their Knight — steward, shield, an' voice. I remain to guide those who wander these forgotten halls.",
        "So tread careful, dwarf, and click the door when ye're ready to begin yer journey."
        ]);
        this.knight.patrol(450, 190, 6000, 3000);

        this.player = new Player(this, 110, 272, this.cursors);
        const platform = this.physics.add.staticBody(0, 320, 640, 38);
        this.physics.add.collider(this.player, platform);

        this.add.image(0, 0, "sunlight_entrance").setOrigin(0, 0);
        this.add.image(4, 4, "knight_dialog").setOrigin(0, 0).setVisible(false);

        this.dialog = new MultiMessageDialog(this, this.knight.getMessages());
        this.menu = new SingleOptionMenu(this, this.emitter, "NEXT");

        this.knight.on("knight_clicked", () => {
            if (!this.dialog.visible) {
                this.dialog.show();
            }
        });
        
        this.doorZone.on("pointerdown", () => this.menu.show());
        this.emitter.on("change_scene", () => this.scene.start("Academics"));
        
        // Fade in
        this.cameras.main.fadeIn(1500, 0, 0, 0);
    }

    update() {
        this.player.update();
        this.knight.update();
    }
}

