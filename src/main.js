
import { Keyboard } from './mechanics/keyboard.js';
import { Debug } from './objects/debug.js';
import { Player } from './objects/player.js';
import { Background } from './objects/world/background.js';
import { Block } from './objects/world/block.js';

var game = {
    canvas: null,
    ctx: null,
    tick: 0,
    timestamp: -1,
    deltaTime: 0,

    height: 972,
    width: 1580,

    items: new Array(),

    debug: null,
    keyboard: null,
    background: null,

    attach: function(item) {
        this.items.push(item);
    },

    render: function() {

        game.ctx.clearRect(0,0,game.ctx.canvas.width, game.ctx.canvas.height);

        this.background.render();

        for(let item of this.items) {
            item.render();
        }

        this.debug.render();
    
    },

    run: function(timestamp) {
        
        this.deltaTime = (timestamp - this.timestamp)/1000;
        if (this.timestamp == -1) {
            this.deltaTime = 0;
        }
        this.timestamp = timestamp;

        this.tick = Math.round(timestamp/100);
        
        for(let item of this.items) {
            item.run();
        }

        this.render();

        window.requestAnimationFrame(game.run.bind(this));
    },

    fullscreen: function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx.canvas.width = this.width;
        this.ctx.canvas.height = this.height;
        this.render();
    }
}

export function main() {

    game.canvas = document.getElementById("canvas");
    game.ctx = game.canvas.getContext("2d");

    game.attach(new Player(game, 100, 100));

    for(let i = 0; i < 10; i++) {
        game.attach(new Block(game, 32*i + 16, 500));
    }

    game.debug = new Debug(game);

    game.keyboard = new Keyboard(game);

    game.background = new Background(game, "data/images/backgrounds/nighthills.png");

    window.addEventListener("resize", game.fullscreen.bind(game));
    game.fullscreen();
    window.requestAnimationFrame(game.run.bind(game));


}
