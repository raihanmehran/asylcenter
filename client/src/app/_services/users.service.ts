import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = environment.apiUrl;
  users: User[] = [];
  paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

  constructor(private http: HttpClient) {}

  getUsers(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<User[]>(this.baseUrl + 'users', { observe: 'response', params })
      .pipe(
        map((response) => {
          if (response.body) {
            this.paginatedResult.result = response.body;
          }

          const pagination = response.headers.get('Pagination');

          if (pagination) {
            this.paginatedResult.pagination = JSON.parse(pagination);
          }

          return this.paginatedResult;
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

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
