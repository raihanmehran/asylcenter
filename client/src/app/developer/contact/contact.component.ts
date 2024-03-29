import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/app/_services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(2000)]],
    });
  }

  contactDeveloper() {
    if (this.contactForm.invalid) {
      this.toastr.warning('Entered input is invalid!', 'Validation');
    } else {
      this.contactService.contactDeveloper(this.contactForm.value);
      this.initializeForm();
    }
  }
}
