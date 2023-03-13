import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Events } from '../_models/events';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  baseUrl = environment.apiUrl;
  events: Events[] = [];

  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http
      .get<Events[]>(this.baseUrl + 'event')
      .pipe(map((response) => response));
  }

  addEvent(model: any) {
    return this.http
      .post(this.baseUrl + 'event/add', model)
      .pipe(map((response) => response));
  }
}
