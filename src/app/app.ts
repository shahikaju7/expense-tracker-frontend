import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav style="background: #1e293b; padding: 0 24px; height: 60px;
      display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 24px;">💰</span>
        <span style="color: white; font-size: 18px; font-weight: 700;">
          ExpenseAI
        </span>
      </div>
      <div style="display: flex; gap: 8px;">
        <a routerLink="/" style="color: #94a3b8; text-decoration: none;
          padding: 6px 14px; border-radius: 6px; font-size: 14px;">
          Dashboard
        </a>
        <a routerLink="/upload" style="color: #94a3b8; text-decoration: none;
          padding: 6px 14px; border-radius: 6px; font-size: 14px;">
          Upload Receipt
        </a>
        <a routerLink="/stats" style="color: #94a3b8; text-decoration: none;
          padding: 6px 14px; border-radius: 6px; font-size: 14px;">
          Stats
        </a>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class App {
  title = 'expense-tracker-frontend';
}