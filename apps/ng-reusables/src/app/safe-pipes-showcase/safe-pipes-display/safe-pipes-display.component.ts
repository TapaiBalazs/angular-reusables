import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'btp-safe-pipes-display',
  templateUrl: './safe-pipes-display.component.html',
  styleUrls: ['./safe-pipes-display.component.css']
})
export class SafePipesDisplayComponent implements OnInit {

  injection = `<span class="pink">You see?</span> It works.`

  constructor() { }

  ngOnInit(): void {
  }

}
