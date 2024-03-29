import { HttpClient } from '@angular/common/http';
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
      map(() => {
        return;
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

  getLikeFeedbackUsers(eventId: number) {
    return this.http
      .get(this.baseUrl + 'event/get-like-feedback/' + eventId)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getInterestFeedbackUsers(eventId: number) {
    return this.http
      .get(this.baseUrl + 'event/get-interest-feedback/' + eventId)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getCommentFeedbackUsers(eventId: number) {
    return this.http
      .get(this.baseUrl + 'event/get-comment-feedback/' + eventId)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
