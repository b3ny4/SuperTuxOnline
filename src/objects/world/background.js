
import { Element } from '../element.js';

export function Background(game, src) {
    Element.call(this, game, 0, 0);
    this.img = document.createElement('img');
    this.img.src = src;
}
Background.prototype = Object.create(Element.prototype);
Background.prototype.constructor = Background;

Background.prototype.render = function() {
    this.game.ctx.drawImage(this.img, 0, 0);
}