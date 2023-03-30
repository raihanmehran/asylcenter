import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedUser } from '../_models/loggedUser';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
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
            this.setCurrentUser(user);
          }
          return user;
        })
      );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((response) => {
        if (response) {
          // auto user login removed
          // this.setCurrentUser(user);
          console.log(response);
        }
      })
    );
  }

  setCurrentUser(user: LoggedUser) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentuserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentuserSource.next(null);
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
