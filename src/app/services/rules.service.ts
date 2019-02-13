import { Injectable } from '@angular/core';
import { Cell } from './../Cell';
import { TurnsService } from './turns.service';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  matrix = [];
  numberOfRows: number;
  numberOfCols: number;
  tokensByColumn = [];

  constructor(private turnsService: TurnsService, private gameService: GameService) {
    this.numberOfCols = 7;
    this.numberOfRows = 6;
    this.matrix = this.initMatrix(this.numberOfCols, this.numberOfRows);
    this.tokensByColumn = new Array(this.numberOfCols).fill(0);
  }

  initMatrix(numberOfCols, numberOfRows) {
    const matrix = [];

    for (let i = 0; i < numberOfCols; i++) {
      const col = new Array(numberOfRows).fill(null).map(e => (new Cell()));
      matrix.push(col);
    }
    return matrix;
  }

  resetBoard() {
    this.matrix = this.initMatrix(this.numberOfCols, this.numberOfRows);
    this.tokensByColumn = this.tokensByColumn.fill(0);
    }

  isColInsertable(colIndex) {
    return this.tokensByColumn[colIndex] < this.numberOfRows;
  }

  insertTokenToCol(colIndex) {
    const topEmptyCellIndex = (this.numberOfRows - 1) - this.tokensByColumn[colIndex];
    const currentCell: Cell = this.matrix[colIndex][topEmptyCellIndex];

    this.setCell(currentCell);
    this.tokensByColumn[colIndex]++;

    if (this.isVictory(colIndex, topEmptyCellIndex)) {
      this.gameService.Victory();
      this.resetBoard();
    }
  }

  setCell(currentCell: Cell) {
    currentCell.player = this.turnsService.getActivePlayer();
    currentCell.changeState();
    currentCell.changeColor();
  }

  isVictory(colIndex, rowIndex) {
    if (this.is4inCol(colIndex, rowIndex) ||
      this.is4inRow(colIndex, rowIndex) ||
      this.is4inDiagSlash(colIndex, rowIndex) ||
      this.is4inDiagBackSlash(colIndex, rowIndex)) {
      return true;
    } else {
      return false;
    }
  }

//   is4inRow(clickedCol, clickedRow) {
//     const player = this.turnsService.getActivePlayer();
//     let sequenceCounter = 0;
//     const startingCol = Math.max(0, clickedCol - 3);
//     const finishCol = Math.min(this.numberOfCols - 1 , clickedCol + 3);

//     for (let col = startingCol; col >= finishCol; col--) {
//       if (this.matrix[col][clickedRow].player === player) {
//         console.log(col, clickedRow);

//         sequenceCounter++;
//       } else {
//         sequenceCounter = 0;
//       }
//       if (sequenceCounter >= 4) {
//         return true;
//       }
//     }
//   }

//   is4inCol(clickedCol, clickedRow) {
//     const player = this.turnsService.getActivePlayer();
//     let sequenceCounter = 0;
//     const finishRow = Math.max(0, clickedRow - 3);
//     const startingRow = Math.min(this.numberOfRows - 1, clickedRow + 3);
//     for (let row = startingRow; row >= finishRow; row--) {
//       if (this.matrix[clickedCol][row].player === player) {
//         sequenceCounter++;
//       } else {
//         sequenceCounter = 0;
//       }
//       if (sequenceCounter >= 4) {
//         console.log('win!');
//         return true;
//       }
//     }
//   }

//   is4inDiagSlash(clickedCol, clickedRow) {
//     const player = this.turnsService.getActivePlayer();
//     let sequenceCounter = 0;
//     for(let diagonalIndex = -3; diagonalIndex <= 3; diagonalIndex++){
//         const col = clickedCol + diagonalIndex;
//         const row = clickedRow - diagonalIndex;
//         if (col < 0 || col >= this.numberOfCols || row < 0 || row >= this.numberOfRows){
//             sequenceCounter = 0;
//             continue;
//         }
//         if (this.matrix[col][row].player === player) {
//             sequenceCounter++;
//         } 
//         else {
//             sequenceCounter = 0;
//         }
//         if (sequenceCounter >= 4) {
//             console.log('win!');
//             return true;
//         }
//     }
//   }



//     is4inDiagBackSlash(clickedCol, clickedRow) {
//         const player = this.turnsService.getActivePlayer();
//         let sequenceCounter = 0;
//         for (let diagonalIndex = -3; diagonalIndex <= 3; diagonalIndex++){
//             const col = clickedCol + diagonalIndex;
//             const row = clickedRow + diagonalIndex;
//             if (col < 0 || col >= this.numberOfCols || row < 0 || row >= this.numberOfRows){
//                 sequenceCounter = 0;
//                 continue;
//             }
//             if (this.matrix[col][row].player === player) {
//                 sequenceCounter++;
//             } else {
//                 sequenceCounter = 0;
//             }
//             if (sequenceCounter >= 4) {
//                 console.log('win!');
//                 return true;
//             }
//         }
//     }




    is4inRow(clickedCol, clickedRow) {
        return this.is4inSequence(clickedCol, clickedRow, 1, 0);
    }

    is4inCol(clickedCol, clickedRow) {
        return this.is4inSequence(clickedCol, clickedRow, 0, 1);
    }

    is4inDiagBackSlash(clickedCol, clickedRow) {
        return this.is4inSequence(clickedCol, clickedRow, 1, 1);
    }

    is4inDiagSlash(clickedCol, clickedRow) {
        return this.is4inSequence(clickedCol, clickedRow, -1, 1);
    }


    is4inSequence(clickedCol, clickedRow, directionRow, directionCol) {
        const player = this.turnsService.getActivePlayer();
        let sequenceCounter = 0;
        for (let diagonalIndex = -3; diagonalIndex <= 3; diagonalIndex++) {
            const col = clickedCol + diagonalIndex * directionCol;
            const row = clickedRow + diagonalIndex * directionRow;
            if (col < 0 || col >= this.numberOfCols || row < 0 || row >= this.numberOfRows) {
                sequenceCounter = 0;
                continue;
            }
            if (this.matrix[col][row].player === player) {
                sequenceCounter++;
            } else {
                sequenceCounter = 0;
            }
            if (sequenceCounter >= 4) {
                console.log('win!');
                return true;
            }
        }
    }
}
