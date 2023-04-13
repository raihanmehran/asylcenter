import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedUser } from '../_models/loggedUser';
import { User } from '../_models/user';
import { DashboardService } from './dashboard.service';
import { PresenceService } from './presence.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentuserSource = new BehaviorSubject<LoggedUser | null>(null);
  currentUser$ = this.currentuserSource.asObservable();

  constructor(
    private http: HttpClient,
    private presenceService: PresenceService,
    private dashboardService: DashboardService
  ) {}

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

  register(model: any, user: LoggedUser) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((registeredUser) => {
        this.dashboardService.createHubConnection(user);
        return registeredUser;
      })
    );
  }

  setCurrentUser(user: LoggedUser) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentuserSource.next(user);
    this.presenceService.createHubConnection(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentuserSource.next(null);
    this.presenceService.stopHubConnection();
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
