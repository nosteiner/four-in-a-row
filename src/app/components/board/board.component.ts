import { Component, OnInit } from '@angular/core';
import { RulesService } from 'src/app/services/rules.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private rulesService: RulesService) { }
matrix;
  ngOnInit() {
this.matrix = this.rulesService.matrix;
  }

  print(col, row) {
    console.log(col, row);
  }

}
