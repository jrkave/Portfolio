export default class Dialog {
  constructor(scene) {
    this.scene = scene;

    // Menu image setup
    const menu = scene.add.image(224, 70, "menu").setOrigin(0);
    const yes_button = scene.add
      .image(280, 150, "button")
      .setInteractive({ useHandCursor: true });
    const no_button = scene.add
      .image(360, 150, "button")
      .setInteractive({ useHandCursor: true });

    // Text setup
    const knight_text = scene.add.bitmapText(284, 82, "dogica", "Oi! Ready to see the rest of the castle, are ye?", 8)
      .setMaxWidth(140)
      .setLineSpacing(30);
      
    const yes_text = scene.add.bitmapText(261, 144, "righteous", "AYE", 8)
      .setCharacterTint(0, -1, true, 16777215);
    const no_text = scene.add.bitmapText(342, 144, "righteous", "NAY", 8)
      .setCharacterTint(0, -1, true, 16777215);

    // Container setup
    this.container = scene.add.container();
    this.container.add([menu, knight_text, yes_button, yes_text, no_button, no_text]);
    this.container.setVisible(false);

    // Event handlers and emitter setup
    this.emitter = new Phaser.Events.EventEmitter();
    no_button.on("pointerdown", () => this.hide());
    yes_button.on("pointerdown", () => this.emitter.emit("yes_clicked"));

  }

  show() {
    this.container.setVisible(true);
  }

  hide() {
    this.container.setVisible(false);
  }

  on(event, callback) {
    this.emitter.on(event, callback);
  }
}
