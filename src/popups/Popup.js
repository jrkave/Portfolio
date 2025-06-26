export default class Popup {
    constructor(scene, config) {
        this.scene = scene;
        this.container = scene.add.container(config.x || 0, config.y || 0);
        this.container.setVisible(false);
        
        // Add background
        const bg = scene.add.image(0, 0, config.backgroundKey).setOrigin(0, 0);
        this.container.add(bg);

        // Add close button
        const close = scene.add.image(config.closeX, config.closeY, config.closeKey || "x_button_transparent")
            .setInteractive({useHandCursor: true});
        close.on("pointerdown", () => this.hide());
        this.container.add(close);

        // Add static assets
        if (config.assets) {
            config.assets.forEach(asset => {
                const image = scene.add.image(asset.x, asset.y, asset.key);
                this.container.add(image);
            });
        }

        // Add text objects
        if (config.texts) {
            config.texts.forEach(text => {
                const textObj = scene.add.bitmapText(text.x, text.y, text.font, text.content, text.fontSize);

                if (text.maxWidth) textObj.setMaxWidth(text.maxWidth);
                if (text.lineSpacing) textObj.setLineSpacing(text.lineSpacing);
                if (text.centerAlign) textObj.setCenterAlign();

                this.container.add(textObj);
            });
        }
    }

    hide() {
        if (this.container.visible) {
            this.container.setVisible(false);
        }
    }

    show() {
        if (!this.container.visible) {
            this.container.setVisible(true);
        }
    }
}