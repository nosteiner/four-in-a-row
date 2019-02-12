import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  isStart: Boolean;
  constructor(private gameService: GameService) {
    this.isStart = false;
  }

  ngOnInit() {
    this.gameService.isStartObservable.subscribe((boolean) => {
      this.isStart = boolean;
    });
  }

}
