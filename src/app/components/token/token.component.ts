import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app//models/Color';
import { TurnsService } from 'src/app/services/turns.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  color: Color;
  animationIteration;

  constructor(private turnsService: TurnsService) {
    this.animationIteration = 'infinite';
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

  stopAnimation() {
    this.animationIteration = 0;
  }
}
