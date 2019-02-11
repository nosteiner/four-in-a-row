
export class Player {
constructor(id) {
this.id = id;
this.isTurn = false;
}

id: Number;
isTurn: Boolean;

changeTurn() {
    this.isTurn = !this.isTurn;
}

}
