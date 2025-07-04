import { Boot } from "./scenes/Boot.js";
import { Entrance } from "./scenes/Entrance.js";
import { Academics } from "./scenes/Academics.js";
import { Armory } from "./scenes/Armory.js";
import { Library } from "./scenes/Library.js";
import { FinalScene } from "./scenes/FinalScene.js";

const config = {
    type: Phaser.AUTO,
    title: "Portfolio",
    description: "",
    parent: "game-container",
    width: 640,
    height: 360,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        },
    },
    backgroundColor: "#000000",
    pixelArt: true,
    scene: [
        Boot, Entrance, Academics, Armory, Library, FinalScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            