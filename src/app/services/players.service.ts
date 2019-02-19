import { Injectable } from '@angular/core';
import { ColorsService } from './colors.service';
import { Player } from '../models/Player';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  numberOfPlayers = 2;
  players = [];

  private firstPlayerIndex: number;

  constructor(private colorsService: ColorsService) {
    this.firstPlayerIndex = 0;
  }

  createPlayers() {
    this.players = new Array(this.numberOfPlayers);
    for (let i = 0; i < 2; i++) {
      const id = i + 1;
      if (i === this.firstPlayerIndex) {
        this.initFirstPlayer(id);
      } else {
        this.players[i] = new Player(id,  this.initColor());
      }
    }
  }

  initFirstPlayer(id) {
    const firstPlayer = new Player(id,  this.initColor());
    firstPlayer.isTurn = true;
    this.players[this.firstPlayerIndex] = firstPlayer;
  }

  initColor() {
    return this.colorsService.generateColor();
  }
}

