import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/_models/post';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.css'],
})
export class SearchPostComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  posts: Post[] | undefined;
  searchedPost: Post | undefined;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.searchForm = this.fb.group({
      appUserId: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(12),
        ],
      ],
    });
  }
}
