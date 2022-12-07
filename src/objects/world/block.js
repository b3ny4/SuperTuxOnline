
import { Item } from '../item.js';

export function Block(game, x=0, y=0) {
    return Item.call(this, game, "data/images/block.png", 1, x, y);
}
Block.prototype = Object.create(Item.prototype);
Block.prototype.constructor = Block;