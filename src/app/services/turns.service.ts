import { Injectable } from '@angular/core';
import { Player } from './../Player';

@Injectable({
  providedIn: 'root'
})
export class TurnsService {

  numberOfPlayers = 2;
  players = [];
  private activePlayerIndex: number;

  constructor() {
    this.activePlayerIndex = 0;
  }

  createPlayers() {
    this.players = new Array(this.numberOfPlayers);
    for (let i = 0; i < 2; i++) {
      const id = i + 1;
      if (i === this.activePlayerIndex) {
        this.initFirstPlayer(id);
      } else {
        this.players[i] = new Player(id);
      }
    }
    console.log(this.players);
  }

  switchTurns() {
    const nextPlayerIndex = (this.activePlayerIndex + 1) % this.players.length;

    const currentPlayer = this.players[this.activePlayerIndex];
    const nextPlayer = this.players[nextPlayerIndex];

    currentPlayer.isTurn = false;
    nextPlayer.isTurn = true;

    this.activePlayerIndex = nextPlayerIndex;
  }

  initFirstPlayer(id) {
    const firstPlayer = new Player(id);
    firstPlayer.isTurn = true;
    this.players[this.activePlayerIndex] = firstPlayer;
  }

  getActivePlayer() {
    return this.players[this.activePlayerIndex];
  }
}
