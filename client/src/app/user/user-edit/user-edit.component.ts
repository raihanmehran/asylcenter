import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  @ViewChild('editForm') editForm: NgForm | undefined;
  user: User | undefined;
  loggedUser: LoggedUser | null = null;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService,
    private userService: UsersService,
    private toastr: ToastrService
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

  updateUser() {
    this.userService.updateUser(this.editForm?.value).subscribe({
      next: (_) => {
        this.toastr.success('Profile update successfully');
        this.editForm?.reset(this.user);
      },
    });
  }
}
