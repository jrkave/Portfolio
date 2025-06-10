export default class Dialog {
    constructor(scene, messages=['Hello!']) {
        if (messages.length < 1) {
            throw new Error('Must have at least one message.');
        }

        this.scene = scene;

        // Background and button setup
        const background = scene.add.image(10, 10, 'knight_dialog').setOrigin(0);
        const close_button = scene.add.image(285, 21, 'x_button').setInteractive({useHandCursor: true});

        // Text setup
        this.messages = messages;
        this.messageNum = 0;
        this.text = scene.add.bitmapText(100, 26, 'dogica', messages[this.messageNum], 8);
        this.text.setMaxWidth(180).setLineSpacing(40).setCharacterTint(0, -1, true, 16777215);

        // Container setup
        this.container = scene.add.container();
        this.container.add([background, this.text, close_button]);
        this.container.setVisible(false);
        
        // Emitter setup 
        this.emitter = new Phaser.Events.EventEmitter();
        close_button.on('pointerdown', () => this.emitter.emit('dialog_closed'));
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
            this.text.setText(this.messages[this.messageNum]);
        }
    }

    on(event, callback) {
        this.emitter.on(event, callback);
    }
}