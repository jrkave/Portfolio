class DialogBase extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);

    this.scene = scene;
    this.scene.add.existing(this);
    this.setVisible(false);

    // Background and close button
    const background = scene.add.image(10, 10, "knight_dialog").setOrigin(0);
    const closeButton = scene.add.image(285, 21, "x_button").setInteractive({useHandCursor:true});
    this.text = scene.add.bitmapText(100, 26, "dogica", "init", 8)
      .setMaxWidth(180)
      .setLineSpacing(40)
      .setCharacterTint(0, -1, true, 0xffffff);

    this.add([background, this.text, closeButton]);

    closeButton.on("pointerdown", () => this.hide());
  }

  show() {
    this.setVisible(true);
  }

  hide() {
    this.setVisible(false);
  }
}

export class SingleMessageDialog extends DialogBase {
  constructor(scene) {
    super(scene);
  }

  update(newMessage) {
    this.text.setText(newMessage)
      .setMaxWidth(180)
      .setLineSpacing(40)
      .setCharacterTint(0, -1, true, 0xffffff);;
  }
}

export class MultiMessageDialog extends DialogBase {
  constructor(scene, messages = []) {
    super(scene);

    this.messages = messages;
    this.messageIndex = 0;

    if (messages.length) {
      this.text.setText(messages[0])
        .setMaxWidth(180)
        .setLineSpacing(40)
        .setCharacterTint(0, -1, true, 0xffffff);
    } else {
      this.text.setText("No messages")
        .setMaxWidth(180)
        .setLineSpacing(40)
        .setCharacterTint(0, -1, true, 0xffffff);
    }
  }

  next() {
    if (this.messageIndex < this.messages.length - 1) {
      this.messageIndex++;
      this.text.setText(this.messages[this.messageIndex])
        .setMaxWidth(180)
        .setLineSpacing(40)
        .setCharacterTint(0, -1, true, 0xffffff);
    }
  }

  hide() {
    super.hide();
    this.next();
  }
}
