
import { Player } from './objects/player.js';
import { Block } from './objects/world/block.js';

var game = {
    canvas: null,
    ctx: null,
    tick: 0,
    timestamp: -1,
    deltaTime: 0,

    items: new Array(),

    attach: function(item) {
        this.items.push(item);
    },

    render: function() {

        game.ctx.clearRect(0,0,game.ctx.canvas.width, game.ctx.canvas.height);
        for(let item of this.items) {
            item.render();
        }
    
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
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        this.render();
    }
}


export function main() {

    game.canvas = document.getElementById("game");
    game.ctx = game.canvas.getContext("2d");

    game.attach(new Player(game, 100, 100));

    for(let i = 0; i < 10; i++) {
        game.attach(new Block(game, 32*i + 16, 500));
    }

    game.fullscreen();

    window.requestAnimationFrame(game.run.bind(game));
}
