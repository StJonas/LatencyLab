import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/api';  

  constructor(private http: HttpClient) {}

  getEntries(): Observable<any[]> {
    const pages = [1, 2, 3, 4, 5, 6];
    const requests = pages.map((page) =>
      this.http.get<any>(`${this.apiUrl}/character?page=${page}`)
    );
  
    return forkJoin(requests).pipe(
      map((responses) =>
        responses.map((response) => response.results).flat()
      ),
      delay(2000)
    );
  }

  getCharacterById(id: string | null): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/character/${id}`).pipe(
      delay(2000) 
    );
  }

  getLocations(): Observable<any[]> {
    const pages = [1, 2, 3, 4, 5, 6];
    const requests = pages.map((page) =>
      this.http.get<any>(`${this.apiUrl}/location?page=${page}`)
    );
  
    return forkJoin(requests).pipe(
      map((responses) =>
        responses.map((response) => response.results).flat()
      ),
      delay(2000) 
    );
  }

  getEpisodes(): Observable<any[]> {
    const pages = [1, 2, 3];
    const requests = pages.map(() =>
      this.http.get<any>(`${this.apiUrl}/episode`)
    );
    
    return forkJoin(requests).pipe(
      map((responses) =>
        responses.map((response) => response.results).flat() 
      ),
      delay(2000)
    );
  }
 }