import { PreloadScene } from './scenes/PreloadScene.js';
import { EntranceScene } from './scenes/EntranceScene.js';
import { AcademicsScene } from './scenes/AcademicsScene.js';

const config = {
    type: Phaser.AUTO,
    title: 'Portfolio',
    description: '',
    parent: 'game-container',
    width: 640,
    height: 360,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        },
    },
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [
        PreloadScene, EntranceScene, AcademicsScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            