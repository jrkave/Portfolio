export class Boot extends Phaser.Scene {
  preload() {

    // Create loader bar
    const progress = this.add.graphics();

    this.load.on("progress", (value) => {
      progress.clear();
      progress.fillStyle(0xffffff, 1);
      progress.fillRect(0, 270, 800 * value, 60);
    });

    this.load.on("complete", () => {
      progress.destroy();
      this.scene.start("Entrance");
    });

    // Load assets
    this.load.image("entrance_bg", "assets/images/entrance/entrance_bg.png");
    this.load.image(
      "sunlight_entrance",
      "assets/images/entrance/sunlight_entrance.png"
    );

    this.load.image("academics_bg", "assets/images/academics/academics_v1.png");
    this.load.image("grcc_scroll", "assets/images/academics/grcc_scroll.png");
    this.load.image("gv_plaque", "assets/images/academics/gv_plaque.png");
    this.load.image("um_plaque", "assets/images/academics/um_plaque.png");
    this.load.image("shelf", "assets/images/academics/shelf_v1.png");
    this.load.image("gvsu_logo", "assets/images/academics/gvsu.png");
    this.load.image("umich_logo", "assets/images/academics/umich.png");
    this.load.image("grcc_logo", "assets/images/academics/grcc.png");

    this.load.image("armory_bg", "assets/images/armory/armory_v3.png");
    this.load.image("big_shelf", "assets/images/armory/big_shelf_v1.png");
    this.load.image("chest", "assets/images/armory/chest_v1.png");
    this.load.image("lectern", "assets/images/armory/lectern_v1.png");
    this.load.image("weapons_rack", "assets/images/armory/weapons_rack_v2.png");
    this.load.image("python_weapon_1", "assets/images/armory/python_weapon_v1.png");
    this.load.image("sql_weapon_2", "assets/images/armory/sql_weapon_v1.png");
    this.load.image("java_weapon_3", "assets/images/armory/java_sword_v2.png");
    this.load.image("web_weapon_4", "assets/images/armory/web_sword_v1.png");
    this.load.image("cpp_weapon_5", "assets/images/armory/cpp_mace_v1.png");
    this.load.image("postman_helm", "assets/images/armory/postman_helmet.png");
    this.load.image("git_helm", "assets/images/armory/git_helmet.png");
    this.load.image("selenium_helm", "assets/images/armory/selenium_helmet.png");
    this.load.image("react", "assets/images/armory/react_shield.png");
    this.load.image("jest", "assets/images/armory/jest_shield.png");
    this.load.image("django", "assets/images/armory/django_shield.png");
    this.load.image("vue", "assets/images/armory/vue_shield.png");
    this.load.image("langchain", "assets/images/armory/langchain_shield.png");
    this.load.image("tailwind", "assets/images/armory/tailwind_shield.png");

    this.load.image("library_bg", "assets/images/library/library_v1.png");
    this.load.image("blue_book", "assets/images/library/blue_book_v1.png");
    this.load.image("green_book", "assets/images/library/green_book_v1.png");
    this.load.image("hr_scroll", "assets/images/library/hr_scroll.png");
    this.load.image("blue_book_popup", "assets/images/library/blue_book_popup.png");
    this.load.image("green_book_popup", "assets/images/library/green_book_popup.png");
    this.load.image("book_shelf", "assets/images/library/library_shelf.png");
    this.load.image("physie_tag", "assets/images/library/physie_tag.png");
    this.load.image("rickipedia_tag", "assets/images/library/rickipedia_tag.png");
    this.load.image("house_rules_logo", "assets/images/library/house_rules.png");

    this.load.image("knight_dialog", "assets/images/shared/knight_dialog.png");
    this.load.image("next_button", "assets/images/shared/next_button.png");
    this.load.image("player_dialog", "assets/images/shared/player_dialog.png");
    this.load.image("x_button", "assets/images/shared/x_button.png");
    this.load.image("x_button_transparent", "assets/images/shared/x_button_transparent.png");
    this.load.image("menu_button", "assets/images/shared/menu_btn.png");
    this.load.image("menu_one_option", "assets/images/shared/menu_no_portrait_one_option_v1.png");
    this.load.image("menu_two_option", "assets/images/shared/menu_no_portrait_v1.png");
    this.load.image("scroll_popup", "assets/images/shared/scroll_popup.png");
    this.load.image("plaque_popup", "assets/images/shared/plaque_popup_long.png");
    this.load.image("book_popup", "assets/images/shared/book_popup.png");
    this.load.image(
      "sunlight_regular",
      "assets/images/shared/sunlight_regular.png"
    );

    this.load.spritesheet("knight", "assets/spritesheets/knight.png", {
      frameWidth: 128,
      frameHeight: 96,
    });
    this.load.spritesheet("candle", "assets/spritesheets/candle.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("player", "assets/spritesheets/player.png", {
      frameWidth: 96,
      frameHeight: 96,
    });

    this.load.bitmapFont(
      "dogica",
      "assets/fonts/dogica.png",
      "assets/fonts/dogica.xml"
    );
    this.load.bitmapFont(
      "dogicabold",
      "/assets/fonts/dogicabold.png",
      "assets/fonts/dogicabold.xml"
    );
    this.load.bitmapFont(
      "righteous",
      "assets/fonts/righteous.png",
      "assets/fonts/righteous.xml"
    );
  }

  create() {
    
    // Create animations
    this.anims.create({
      key: "patrol",
      frames: this.anims.generateFrameNumbers("knight", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "flicker",
      frames: this.anims.generateFrameNumbers("candle", { start: 0, end: 2 }),
      frameRate: 5,
      yoyo: true,
      repeat: -1,
    });
  }
}
