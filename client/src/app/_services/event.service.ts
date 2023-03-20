import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventFeedback } from '../_models/eventFeedback';
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

  deleteEvent(eventId: number) {
    return this.http
      .delete(this.baseUrl + 'event/delete-event/' + eventId)
      .pipe(
        map((_) => {
          return;
        })
      );
  }

  addFeedback(model: any) {
    return this.http.post(this.baseUrl + 'feedback/add-feedback', model).pipe(
      map((response) => {
        return response;
      })
    );
  }

  deleteFeedback(feedbackId: number) {
    return this.http
      .delete(this.baseUrl + 'feedback/remove-feedback/' + feedbackId)
      .pipe(
        map((_) => {
          return;
        })
      );
  }
}
