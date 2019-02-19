import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Color } from 'src/app//models/Color';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {


  @Input() title: String;
  @Input() action: String;
  @Input() color: Color;

  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

  handleStartGame() {
    this.gameService.start();
   }
}
