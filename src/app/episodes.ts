import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div *ngIf="episodes$ | async as episodes; else loadingTemplate">
      <div class="episode-grid">
        <div class="episode-card" *ngFor="let episode of episodes">
          <h2>{{ episode.name }}</h2>
          <p><strong>Air Date:</strong> {{ episode.air_date }}</p>
          <p><strong>Episode Code:</strong> {{ episode.episode }}</p>
        </div>
      </div>
    </div>
    <ng-template #loadingTemplate>
      <div class="loading-container">
        <img src="assets/loading.gif" alt="Loading..." /> 
        <p>Loading episodes...</p>
      </div>
    </ng-template>
  `,
  styles: [
    `
      /* Grid Layout for Episodes */
      .episode-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        padding: 16px;
      }

      /* Episode Card Styling */
      .episode-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        text-align: center;
      }

      .episode-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      .episode-card h2 {
        color: #007bff;
        margin-bottom: 8px;
      }

      .episode-card p {
        margin: 4px 0;
        font-size: 0.9rem;
        color: #555;
      }

      .episode-card p strong {
        color: #000;
      }

      /* Loading State */
      .loading-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin-top: 50px;
      }

      .loading-container img {
        width: 50px;
        height: 50px;
        margin-bottom: 16px;
      }

      .loading-container p {
        font-size: 1.2rem;
        color: #007bff;
      }
    `,
  ],
})
export class EpisodesComponent implements OnInit {
  episodes$!: Observable<any[]>;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.episodes$ = this.apiService.getEpisodes();
  }
}
