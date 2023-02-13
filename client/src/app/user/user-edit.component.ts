import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { LoggedUser } from '../_models/loggedUser';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  user: User | undefined;
  loggedUser: LoggedUser | null = null;

  constructor(
    private accountService: AccountService,
    private userService: UsersService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (loggedUser) => (this.loggedUser = loggedUser),
    });
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    if (!this.loggedUser) return;

    this.userService.getUser(this.loggedUser.username).subscribe({
      next: (user) => (this.user = user),
    });
  }
}
