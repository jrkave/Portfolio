class MenuBase extends Phaser.GameObjects.Container {
  constructor(scene, emitter) {
    super(scene, 0, 0);

    this.scene = scene;
    this.scene.add.existing(this);
    this.emitter = emitter;
    this.setVisible(false);

    this.close_button = scene.add.image(445, 118, "x_button").setInteractive({useHandCursor: true});
    this.close_button.on("pointerdown", () => this.hide());

    this.text = scene.add.bitmapText(230, 134, "righteous", "Continue?", 16)
      .setMaxWidth(200)
      .setLineSpacing(140)
      .setCenterAlign();

    this.add([this.close_button, this.text]);
  }

  show() {
    this.setVisible(true);
  }

  hide() {
    this.setVisible(false);
  }
}

export class SingleOptionMenu extends MenuBase {
  constructor(scene, emitter, btn_text) {
    super(scene, emitter);

    // Create game objects
    const menu = scene.add.image(320, 180, "menu_one_option");
    const button = scene.add.image(320, 206, "menu_button").setInteractive({useHandCursor: true});
    const button_text = scene.add.bitmapText(295, 200, "righteous", btn_text, 8).setCharacterTint(0, -1, true, 16777215);
    this.add([menu, button, button_text]);

    // Bring objects to front
    this.bringToTop(this.close_button);
    this.bringToTop(this.text);

    // Emit event
    button.on("pointerdown", () => this.emitter.emit("change_scene"));
  }
}

export class MultiOptionMenu extends MenuBase {
  constructor(scene, emitter) {
    super(scene, emitter);

    // Create game objects
    const menu = scene.add.image(320, 180, "menu_two_option");
    const prev_button = scene.add.image(253, 206, "menu_button").setInteractive({useHandCursor: true});
    const next_button = scene.add.image(386, 206, "menu_button").setInteractive({useHandCursor: true});
    const prev_text = scene.add.bitmapText(227, 199, "righteous", "BACK", 8).setCharacterTint(0, -1, true, 16777215);
    const next_text = scene.add.bitmapText(363, 199, "righteous", "NEXT", 8).setCharacterTint(0, -1, true, 16777215);
    this.add([menu, prev_button, next_button, prev_text, next_text]);

    // Bring objects to front
    this.bringToTop(this.close_button);
    this.bringToTop(this.text);

    // Emit events
    prev_button.on("pointerdown", () => this.emitter.emit("go_to_prev"));
    next_button.on("pointerdown", () => this.emitter.emit("go_to_next"))
  }
}
