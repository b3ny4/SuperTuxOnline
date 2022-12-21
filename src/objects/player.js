
import { Item } from './item.js';

/**
 * Represents a (controllable) player
 * @param {Game} game Game which the player is in
 * @param {int} x x coord in the game
 * @param {int} y y coord in the game
 */
export function Player(game, x=0, y=0) {
    Item.call(this, game, "data/images/tux.png", 8, x, y, 49, 48);
    this.vSpeed = -300;
    this.dead = false;
}
Player.prototype = Object.create(Item.prototype);
Player.prototype.constructor = Player;

Player.prototype.run = function() {


    // jump
    if (this.game.keyboard.keymap[32] && this.vSpeed === 0 && !this.dead) {
        this.vSpeed = - 500;
    }
    // fall
    this.vSpeed += 640*this.game.deltaTime;
    
    this.y+=this.vSpeed*this.game.deltaTime;

    // vertical collision
    for (let item of this.game.items) {
        if (item === this) {
            continue;
        }
        if (this.collidesWith(item)) {
            let offset = item.height/2 + this.height/2
            if (this.vSpeed > 0) {
                this.y = item.y - offset;
            } else {
                this.y = item.y + offset;
            }
            this.vSpeed = 0;
        }
    }

    // walk
    let hSpeed = 0;
    if (this.game.keyboard.keymap[37] && !this.dead) {
        hSpeed = - 300 * this.game.deltaTime;
    }
    if (this.game.keyboard.keymap[39] && !this.dead) {
        hSpeed = 300 * this.game.deltaTime;
    }
    this.x += hSpeed;

    // horizontal collision
    for (let item of this.game.items) {
        if (item === this) {
            continue;
        }
        if (this.collidesWith(item)) {
            let offset = item.width/2 + this.width/2
            if (this.hSpeed > 0) {
                this.x = item.x - offset;
            } else {
                this.x = item.x + offset;
            }
        }
    }


    // die under 800
    if (this.y > this.game.height && ! this.dead) {
        this.sprite.setNumTiles(2);
        this.sprite.setRow(4);
        this.width = 57;
        this.sprite.setWidth(this.width);
        this.vSpeed = - 1000;
        this.dead = true;
    }

    // register debugging output
    this.game.debug.register("PlayerX", this.x);
    this.game.debug.register("PlayerY", this.y);
    this.game.debug.register("vSpeed", this.vSpeed);
}