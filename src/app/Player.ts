import { Color } from './Color';

export class Player {

    id: Number;
    isTurn: Boolean;
    color: Color;

        constructor(id, color) {
            this.id = id;
            this.isTurn = false;
            this.color = color;
        }

    changeTurn() {
        this.isTurn = !this.isTurn;
    }
}
