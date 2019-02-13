import { Injectable } from '@angular/core';
import { PlayersService } from './players.service';
import { TurnsService } from './turns.service';
import { Observable, Subject } from 'rxjs';
import { RulesService } from './rules.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  isStart: boolean;
  isStartObservable: Observable<Boolean>;
  isStartSubject: Subject<Boolean> =  new Subject<Boolean>();

  isVictory: boolean;
  isVictoryObservable: Observable<Boolean>;
  isVictorySubject: Subject<Boolean> =  new Subject<Boolean>();

  isDraw: boolean;
  isDrawObservable: Observable<Boolean>;
  isDrawSubject: Subject<Boolean> =  new Subject<Boolean>();


  constructor(private playersService: PlayersService) {
    this.isStart = false;
    this.isVictory = false;
    this.isDraw = false;
    this.isStartObservable = this.isStartSubject.asObservable();
    this.isVictoryObservable = this.isVictorySubject.asObservable();
    this.isDrawObservable = this.isDrawSubject.asObservable();
  }

  start() {
    this.playersService.createPlayers();
    this.isStart = true;
    this.isStartSubject.next(this.isStart);
    if (this.isVictory || this.isDraw) {
      this.restart();
    }
  }

  Victory() {
    this.isVictory = true;
    this.isVictorySubject.next(this.isVictory);
  }

  draw() {
    this.isDraw = true;
    this.isDrawSubject.next(this.isDraw);
  }

    restart() {
    this.isVictory = false;
    this.isDraw = false;
    this.isVictorySubject.next(this.isVictory);
    this.isDrawSubject.next(this.isDraw);

  }
}
