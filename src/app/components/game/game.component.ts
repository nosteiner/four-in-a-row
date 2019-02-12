import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Player } from 'src/app/Player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  isStart: Boolean;
  isVictory: Boolean;
  constructor(private gameService: GameService) {
    this.isStart = false;
    this.isVictory = false;
  }

  ngOnInit() {
    this.gameService.isStartObservable.subscribe((boolean) => {
      this.isStart = boolean;
    });
    this.gameService.isVictoryObservable.subscribe((boolean) => {
      this.isVictory = boolean;
    });
  }

}
