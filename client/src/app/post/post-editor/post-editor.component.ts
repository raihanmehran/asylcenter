import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { LoggedUser } from 'src/app/_models/loggedUser';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css'],
})
export class PostEditorComponent implements OnInit {
  postForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  user: User | undefined;
  loggedUser: LoggedUser | undefined;
  username: string = '';
  users: User[] | undefined;

  a: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private accountService: AccountService,
    private userService: UsersService
  ) {}
  ngOnInit(): void {
    this.initializeForm();
    this.fetchLoggedUser();
    this.fetchAllUsers();
    this.getUser();
  }

  addPost() {
    console.log('Add Post method called');
  }

  initializeForm() {
    this.postForm = this.fb.group({
      appUserId: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
        ],
      ],
      title: ['', Validators.required],
      description: ['', Validators.maxLength(5000)],
      addedBy: ['', Validators.required],
    });
  }

  getUser() {
    this.getSearchId();
  }

  private getSearchId() {
    this.postForm.controls['appUserId'].valueChanges.subscribe({
      next: (value) => {
        console.log('ID:  ' + value + ' ' + this.validateUserId());

        if (this.validateUserId()) {
          this.username = value;
          console.log(this.username);
          this.fetchUser();
          console.log('after');
          console.log(this.user);
        }
      },
      error: (error) => {
        this.toastr.error(error.error);
      },
    });
  }

  fetchUser() {
    
  }

  // the above function is used for optimization
  // fetchUser() {
  //   this.userService
  //     .getUser(this.username)
  //     .pipe(take(1))
  //     .subscribe({
  //       next: (user) => {
  //         console.log('Fetch User:');

  //         console.log(user);

  //         this.user = undefined;

  //         if (user) {
  //           console.log('In');

  //           this.user = user;
  //           console.log(this.user);
  //         }
  //       },
  //       error: (error) => {
  //         console.log(error);
  //         this.toastr.error(error.error);
  //       },
  //     });
  // }

  fetchLoggedUser() {
    this.accountService.currentUser$.subscribe({
      next: (loggedUser) => {
        if (loggedUser) {
          this.loggedUser = loggedUser;
        }
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error);
      },
    });
  }

  fetchAllUsers() {
    this.userService
      .getAllUsers()
      .pipe()
      .subscribe({
        next: (users) => {
          if (users) {
            this.users = users;
          }
        },
        error: (error) => {
          this.toastr.error(error.error);
        },
      });
  }

  public validateUserId() {
    return this.postForm.controls['appUserId'].valid.valueOf();
  }
}
