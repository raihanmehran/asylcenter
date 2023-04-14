import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedUser } from '../_models/loggedUser';
import { UsersByRoleAndMonth } from '../_models/usersByRoleAndMonth';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;

  private memberUsersSource = new BehaviorSubject<UsersByRoleAndMonth[]>([]);
  memberUsers$ = this.memberUsersSource.asObservable();

  private moderatorUsersSource = new BehaviorSubject<UsersByRoleAndMonth[]>([]);
  moderatorUsers$ = this.moderatorUsersSource.asObservable();

  private adminUsersSource = new BehaviorSubject<UsersByRoleAndMonth[]>([]);
  adminUsers$ = this.adminUsersSource.asObservable();

  private membersDataSource = new BehaviorSubject<number[]>([]);
  membersData$ = this.membersDataSource.asObservable();

  private moderatorsDataSource = new BehaviorSubject<number[]>([]);
  moderatorsData$ = this.moderatorsDataSource.asObservable();

  private adminsDataSource = new BehaviorSubject<number[]>([]);
  adminsData$ = this.adminsDataSource.asObservable();

  private postsCountSource = new BehaviorSubject<number>(0);
  postsCount$ = this.postsCountSource.asObservable();

  private eventsCountSource = new BehaviorSubject<number>(0);
  eventsCount$ = this.eventsCountSource.asObservable();

  constructor() {}

  createHubConnection(user: LoggedUser) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'dashboard', {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .catch((err) =>
        console.log('Error while starting SignalR hub connection: ' + err)
      );

    this.hubConnection.on(
      'GetDashboardUsers',
      this.handleIncomingData.bind(this)
    );
  }

  handleIncomingData(
    members: UsersByRoleAndMonth[],
    moderators: UsersByRoleAndMonth[],
    admins: UsersByRoleAndMonth[],
    postsCount: number,
    eventsCount: number
  ) {
    this.memberUsersSource.next(members);
    this.moderatorUsersSource.next(moderators);
    this.adminUsersSource.next(admins);
    this.postsCountSource.next(postsCount);
    this.eventsCountSource.next(eventsCount);
  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

  public static createConnection(user: LoggedUser) {
    this.createConnection(user);
  }

  calculateData() {
    this.memberUsers$.subscribe({
      next: (users) => {
        if (users.length > 0) {
          const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          for (let i = 0; i < users.length; i++) {
            for (let j = 0; j < 12; j++) {
              if (j === users[i].month) {
                data[j] = users[i].count;
              }
            }
          }
          this.membersDataSource.next(data);
        }
      },
    });

    this.moderatorUsers$.subscribe({
      next: (users) => {
        if (users.length > 0) {
          const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          for (let i = 0; i < users.length; i++) {
            for (let j = 0; j < 12; j++) {
              if (j === users[i].month) {
                data[j] = users[i].count;
              }
            }
          }
          this.moderatorsDataSource.next(data);
        }
      },
    });

    this.adminUsers$.subscribe({
      next: (users) => {
        if (users.length > 0) {
          const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          for (let i = 0; i < users.length; i++) {
            for (let j = 0; j < 12; j++) {
              if (j === users[i].month) {
                data[j] = users[i].count;
              }
            }
          }
          this.adminsDataSource.next(data);
        }
      },
    });
  }
}
