import { Player } from './Player';
import { Color } from './Color';

export class Cell {

    constructor() {
        this.isEmpty = true;
        this.player = new Player(0, this.color);
        this.color = new Color(230, 230, 230);
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
