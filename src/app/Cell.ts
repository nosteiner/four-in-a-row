import { Player } from './Player';

export class Cell {

    constructor() {
        this.isEmpty = true;
        this.player = new Player(0);
    }
    isEmpty: Boolean;
    player: Player;

    changeState() {
        this.isEmpty = !this.isEmpty;
    }
}
