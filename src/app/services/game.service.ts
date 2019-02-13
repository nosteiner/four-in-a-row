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

  constructor(private turnsService: TurnsService) {
    this.isStart = false;
    this.isVictory = false;
    this.isStartObservable = this.isStartSubject.asObservable();
    this.isVictoryObservable = this.isVictorySubject.asObservable();
  }

  start() {
    this.turnsService.createPlayers();
    this.isStart = true;
    this.isStartSubject.next(this.isStart);
    if (this.isVictory) {
      this.restart();
    }
  }

  Victory() {
    this.isVictory = true;
    this.isVictorySubject.next(this.isVictory);
  }

  gameOver() {

  }

    restart() {
    this.isVictory = false;
    this.isVictorySubject.next(this.isVictory);
  }
}
