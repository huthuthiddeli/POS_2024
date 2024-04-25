// not-found.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
    </div>
  `,
  standalone: true,
  styles: [`
    .not-found {
      text-align: center;
      margin-top: 50px;
    }

    h1 {
      font-size: 36px;
      color: #333;
    }

    p {
      font-size: 18px;
      color: #666;
    }
  `]
})
export class NotFoundComponent {}
