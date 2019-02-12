import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/Color';
import { TurnsService } from 'src/app/services/turns.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  color: Color;

  constructor(private turnsService: TurnsService) {
  }

  ngOnInit() {
    this.setTokenColor();
    this.turnsService.turnStartedObservable.subscribe((player) => {
      this.color = player.color;
    });
  }

  setTokenColor() {
    this.color = this.turnsService.getActivePlayer().color;
  }
}
