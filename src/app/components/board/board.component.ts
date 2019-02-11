import { Component, OnInit } from '@angular/core';
import { RulesService } from 'src/app/services/rules.service';
import { TurnsService } from 'src/app/services/turns.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private rulesService: RulesService, private turnsService: TurnsService) { }

  matrix;

  ngOnInit() {
    this.matrix = this.rulesService.matrix;
  }

  handleClickOnCol(colId) {
    const colIndex = this.getColNumberById(colId);
    if (this.rulesService.isColInsertable(colIndex)) {
      this.rulesService.insertTokenToCol(colIndex);
      this.turnsService.switchTurns();
    }
  }

  getColNumberById(colId) {
    return Number(colId.replace(/^\D+/g, ''));
  }

}
