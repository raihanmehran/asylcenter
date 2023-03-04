import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css'],
})
export class PostEditorComponent implements OnInit {
  postForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  a: any;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {}
  ngOnInit(): void {
    this.initializeForm();
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
          Validators.pattern('^[0-9]*$'),
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
    this.postForm.controls['appUserId'].valueChanges.subscribe({
      next: (value) => {
        console.log('ID:  ' + value);
        if (this.validateUserId()) {
          console.log('I am here');
        }
      },
    });
  }

  private validateUserId() {
    return !this.postForm.controls['appUserId'].invalid.valueOf();
  }
}
