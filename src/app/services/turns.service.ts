import { Injectable } from '@angular/core';
import { Player } from '../models/Player';
import { ColorsService } from './colors.service';
import { Observable, Subject } from 'rxjs';
import { PlayersService } from './players.service';

@Injectable({
  providedIn: 'root'
})
export class TurnsService {

  private activePlayerIndex: number;

  turnStartedObservable: Observable<Player>;
  private turnStartedSubject: Subject<Player> =  new Subject<Player>();

  constructor(private colorsService: ColorsService, private playersService: PlayersService) {
    this.activePlayerIndex = 0;
    this.turnStartedObservable = this.turnStartedSubject.asObservable();
  }

  switchTurns() {
    const nextPlayerIndex = (this.activePlayerIndex + 1) % this.playersService.players.length;
    const currentPlayer = this.playersService.players[this.activePlayerIndex];
    const nextPlayer = this.playersService.players[nextPlayerIndex];

    currentPlayer.isTurn = false;
    nextPlayer.isTurn = true;

    this.activePlayerIndex = nextPlayerIndex;
    this.turnStartedSubject.next(nextPlayer);
  }

  getActivePlayer() {
    return this.playersService.players[this.activePlayerIndex];
  }
}
