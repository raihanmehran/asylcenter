import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
      firstName: ['', Validators.required],
      lastName: [],
      dateOfBirth: ['', Validators.required],
      country: ['', Validators.required],
      idNumber: ['', Validators.required],
      address: [],
      gender: ['male'],
    });
  }

  // custom validator for confirm password but here I don't use it
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value
        ? null
        : { notMatching: true };
    };
  }

  register() {
    if (this.registerForm.valid) {
      const dob = this.getDateOnly(
        this.registerForm.controls['dateOfBirth'].value
      );
      const values = { ...this.registerForm.value, dateOfBirth: dob };

      this.accountService.register(values).subscribe({
        next: () => {
          this.router.navigateByUrl('/users');
          this.toastr.info('New user registerd');
        },
        error: (error) => {
          this.validationErrors = error;
        },
      });
    } else {
      this.toastr.error('Please solve the issues before registration!');
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  private getDateOnly(dateOfBirth: string | undefined) {
    if (!dateOfBirth) return;

    let theDob = new Date(dateOfBirth);

    return new Date(
      theDob.setMinutes(theDob.getMinutes() - theDob.getTimezoneOffset())
    )
      .toISOString()
      .slice(0, 10);
  }
}
