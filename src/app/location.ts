import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div>
      <div *ngIf="locations$ | async as locations; else loadingTemplate">
        <div class="location-grid">
          <div class="card" *ngFor="let location of locations">
            <h2>{{ location.name }}</h2>
            <p><strong>Type:</strong> {{ location.type }}</p>
            <p><strong>Dimension:</strong> {{ location.dimension }}</p>
          </div>
        </div>
      </div>
      <ng-template #loadingTemplate>
        <div class="location-grid">
          <!-- Preloading cards with loading GIFs -->
          <div class="card placeholder" *ngFor="let placeholder of placeholders">
            <img src="assets/fading.gif" alt="Loading..." class="loading-gif" />
          </div>
        </div>
      </ng-template>
    </div>

  `,
  styles: [
    `
      /* General Layout */
      .location-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        padding: 16px;
      }

      /* Card Styling */
      .card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      .card:hover {
        transform: translateY(0px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      .card img.loading-gif {
        width: 120px;
        height: 40px;
      }

      /* Placeholder Styling */
      .card.placeholder {
        background-color: #f9f9f9;
        border: 1px dashed #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        display: flex; /* Center content only in loading state */
        justify-content: center;
        align-items: center;
        height: 120px;
      }

      .card h2 {
        color: #007bff;
        margin-bottom: 8px;
      }

      .card p {
        margin: 4px 0;
        font-size: 0.9rem;
        color: #555;
      }

      /* Loading and Button */
      .loader {
        width: 100%;
        text-align: center;
        font-size: 1.2rem;
        color: #007bff;
        margin-bottom: 16px;
      }

      .btn {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-bottom: 16px;
      }

      .btn:hover {
        background-color: #0056b3;
      }

      .btn:disabled {
        background-color: #d6d6d6;
        cursor: not-allowed;
      }
    `,
  ],
})
export class LocationComponent implements OnInit {
  locations$!: Observable<any>;
  placeholders = Array(80).fill(null); 

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.locations$ = this.apiService.getLocations();
  }
}
