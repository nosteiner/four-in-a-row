import { Injectable } from '@angular/core';
import { Color } from '../Color';
const convert = require('color-convert');

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  colors = [];
  emptyCellColor: Color;
  boardColor: Color;

  constructor() {
    this.emptyCellColor = new Color(230, 230, 230);
    // this.boardColor = new Color(91, 150, 218);
    this.colors.push(this.emptyCellColor);
    // this.colors.push(this.boardColor);
  }

  // generateColor() {
  //   const newColor = new Color(this.emptyCellColor.R, this.emptyCellColor.G, this.emptyCellColor.B);
  //   let counter = 0;
  //   while (this.isSimilartoColors(newColor) && counter < 50) {
  //     newColor.R = Math.floor(Math.random() * 256);
  //     newColor.G = Math.floor(Math.random() * 256);
  //     newColor.B = Math.floor(Math.random() * 256);
  //     counter++;
  //   }
  //   this.addToColors(newColor);
  //   return newColor;
  // }

  randomizeColor() {
    const newColor = new Color(this.emptyCellColor.R, this.emptyCellColor.G, this.emptyCellColor.B);
    const hue =  Math.floor(Math.random() * 360);
    const saturation =  Math.floor(Math.random() * 100) + 156;
    const value =  Math.floor(Math.random() * 100) + 156;
    let r, g, b;
    [r, g, b] = convert.rgb.hsv(hue, saturation, value);
    [r, g, b] = convert.rgb.hsv(140, 200, 100);
    console.log("ggggggg: ",r, g, b);
    newColor.R = r;
    newColor.G = g;
    newColor.B = b;
    return newColor;
  }

  generateColor() {

    let counter = 0;
    let isSimilartoExistingColors = true;
    let newColor = null;
    while (isSimilartoExistingColors && counter < 50) {

      newColor = this.randomizeColor();
      isSimilartoExistingColors = this.isSimilartoColors(newColor);
      counter++;
    }
    this.addToColors(newColor);
    console.log("r: ", newColor.R, "g: ", newColor.G, "b: ", newColor.B)
    return newColor;
  }

  isSimilartoColors(newColor: Color) {
    const hueThreshold = 100;
    for (const color of this.colors) {
      if (this.calculateHueDistance(color, newColor) > hueThreshold) {
        return false;
      }
    }
    return true;
  }

  calculateHueDistance(color1: Color, color2: Color) {
    const deltaR = color1.R - color2.R;
    const deltaG = color1.G - color2.G;
    const deltaB = color1.B - color2.B;

    const hue1 = this.getHue(color1);
    const hue2 = this.getHue(color2);
    console.log("hue1: ", hue1, "hue2: ", hue2);
    const distance = Math.abs(hue1 - hue2) * 256;
    return distance;
  }

  addToColors(newColor: Color) {
    this.colors.push(newColor);
  }

  getHue(color) {
    const red = color.R;
    const blue = color.B;
    const green = color.G;

    const min = Math.min(Math.min(red, green), blue);
    const max = Math.max(Math.max(red, green), blue);

    if (min === max) {
      return 0;
    }

    let hue = 0.0;
    if (max === red) {
      hue = (green - blue) / (max - min);

    } else if (max === green) {
      hue = 2.0 + (blue - red) / (max - min);

    } else {
      hue = 4.0 + (red - green) / (max - min);
    }

    hue = hue * 60.0;
    if (hue < 0.0) {
      hue = hue + 360.0;
    }

    console.log("hue: ", hue);
    return Math.round(hue);
  }
}
