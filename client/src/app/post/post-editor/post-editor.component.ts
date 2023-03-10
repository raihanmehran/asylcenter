import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { LoggedUser } from 'src/app/_models/loggedUser';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { PostService } from 'src/app/_services/post.service';
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

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private accountService: AccountService,
    private userService: UsersService,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchLoggedUser();
    this.fetchAllUsers();
    this.getUser();
  }

  initializeForm() {
    this.postForm = this.fb.group({
      appUserId: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(12),
        ],
      ],
      title: ['', Validators.required],
      description: ['', Validators.maxLength(5000)],
    });
  }

  addPost() {
    if (this.postForm.valid) {
      if (this.user) {
        const values = { ...this.postForm.value, appUserId: this.user.id };

        this.postService.addPost(values).subscribe({
          next: () => {
            this.toastr.success(
              'Post Added Successfully to: ' +
                this.user?.firstName +
                ' with title: ' +
                values.title
            );
            this.initializeForm();
          },
          error: (error) => {
            this.toastr.error(error.error);
          },
        });
      }
    }
  }

  getUser() {
    this.getSearchId();
  }

  private getSearchId() {
    this.postForm.controls['appUserId'].valueChanges.subscribe({
      next: (value) => {
        if (this.validateUserId()) {
          this.username = value;
          this.fetchUser();
        }
      },
      error: (error) => {
        this.toastr.error(error.error);
      },
    });
  }

  fetchUser() {
    if (this.users && this.username) {
      const user = this.users.find(
        (user: User) => user.userName === this.username
      );

      if (user) this.user = user;
      else this.user = undefined;
    }
  }

  fetchLoggedUser() {
    this.accountService.currentUser$.subscribe({
      next: (loggedUser) => {
        if (loggedUser) {
          this.loggedUser = loggedUser;
        }
      },
      error: (error) => {
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

  cancel() {
    this.router.navigateByUrl('admin');
  }

  resetForm() {
    this.user = undefined;
    this.postForm.controls['appUserId'].setValue('');
    this.postForm.controls['title'].setValue('');
    this.postForm.controls['description'].setValue('');
  }
}
