import { Component, OnInit } from '@angular/core';
import { LoggedUser } from './_models/loggedUser';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Mit Asylcenter';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: LoggedUser = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
