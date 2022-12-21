
import { IceBlock } from './creatures/iceblock.js';
import { Creature } from './creatures/creature.js';

/**
 * Represents a (controllable) player
 * @param {Game} game Game which the player is in
 * @param {int} x x coord in the game
 * @param {int} y y coord in the game
 */
export function Player(game, x=0, y=0) {
    Creature.call(this, game, "data/images/tux.png", 8, x, y, 49, 48);
    this.vSpeed = -300;
    this.dead = false;
}
Player.prototype = Object.create(Creature.prototype);
Player.prototype.constructor = Player;

Player.prototype.horizontalCollision = function(item) {
    if (item instanceof IceBlock) {
        this.vSpeed = - 1000;
        this.dead = true;
        this.collision = false;
    }
}
Player.prototype.verticalCollision = function(item) {
    if (item instanceof IceBlock) {
        item.stomp();
        this.vSpeed = -300;
    }
}

Player.prototype.run = function() {


    // jump
    if (this.game.keyboard.keymap[32] && this.vSpeed === 0 && !this.dead) {
        this.vSpeed = - 500;
    }

    this.fall(this.verticalCollision);


    // walk
    this.hSpeed = 0;
    if (this.game.keyboard.keymap[37] && !this.dead) {
        this.hSpeed = - 300;
        this.sprite.mirror(true);
    }
    if (this.game.keyboard.keymap[39] && !this.dead) {
        this.hSpeed = 300;
        this.sprite.mirror(false);
    }

    this.walk(this.horizontalCollision);

    if (this.vSpeed != 0) {
        this.sprite.setNumTiles(1);
        this.sprite.setRow(2);
    }
    else if (this.hSpeed === 0) {
        this.sprite.setNumTiles(1);
        this.sprite.setRow(0);
    }
    else {
        this.sprite.setNumTiles(8);
        this.sprite.setRow(0);
    }
    if (this.dead) {
        this.sprite.setNumTiles(2);
        this.sprite.setRow(4);
        this.width = 57;
        this.sprite.setWidth(this.width);
    }

    // die under 800
    if (this.y > this.game.height && ! this.dead) {
        this.vSpeed = - 1000;
        this.dead = true;
    }

    // register debugging output
    this.game.debug.register("PlayerX", this.x);
    this.game.debug.register("PlayerY", this.y);
    this.game.debug.register("vSpeed", this.vSpeed);
    this.game.debug.register("hSpeed", this.hSpeed);
}