
import { Creature } from './creature.js';

export function IceBlock(game, x, y) {
    Creature.call(this, game, "data/images/iceblock.png", 8, x, y, 44, 44);
    this.vSpeed = -300;
    this.hSpeed = -100;
    this.stomped = false;
}
IceBlock.prototype = Object.create(Creature.prototype);
IceBlock.prototype.constructor = IceBlock;

IceBlock.prototype.stomp = function() {
    this.stomped = true;
    this.sprite.setNumTiles(1);
    this.sprite.setRow(1);
    this.hSpeed = 0;
}
