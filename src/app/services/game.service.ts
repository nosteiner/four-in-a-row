import { Injectable } from '@angular/core';
import { PlayersService } from './players.service';
import { TurnsService } from './turns.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  isStart: boolean;
  isStartObservable: Observable<Boolean>;
  isStartSubject: Subject<Boolean> =  new Subject<Boolean>();

  constructor(private turnsService: TurnsService) {
    this.isStart = false;
    this.isStartObservable = this.isStartSubject.asObservable();
  }

  start() {
    this.turnsService.createPlayers();
    this.isStart = true;
    this.isStartSubject.next(this.isStart);
  }

  win() {

  }

  gameOver() {

  }
}
