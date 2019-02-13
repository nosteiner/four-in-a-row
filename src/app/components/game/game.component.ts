import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Color } from 'src/app/Color';
import { TurnsService } from 'src/app/services/turns.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  isStart: Boolean;
  isVictory: Boolean;
  isDraw: Boolean;

  title: String;
  action: String;
  color: Color;

  constructor(private gameService: GameService, private turnsService: TurnsService) {
    this.isStart = false;
    this.isVictory = false;
    this.isDraw = false;
    this.title = 'Connect 4';
    this.action = 'Start';
    this.color = new Color(255, 0, 0);
  }

  ngOnInit() {
    this.gameService.isStartObservable.subscribe((boolean) => {
      this.isStart = boolean;
    });
    this.gameService.isVictoryObservable.subscribe((boolean) => {
      this.isVictory = boolean;
      this.title = 'We have a winner!';
      this.action = 'Play Again';
      this.color = this.turnsService.getActivePlayer().color;
    });
    this.gameService.isDrawObservable.subscribe((boolean) => {
      this.isDraw = boolean;
      this.title = 'DRAW';
      this.action = 'Play Again';
    });
  }

}
