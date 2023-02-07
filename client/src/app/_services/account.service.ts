import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://localhost:1001/api/';
  private currentuserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentuserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentuserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentuserSource.next(user);
  }
  logout() {
    localStorage.removeItem('user');
  }
}
