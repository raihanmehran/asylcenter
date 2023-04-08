import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AdminService } from 'src/app/_services/admin.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  passwordForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  user: User | undefined;
  IsPasswordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private userService: UsersService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.passwordForm = this.fb.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16),
        ],
      ],
    });
  }

  resetPassword() {
    if (this.passwordForm.invalid) {
      this.toastr.warning('Please fill in the blanks', 'Validation');
    } else if (!this.user) {
      this.toastr.warning('Please search a user', 'User Required');
    } else {
      const values = this.passwordForm.value;
      this.adminService.resetUserPassword(values).subscribe({
        next: (_) => {
          this.toastr.success('Password updated successfully!', 'Success');
          this.router.navigateByUrl('/admin');
        },
        error: (error) => this.toastr.error(error.error, 'ERROR!'),
      });
    }
  }

  showPassword() {
    this.IsPasswordVisible = !this.IsPasswordVisible;
  }

  getUser(event: Event) {
    event.preventDefault();
    if (this.passwordForm.controls['username'].valid) {
      const username = this.passwordForm.controls['username'].value;
      this.userService
        .getUser(username)
        .pipe(take(1))
        .subscribe({
          next: (user) => {
            if (user) {
              this.user = user;
            }
          },
          error: (error) => this.toastr.error(error.error),
        });
    }
  }

  cancel(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/admin');
  }
}
