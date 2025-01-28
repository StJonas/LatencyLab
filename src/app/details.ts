import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="details-container" *ngIf="character$ | async as character; else loading">
    <div class="character-card">
      <img
        [src]="character.image"
        [alt]="character.name"
        (load)="onImageLoad()"
        [class.loading]="isLoadingImage"
      />
      <div class="character-info">
        <h1>{{ character.name }}</h1>
        <p><strong>Status:</strong> {{ character.status }}</p>
        <p><strong>Species:</strong> {{ character.species }}</p>
        <p><strong>Gender:</strong> {{ character.gender }}</p>
      </div>
    </div>
  </div>
  <ng-template #loading>
    <p class="loading-message">Loading character...</p>
  </ng-template>
  `,
  styles: [
    `
      .details-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
      }

      .character-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        border: 1px solid #ddd;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        background-color: #fff;
        padding: 20px;
        max-width: 400px;
        width: 100%;
      }

      .character-card img {
        width: 100%;
        max-width: 200px;
        height: auto;
        border-radius: 50%;
        margin-bottom: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .character-card img.loading {
        filter: blur(10px);
      }

      .character-card h1 {
        font-size: 1.8rem;
        color: #333;
        margin-bottom: 10px;
      }

      .character-card p {
        font-size: 1rem;
        color: #555;
        margin: 5px 0;
      }

      .character-card p strong {
        color: #000;
      }

      .loading-message {
        text-align: center;
        font-size: 1.2rem;
        color: #007bff;
      }
    `,
  ],
})
export class DetailsComponent implements OnInit {
  character$!: Observable<any>;
  isLoadingImage: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.character$ = this.apiService.getCharacterById(id);
  }

  onImageLoad() {
    this.isLoadingImage = false;
  }
}
