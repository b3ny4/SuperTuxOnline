
import { Sprite } from '../gui/sprite.js';
import { Element } from './element.js';

/**
 * Represents a sprite based element
 * @param {Game} game Game which the player is in
 * @param {String} src Source of the spritesheet
 * @param {int} numTiles number of tiles within current row
 * @param {int} x x coord in the game
 * @param {int} y y coord in the game
 * @param {int} width width of the item
 * @param {int} height height of the item
 */
export function Item(game, src, numTiles, x=0, y=0, width = 32, height = 32) {
    Element.call(this, game, x, y);
    this.height = height;
    this.width = width;
    this.sprite = new Sprite(game, src, width, height);
    this.sprite.setNumTiles(numTiles);
}
Item.prototype = Object.create(Element.prototype);
Item.prototype.constructor = Item;

Item.prototype.render = function() {
    this.sprite.render(this.x, this.y);
}

Item.prototype.collidesWith = function(item) {    
    let myLeft = this.x - this.width/2;
    let myRight = this.x + this.width/2;
    let myTop = this.y - this.height/2;
    let myBottom = this.y + this.height/2;
    let otherLeft = item.x - item.width/2;
    let otherRight = item.x + item.width/2;
    let otherTop = item.y - item.height/2;
    let otherBottom = item.y + item.height/2;

    if (myLeft < otherRight && myRight > otherLeft && myTop < otherBottom && myBottom > otherTop) {
        return true;
    }

    return false;
}