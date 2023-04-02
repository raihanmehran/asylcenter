import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { LoggedUser } from '../_models/loggedUser';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;

  constructor(private toastr: ToastrService) {}

  createHubConnection(user: LoggedUser) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => console.log(error));
    console.log('hello');

    this.hubConnection.on('UserIsOnline', (username) => {
      this.toastr.info(username + ' has connected');
    });

    this.hubConnection.on('UserIsOffline', (username) => {
      this.toastr.warning(username + ' has disconnected');
    });
  }

  stopHubConnection() {
    this.hubConnection?.stop().catch((error) => console.log(error));
  }
}
