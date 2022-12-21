
import { Element } from './element.js';

export function Debug(game) {
    Element.call(this, game, 0, 0);
    this.registry = {};
}
Debug.prototype = Object.create(Element.prototype);
Debug.prototype.constructor = Debug;

Debug.prototype.render = function() {
    let fillStyle = this.game.ctx.fillStyle;
    this.game.ctx.fillStyle = "white";
    let i = 0;
    for (const [key, value] of Object.entries(this.registry)) {
        this.game.ctx.fillText(`${key}: ${value}`, 10, 10+(i++)*12);
    }
    this.game.ctx.fillStyle = fillStyle;
}

Debug.prototype.register = function(key, value) {
    this.registry[key] = value;
}