import { Component, OnInit } from '@angular/core';
import { images } from 'src/app/utils/images';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  images = images;
  constructor() { }

  ngOnInit(): void {
  }
}
