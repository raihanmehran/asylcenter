import { Injectable } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  contactDeveloper(model: any) {
    return this.http.post(this.baseUrl + 'contact', model);
  }
}
