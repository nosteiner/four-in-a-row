import { Player } from './Player';
import { Color } from './Color';

export class Cell {

    constructor() {
        this.isEmpty = true;
        this.player = null;
        this.color = new Color(255, 255, 255);
    }

    isEmpty: Boolean;
    player: Player;
    color: Color;

    changeState() {
        this.isEmpty = !this.isEmpty;
        this.changeColor();
    }

    changeColor() {
        this.color = this.player.color;
    }
}
