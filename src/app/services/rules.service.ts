import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  matrix;
  rows: Number;
  cols: Number;

  constructor() {
    this.rows = 7;
    this.cols = 6;
    this.matrix = this.initMatrix(this.rows, this.cols);
  }

  initMatrix(cols, rows) {
    const matrix = new Array();
    const row = new Array(cols).fill('').map((u, i) => ({ x: i, y: 0, value: 0 }));

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        row[j].y = i;
        console.log(row[j].y);
      }
      matrix.push(row);
    }
    console.log(matrix);
    return matrix;
  }
}
