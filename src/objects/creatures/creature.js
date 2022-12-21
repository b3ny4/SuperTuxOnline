
import { Item } from '../item.js';

export function Creature(game, src, numTiles, x, y, width, height, collision=true) {
    Item.call(this, game, src, numTiles, x, y, width, height, collision);
    this.vSpeed = -300;
    this.hSpeed = -100;
}
Creature.prototype = Object.create(Item.prototype);
Creature.prototype.constructor = Creature;

Creature.prototype.fall = function(collide=()=>{}) {
    // fall
    this.vSpeed += 640*this.game.deltaTime;

    this.y+=this.vSpeed*this.game.deltaTime;

    // vertical collision
    for (let item of this.game.items) {
        if (!this.collision) {
            return;
        }
        if (item === this) {
            continue;
        }
        if (this.collidesWith(item)) {
            if (item.collision) {
                let offset = item.height/2 + this.height/2
                if (this.vSpeed > 0) {
                    this.y = item.y - offset;
                } else {
                    this.y = item.y + offset;
                }
                this.vSpeed = 0;
            }

            collide.call(this, item);
        }

    }
}

Creature.prototype.walk = function(collide=()=>{}) {
    // walk
    this.x += this.hSpeed * this.game.deltaTime;

    // horizontal collision
    for (let item of this.game.items) {
        if (!this.collision) {
            return;
        }
        if (item === this) {
            continue;
        }
        if (this.collidesWith(item)) {
            if (item.collision) {
                let offset = item.width/2 + this.width/2
                if (this.hSpeed > 0) {
                    this.x = item.x - offset;
                } else {
                    this.x = item.x + offset;
                }
            }
            collide.call(this, item);
        }
    }
}

Creature.prototype.run = function() {
    this.fall();
    this.walk();
}