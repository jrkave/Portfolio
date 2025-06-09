export class PreloadScene extends Phaser.Scene {

    preload() {

        // Create loader bar

        const progress = this.add.graphics();

        this.load.on('progress', value => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, 270, 800 * value, 60);
        });

        this.load.on('complete', () => {
            progress.destroy();
            this.scene.start('EntranceScene');
        });

        // Load assets

        this.load.image('entrance_bg', 'assets/images/entrance/entrance_bg.png');
        this.load.image('sunlight_entrance', 'assets/images/entrance/sunlight_entrance.png');

        this.load.image('academics_bg', 'assets/images/academics/academics_bg.png');
        this.load.image('grcc_scroll', 'assets/images/academics/grcc_scroll.png');
        this.load.image('gv_plaque', 'assets/images/academics/gv_plaque.png');
        this.load.image('um_plaque', 'assets/images/academics/um_plaque.png');

        this.load.image('armory_bg', 'assets/images/armory/armory_bg.png');
        this.load.image('big_shelf', 'assets/images/armory/big_shelf.png');
        this.load.image('chest', 'assets/images/armory/chest.png');
        this.load.image('lectern', 'assets/images/armory/lectern.png');
        this.load.image('weapons_rack', 'assets/images/armory/weapons_rack.png');
        this.load.image('weapon_1', 'assets/images/armory/python_weapon.png');
        this.load.image('weapon_2', 'assets/images/armory/sql_weapon.png');
        this.load.image('weapon_3', 'assets/images/armory/java_sword.png');
        this.load.image('weapon_4', 'assets/images/armory/web_sword.png');
        this.load.image('weapon_5', 'assets/images/armory/cpp_mace.png');
        this.load.image('helmet_1', 'assets/images/armory/helmet_1.png');
        this.load.image('helmet_2', 'assets/images/armory/helmet_2.png');
        this.load.image('helmet_3', 'assets/images/armory/helmet_3.png');

        this.load.image('library_bg', 'assets/images/library/library_bg.png');
        this.load.image('shelf', 'assets/images/library/shelf.png');
        this.load.image('book_1', 'assets/images/library/blue_book.png');
        this.load.image('book_2', 'assets/images/library/green_book.png');
        this.load.image('hr_scroll', 'assets/images/library/hr_scroll.png');

        this.load.image('knight_dialog', 'assets/images/shared/knight_dialog.png');
        this.load.image('sunlight_regular', 'assets/images/shared/sunlight_regular.png');

        this.load.spritesheet('knight', 'assets/spritesheets/knight1.png', {frameWidth: 128, frameHeight: 96});
        this.load.spritesheet('candle', 'assets/spritesheets/candle.png', {frameWidth: 32, frameHeight: 32});
    }

    create() {
       
       // Create animations

        this.anims.create({ 
            key: 'knight_walk',
            frames: this.anims.generateFrameNumbers('knight', { start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'flicker',
            frames: this.anims.generateFrameNumbers('candle', { start: 0, end: 2 }),
            frameRate: 5,
            yoyo: true,
            repeat: -1
        });
    }
}