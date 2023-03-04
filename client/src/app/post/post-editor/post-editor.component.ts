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

  constructor(private fb: FormBuilder, private toastr: ToastrService) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  addPost() {
    console.log('Add Post method called');
  }

  initializeForm() {
    this.postForm = this.fb.group({
      appUserId: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      addedBy: ['', Validators.required],
    });
  }
}
