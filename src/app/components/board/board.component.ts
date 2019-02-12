import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RulesService } from 'src/app/services/rules.service';
import { TurnsService } from 'src/app/services/turns.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterViewInit {

  constructor(private rulesService: RulesService, private turnsService: TurnsService) { }

  event: MouseEvent;
  matrix;

  columnsPositions = [];

  ngOnInit() {
    this.matrix = this.rulesService.matrix;
  }

  ngAfterViewInit() {
    this.setColumnsCoordinates();
  }

  handleClickOnCol(event) {
    const colIndex = this.columnsPositions.indexOf(this.findColumnByPositionX(event.clientX));
    if (this.rulesService.isColInsertable(colIndex)) {
      this.rulesService.insertTokenToCol(colIndex);
      this.turnsService.switchTurns();
    }
  }

  setColumnsCoordinates() {
    for (let i = 0; i < 7; i++) {
      const colId = 'col' + i;
      const columnElement = document.getElementById(`${colId}`);
      const colPosition = this.getColumnPosition(columnElement);
      if (this.columnsPositions.length > 6) {
        this.columnsPositions[i] = colPosition;
      } else {
        this.columnsPositions.push(colPosition);
      }
    }
  }

  getColumnPosition(el) {
    let xPos = 0;
    let yPos = 0;

    while (el) {
      if (el.tagName === 'BODY') {
        // deal with browser quirks with body/window/document and page scroll
        const xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        const yScroll = el.scrollTop || document.documentElement.scrollTop;

        xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
      } else {
        // for all other non-BODY elements
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
      }

      el = el.offsetParent;
    }
    return {
      x: xPos,
      y: yPos
    };
  }

  findColumnByPositionX(mouseUpPositionX) {
    const colwidth = 72;

    return this.columnsPositions.find((element) => {
      const elementStartX = element.x;
      const elementEndX = element.x + colwidth;

      return (elementStartX <= mouseUpPositionX && mouseUpPositionX < elementEndX);
    });
  }

  onResize(event) {
  this.setColumnsCoordinates();
  }
}
