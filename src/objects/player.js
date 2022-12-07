
import { Item } from './item.js';


export function Player(game, x=0, y=0) {
    Item.call(this, game, "data/images/tux.png", 8, x, y, 49, 48);
    this.hSpeed = -300;
}
Player.prototype = Object.create(Item.prototype);
Player.prototype.constructor = Player;

Player.prototype.run = function() {
    let falling = true;
    for (let item of this.game.items) {
        if (item === this) {
            continue;
        }
        if (this.collidesWith(item)) {
            falling = false;
            break;
        }
    }
    if (falling) {
        this.hSpeed += 640*this.game.deltaTime;
    } else {
        this.hSpeed = 0;
    }
    console.log(this.hSpeed);
    this.y+=this.hSpeed*this.game.deltaTime;
}