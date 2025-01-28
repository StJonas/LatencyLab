import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], 
  template: `
    <nav>
      <a routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{ exact: true }">Episodes</a>
      <a routerLink="/characters" routerLinkActive="active-link">Characters</a>
      <a routerLink="/locations" routerLinkActive="active-link">Locations</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      nav {
        display: flex;
        justify-content: center;
        gap: 20px;
        padding: 16px;
        background-color:rgb(31, 134, 2);
      }

      nav a {
        font-size: 1.5rem;
        color: white;
        text-decoration: none;
        font-weight: bold;
        padding: 8px 16px;
        border-radius: 5px;
        transition: background-color 0.3s ease;
      }

      nav a:hover {
        background-color: rgb(23, 106, 0);
      }

      nav a.active-link {
        background-color: rgb(23, 106, 0);
        color: white;
        font-weight: bold;
      }
    `,
  ],
})

export class AppComponent {}
