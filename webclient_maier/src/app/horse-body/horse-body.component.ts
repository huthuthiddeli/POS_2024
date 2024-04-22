import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[app-horse-body]',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './horse-body.component.html',
  styleUrl: './horse-body.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HorseBodyComponent {

}
