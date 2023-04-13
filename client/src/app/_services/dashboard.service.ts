import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedUser } from '../_models/loggedUser';
import { UsersByRoleAndMonth } from '../_models/usersByRoleAndMonth';

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
    admins: UsersByRoleAndMonth[]
  ) {
    this.memberUsersSource.next(members);
    this.moderatorUsersSource.next(moderators);
    this.adminUsersSource.next(admins);
  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}
