import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnChanges {

  isStarted: boolean;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {

  }
}
