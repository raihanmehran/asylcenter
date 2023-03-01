import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { LoggedUser } from 'src/app/_models/loggedUser';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  // users$: Observable<User[]> | undefined;
  users: User[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];

  constructor(private usersService: UsersService) {
    this.userParams = this.usersService.getUserParams();
  }

  ngOnInit(): void {
    // this.users$ = this.usersService.getUsers();
    this.loadUsers();
  }

  loadUsers() {
    if (this.userParams) {
      this.usersService.setUserParams(this.userParams);
      this.usersService.getUsers(this.userParams).subscribe({
        next: (response) => {
          if (response.result && response.pagination) {
            this.users = response.result;
            this.pagination = response.pagination;
          }
        },
      });
    }
  }

  resetFilter() {
    this.userParams = this.usersService.resetUserParams();
    this.loadUsers();
  }

  pageChanged(event: any) {
    if (this.userParams && this.userParams.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
      this.usersService.setUserParams(this.userParams);
      this.loadUsers();
    }
  }
}
