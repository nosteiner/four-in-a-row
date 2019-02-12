import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TurnsService } from 'src/app/services/turns.service';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-choose-player',
  templateUrl: './choose-player.component.html',
  styleUrls: ['./choose-player.component.scss']
})
export class ChoosePlayerComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

  handleStartGame() {
    this.gameService.start();
   }
}
