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
    const menu_text = scene.add.bitmapText(230, 70, "ancient", "Menu", 40);
    const text = scene.add.bitmapText(
      240,
      110,
      "dogica",
      "Would you like to move on?",
      8
    );

    // Container setup
    this.container = scene.add.container();
    this.container.add([menu, text, menu_text, yes_button, no_button]);
    this.container.setVisible(true);

    // Emitter setup
    this.emitter = new Phaser.Events.EventEmitter();
    yes_button.on("pointerdown", () => this.emitter.emit("yes_clicked"));
    no_button.on("pointerdown", () => this.emitter.emit("no_clicked"));
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
