export default class Dialog {
    constructor(scene, messages=[]) {
        this.scene = scene;

        // Background and button setup
        const background = scene.add.image(10, 10, "knight_dialog").setOrigin(0);
        const close_button = scene.add.image(285, 21, "x_button").setInteractive({useHandCursor: true});

        // Text setup
        this.messages = messages;
        this.messageNum = 0;
        this.text = scene.add.bitmapText(100, 26, "dogica", messages[this.messageNum], 8)
            .setMaxWidth(180)
            .setLineSpacing(40)
            .setCharacterTint(0, -1, true, 16777215);

        // Container setup
        this.container = scene.add.container();
        this.container.add([background, this.text, close_button]);
        this.container.setVisible(false);

        close_button.on("pointerdown", () => this.hide());
    }

    show() {
        this.container.setVisible(true);
    }

    hide() {
        this.container.setVisible(false);
        this.next();
    }

    next() {
        if (this.messageNum < this.messages.length - 1) {
            this.messageNum += 1;
            this.text.setText(this.messages[this.messageNum])
            .setCharacterTint(0, -1, true, 16777215);
        }
    }
}