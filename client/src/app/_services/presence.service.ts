import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection } from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedUser } from '../_models/loggedUser';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;
  private onlineUserSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUserSource.asObservable();
  loggedUser: LoggedUser | undefined;

  constructor(private toastr: ToastrService, private router: Router) {}

  createHubConnection(user: LoggedUser) {
    this.loggedUser = user;
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => console.log(error));

    this.hubConnection.on('UserIsOnline', (username) => {
      this.onlineUsers$.pipe(take(1)).subscribe({
        next: (usernames) =>
          this.onlineUserSource.next([...usernames, username]),
      });

      var isAdmin = this.isAdmin();
      if (isAdmin) {
        this.toastr.info(username + ' has Connected');
      }
    });

    this.hubConnection.on('UserIsOffline', (username) => {
      this.onlineUsers$.pipe(take(1)).subscribe({
        next: (usernames) =>
          this.onlineUserSource.next(usernames.filter((u) => u !== username)),
      });
      var isAdmin = this.isAdmin();
      if (isAdmin) {
        this.toastr.warning(username + ' has disconnected');
      }
    });

    this.hubConnection.on('GetOnlineUsers', (usernames) => {
      this.onlineUserSource.next(usernames);
    });

    this.hubConnection.on(
      'NewMessageReceived',
      ({ idNumber, firstName, postId }) => {
        console.log('Done' + idNumber);

        this.toastr
          .success(firstName + ' has got a post!')
          .onTap.pipe(take(1))
          .subscribe({
            next: () => this.router.navigateByUrl('/post/list/' + postId),
          });
      }
    );
  }

  private isAdmin(): boolean {
    let isAdmin = false;
    if (this.loggedUser && this.loggedUser.roles.includes('Admin')) {
      isAdmin = true;
    }
    return isAdmin;
  }

  stopHubConnection() {
    this.hubConnection?.stop().catch((error) => console.log(error));
  }
}
