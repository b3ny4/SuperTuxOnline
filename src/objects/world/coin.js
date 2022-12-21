
import { Item } from '../item.js';

export function Coin(game, x=0, y=0) {
    return Item.call(this, game, "data/images/coin.png", 16, x, y, 32, 32, false);
}
Coin.prototype = Object.create(Item.prototype);
Coin.prototype.constructor = Coin;

Coin.prototype.collect = function() {
    const index = this.game.items.indexOf(this);
    this.game.items.splice(index, 1);
    this.game.coins ++;
}