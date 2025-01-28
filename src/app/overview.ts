import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div *ngIf="loading" class="loading-bar-container">
      <div class="loading-bar"></div>
    </div>

    <div *ngIf="characters$ | async as characters">
      <div class="character-grid">
        <div class="character-card" *ngFor="let character of characters">
          <a [routerLink]="['/details', character.id]">
            <img [src]="character.image" [alt]="character.name" />
            <p>{{ character.name }}</p>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .character-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 16px;
        padding: 16px;
      }

      .character-card {
        text-align: center;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 8px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        text-decoration: none;
      }

      .character-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      .character-card img {
        width: 100%;
        height: auto;
        border-radius: 8px;
      }

      .character-card p {
        margin-top: 8px;
        font-size: 1rem;
        color: #333;
      }

      .character-card a {
        text-decoration: none;
        color: inherit;
      }

      /* Loading Bar Container */
      .loading-bar-container {
        position: relative;
        height: 5px;
        background-color: #f0f0f0;
        margin-bottom: 16px;
        overflow: hidden;
      }

      /* Loading Bar Animation */
      .loading-bar {
        width: 0;
        height: 100%;
        background-color: #007bff;
        animation: loadingAnimation 2s linear infinite;
      }

      @keyframes loadingAnimation {
        0% {
          width: 0;
        }
        100% {
          width: 100%;
        }
      }
    `,
  ],
})
export class OverviewComponent implements OnInit {
  characters$!: Observable<any[]>;
  loading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.characters$ = this.apiService.getEntries().pipe(
      finalize(() => (this.loading = false))
    );
  }
}
