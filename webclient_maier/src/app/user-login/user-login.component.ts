import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: '[app-user-login]:not(p)',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  
}
