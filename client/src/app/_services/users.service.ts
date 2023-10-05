import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedUser } from '../_models/loggedUser';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = environment.apiUrl;
  users: User[] = [];
  usersCache = new Map();
  loggedUser: LoggedUser | undefined;
  userParams: UserParams | undefined;

  private usersSource = new BehaviorSubject<User[] | null>(null);
  users$ = this.usersSource.asObservable();

  private paginationSource = new BehaviorSubject<Pagination | null>(null);
  pagination$ = this.paginationSource.asObservable();

  pagination: Pagination | undefined;

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (loggedUser) => {
        if (loggedUser) {
          this.userParams = new UserParams(loggedUser);
          this.loggedUser = loggedUser;
        }
      },
    });
  }

  registerUser(model: any) {
    if (this.loggedUser) {
      this.accountService
        .register(model, this.loggedUser)
        .pipe()
        .subscribe({
          next: (registeredUser: any) => {
            this.toastr.success('New User Registered', 'Success');
            this.router.navigateByUrl('/users');
            if (true) {
              // this.users$.subscribe({
              //   next: (users) => {
              //     if (users) {
              //       if (!users.includes(user)) {
              //         users.push(user);
              //         this.usersSource.next(users);
              //       }
              //     }
              //   },
              // });
              this.toastr.success('New User Registered', 'Success');
              this.router.navigateByUrl('/users');
            }
          },
          // error: (error) => this.toastr.error(error.error, 'Error'),
        });
    }
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    if (this.loggedUser) {
      this.userParams = new UserParams(this.loggedUser);
      return this.userParams;
    }
    return;
  }

  getUsers(userParams: UserParams) {
    const response = this.usersCache.get(Object.values(userParams).join('-'));
    console.log(userParams);

    // if (response) return of(response);
    if (response) {
      this.usersSource.next(response.result);
      this.paginationSource.next(response.pagination);
      return of(response);
    }

    console.log('getting users');

    let params = this.getPaginationHeader(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return this.getPaginatedResult<User[]>(this.baseUrl + 'users', params).pipe(
      map((response) => {
        this.usersCache.set(Object.values(userParams).join('-'), response);
        this.usersSource.next(response.result as User[]);
        this.paginationSource.next(response.pagination as Pagination);
        return response;
      })
    );
  }

  private getPaginationHeader(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);

    return params;
  }

  getUser(username: string) {
    const user = [...this.usersCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((user: User) => user.userName === username);

    if (user) return of(user);

    return this.http.get<User>(this.baseUrl + 'users/' + username);
  }

  getAllUsers() {
    return this.http
      .get<User[]>(this.baseUrl + 'users/all')
      .pipe(map((response) => response));
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

  private getPaginatedResult<T>(url: string, params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map((response) => {
        if (response.body) {
          paginatedResult.result = response.body;
        }

        const pagination = response.headers.get('Pagination');

        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }

        return paginatedResult;
      })
    );
  }
}
