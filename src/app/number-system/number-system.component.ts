import { Component, OnInit } from '@angular/core';

const isSingleNumberRgx: RegExp = /\d/;
const isNotSingleNumberRgx: RegExp = /\D/;
const isNumberRgx: RegExp = /\d+/;
const isNotNumberRgx: RegExp = /\D+/;

@Component({
  selector: 'app-number-system',
  templateUrl: './number-system.component.html',
  styleUrls: ['./number-system.component.scss']
})
export class NumberSystemComponent implements OnInit {

  readonly numberSystems: number[] = [];
  nsList: NS[] = [];

  constructor() { }

  ngOnInit(): void {
    for (let i = 2; i <= 36; i++) {
      this.numberSystems.push(i);
    }
    this.addNS();
  }

  addNS(): void {
    this.nsList.push(new NS());
  }

  removeNS(ns: NS): void {
    if (this.nsList.length < 2) {
      return;
    }
    this.nsList = this.nsList.filter(ns1 => ns1 !== ns);
  }

}

class NS {
  numberSystemSource: number = 10;
  numberSystemTarget: number = 2;
  source: string = '';
  target: string = '';

  recalculate(reverse: boolean): void {
    if (reverse) {
      this.source = this.convertToDecimal(this.target, this.numberSystemTarget).toString();
    } else {
      this.target = this.convertFromDecimal(
        parseInt(this.source.replace(isNotNumberRgx, '')),
        this.numberSystemTarget
      );
      // this.target = parseInt(this.source).toString(this.numberSystemTarget); easier but not the purpose of this project
    }
  }

  convertFromDecimal(origin: number, targetBase: number): string {
    let result: number[] = [];
    if (origin < 0 || targetBase < 2) {
      return '';
    }
    let current: number = origin;
    while (Math.trunc(current / targetBase) > 0) {
      result.push(current % targetBase);
      current = Math.trunc(current / targetBase);
    }
    result.push(current);
    return result.reverse().map<string>(n => {
      if (n < 10) {
        return n.toString();
      } else if (n < 36) {
        return String.fromCharCode(n - 10 + 65);
      } else {
        return '';
      }
    }).join('');
  }

  convertToDecimal(origin: string, targetBase: number): number {
    if (origin.length == 0 || targetBase < 2) {
      return 0;
    }
    let result: number = 0;
    let temp: number[] = [];
    for (let n of origin) {
      if (n.match(isSingleNumberRgx)) {
        temp.push(parseInt(n));
      } else if (n.charCodeAt(0) > 64 && n.charCodeAt(0) < 91) {
        temp.push(n.charCodeAt(0) - 65 + 10);
      }
    }
    temp.reverse().forEach((n, i) => {
      result += n * Math.pow(targetBase, i);
    });
    return result;
  }
}
