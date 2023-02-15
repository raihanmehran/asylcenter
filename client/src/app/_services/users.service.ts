import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = environment.apiUrl;
  users: User[] = [];

  constructor(private http: HttpClient) {}

  getUsers() {
    if (this.users.length > 0) return of(this.users);
    return this.http.get<User[]>(this.baseUrl + 'users').pipe(
      map((users) => {
        this.users = users;
        return users;
      })
    );
  }

  getUser(username: string) {
    const user = this.users.find((u) => u.userName === username);
    if (user) return of(user);
    return this.http.get<User>(this.baseUrl + 'users/' + username);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + 'users', user).pipe(
      map(() => {
        const index = this.users.indexOf(user);
        this.users[index] = { ...this.users[index], ...user };
      })
    );
  }
}
