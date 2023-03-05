import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/_models/post';
import { PostService } from 'src/app/_services/post.service';

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

  constructor(private fb: FormBuilder, private postService: PostService) {}
  ngOnInit(): void {
    this.initializeForm();
    this.fetchAllPosts();
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

  fetchAllPosts() {
    this.postService.getNotCollectedPosts().subscribe({
      next: (posts) => {
        if (posts) {
          this.posts = posts;
        }
      },
    });
  }
}
