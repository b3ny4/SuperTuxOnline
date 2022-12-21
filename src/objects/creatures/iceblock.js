
import { Coin } from '../world/coin.js';
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

IceBlock.prototype.horizontalCollision = function(item) {
    if (!(item instanceof Coin)) {
        this.hSpeed *= -1;
        if (this.hSpeed > 0){
        this.sprite.mirror(true)
        }else{
            this.sprite.mirror(false)
        }
        this.run();
    } 
}

IceBlock.prototype.run = function() {

    this.fall();

    this.walk(this.horizontalCollision);

}
