import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { LoggedUser } from '../_models/loggedUser';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://localhost:1001/api/';
  private currentuserSource = new BehaviorSubject<LoggedUser | null>(null);
  currentUser$ = this.currentuserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http
      .post<LoggedUser>(this.baseUrl + 'account/login', model)
      .pipe(
        map((response: LoggedUser) => {
          const user = response;
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentuserSource.next(user);
          }
          return user;
        })
      );
  }

  register(model: any) {
    return this.http
      .post<LoggedUser>(this.baseUrl + 'account/register', model)
      .pipe(
        map((user) => {
          if (user) {
            // auto user login removed
            // localStorage.setItem('user', JSON.stringify(user));
            // this.currentuserSource.next(user);
            console.log(user);
          }
          return user;
        })
      );
  }

  setCurrentUser(user: LoggedUser) {
    this.currentuserSource.next(user);
  }
  logout() {
    localStorage.removeItem('user');
    this.currentuserSource.next(null);
  }
}
