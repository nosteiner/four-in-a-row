import { Injectable } from '@angular/core';
import { Color } from '../models/Color';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  colors = [];
  emptyCellColor: Color;
  boardColor: Color;

  constructor() {
    this.emptyCellColor = new Color(230, 230, 230);
    this.boardColor = new Color(91, 150, 218);
    this.colors.push(this.emptyCellColor);
    this.colors.push(this.boardColor);
  }

  generateColor() {
    const newColor = new Color(this.emptyCellColor.R, this.emptyCellColor.G, this.emptyCellColor.B);
    let counter = 0;
    while (this.isSimilartoColors(newColor) && counter < 50) {
      newColor.R = Math.floor(Math.random() * 256);
      newColor.G = Math.floor(Math.random() * 256);
      newColor.B = Math.floor(Math.random() * 256);
      counter++;
    }
    this.addToColors(newColor);
    return newColor;
  }

  isSimilartoColors(newColor: Color) {
    for (const color of this.colors) {
      const threshold = 400;
      if (this.calculateDistance(color, newColor) > threshold) {
        return false;
      }
    }
    return true;
  }

  calculateDistance(color1: Color, color2: Color) {
    const deltaR = color1.R - color2.R;
    const deltaG = color1.G - color2.G;
    const deltaB = color1.B - color2.B;

    const distance = Math.sqrt(Math.pow(deltaR, 2) + Math.pow(deltaG, 2) + Math.pow(deltaB, 2));

    return distance;
  }

  addToColors(newColor: Color) {
    this.colors.push(newColor);
  }
}
