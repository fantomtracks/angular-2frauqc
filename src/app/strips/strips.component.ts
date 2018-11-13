import { Component, OnInit } from '@angular/core';
import { STRIPS } from '../mock-strips';

@Component({
  selector: 'app-strips',
  templateUrl: './strips.component.html',
  styleUrls: ['./strips.component.scss']
})
export class StripsComponent implements OnInit {
  PAGE_INDEX = 0;
  PAGE_SIZE = 2;
  strips;
  lastStrip = false;
  displayReversed = true;

  constructor() { }

  async ngOnInit() {
    this.strips = await this.getData();
  }

  async getData() {
    if (this.displayReversed) {
      return STRIPS.reverse().slice(this.PAGE_INDEX * this.PAGE_SIZE, (this.PAGE_INDEX + 1) * this.PAGE_SIZE);
    } else {
      return STRIPS.slice(this.PAGE_INDEX * this.PAGE_SIZE, (this.PAGE_INDEX + 1) * this.PAGE_SIZE);
    }
  }

  async loadNext() {
    this.PAGE_INDEX++;
    const data = await this.getData();
    if (data.length < this.PAGE_SIZE) {
      this.lastStrip = true;
    }
    this.strips = [...this.strips, ...data];
  }
}
