class MenuBase extends Phaser.GameObjects.Container {
  constructor(scene, emitter, knight_dialog) {
    super(scene, 0, 0);

    this.scene = scene;
    this.scene.add.existing(this);
    this.emitter = emitter;
    this.setVisible(false);

    this.close_button = scene.add.image(461, 86, "x_button_transparent").setInteractive({useHandCursor: true});
    this.close_button.on("pointerdown", () => this.hide());

    this.text = scene.add.bitmapText(284, 102, "dogica", knight_dialog, 8)
      .setMaxWidth(160)
      .setLineSpacing(30);
    
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
  constructor(scene, emitter, btn_text, knight_dialog="Hello there!") {
    super(scene, emitter, knight_dialog);

    // Create game objects
    const menu = scene.add.image(320, 180, "menu_one_option");
    const button = scene.add.image(320, 236, "menu_button").setInteractive({useHandCursor: true});
    const button_text = scene.add.bitmapText(288, 230, "righteous", btn_text, 10).setCharacterTint(0, -1, true, 16777215);
    this.add([menu, button, button_text]);

    // Bring objects to front
    this.bringToTop(this.close_button);
    this.bringToTop(this.text);

    // Emit event
    button.on("pointerdown", () => this.emitter.emit("change_scene"));
  }
}

export class MultiOptionMenu extends MenuBase {
  constructor(scene, emitter, knight_dialog="Hello there!") {
    super(scene, emitter, knight_dialog);

    // Create game objects
    const menu = scene.add.image(320, 180, "menu_two_option");
    const prev_button = scene.add.image(250, 236, "menu_button").setInteractive({useHandCursor: true});
    const next_button = scene.add.image(391, 236, "menu_button").setInteractive({useHandCursor: true});
    const prev_text = scene.add.bitmapText(224, 230, "righteous", "PREV", 8).setCharacterTint(0, -1, true, 16777215);
    const next_text = scene.add.bitmapText(366, 230, "righteous", "NEXT", 8).setCharacterTint(0, -1, true, 16777215);
    this.add([menu, prev_button, next_button, prev_text, next_text]);

    // Bring objects to front
    this.bringToTop(this.close_button);
    this.bringToTop(this.text);

    // Emit events
    prev_button.on("pointerdown", () => this.emitter.emit("go_to_prev"));
    next_button.on("pointerdown", () => this.emitter.emit("go_to_next"))
  }
}
