import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit {


  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

  handleStartGame() {
    this.gameService.start();
   }
}
