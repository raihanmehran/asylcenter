import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  // users$: Observable<User[]> | undefined;
  users: User[] = []
  pagination: Pagination | undefined
  pageNumber = 1
  pageSize=5

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    // this.users$ = this.usersService.getUsers();
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsers(this.pageNumber, this.pageSize).subscribe({
      next: response => {
        if(response.result && response.pagination){
          this.users = response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }


}
