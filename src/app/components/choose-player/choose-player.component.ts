import { Component, OnInit } from '@angular/core';
import { TurnsService } from 'src/app/services/turns.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-player',
  templateUrl: './choose-player.component.html',
  styleUrls: ['./choose-player.component.scss']
})
export class ChoosePlayerComponent implements OnInit {

  constructor(private turnsService: TurnsService, private router: Router) { }

  isPlayersInit = false;

  ngOnInit() {
  }

  handleStartGame() {
    this.turnsService.createPlayers();
    this.isPlayersInit = true;
  }
}
