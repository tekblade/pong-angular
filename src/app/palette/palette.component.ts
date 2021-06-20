import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css']
})
export class PaletteComponent implements OnInit {
  @Input() distance: number;
  topMargin=100;

  constructor() { }

  ngOnInit(): void {

  }

}
