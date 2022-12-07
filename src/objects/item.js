
import { Sprite } from '../gui/sprite.js';


export function Item(game, src, numTiles, x=0, y=0, width = 32, height = 32) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.sprite = new Sprite(game, src, width, height);
    this.sprite.setNumTiles(numTiles);
}

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
Item.prototype.run = function() {}