import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  tempPosts: Post[] | undefined;
  searchedPosts: Post[] | undefined;
  searchIdNumber: string = '';

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.initializeForm();
    this.fetchAllPosts();
    this.getSearchId();
  }

  initializeForm() {
    this.searchForm = this.fb.group({
      idNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12),
        ],
      ],
    });
  }

  collectPost($event: Post) {
    if (this.posts) {
      $event.isCollected = true;
      const post = $event;

      this.postService.collectPost(post).subscribe({
        next: (_) => {
          this.posts = this.posts?.filter((p) => p !== post);
          this.toastr.success('Post has collected');
        },
        error: (error) => {
          this.toastr.error(error.error);
        },
      });
    }
  }
  deletePost($event: Post) {
    if (this.posts) {
      const post = $event;
      const postId = post.id;

      this.postService.deletePost(postId).subscribe({
        next: (_) => {
          this.posts = this.posts?.filter((p) => p !== post);
          this.toastr.success('Post has deleted');
        },
        error: (error) => {
          this.toastr.error(error.error);
        },
      });
    }
  }

  getSearchId() {
    this.searchForm.controls['idNumber'].valueChanges.subscribe({
      next: (value) => {
        this.searchInputHasValue();
        if (this.validateSearchInput()) {
          this.searchIdNumber = value;
          this.fetchPost();
        }
      },
    });
  }

  fetchPost() {
    if (this.posts && this.searchIdNumber) {
      const post: Post[] = this.posts.filter(
        (post: Post) => post.idNumber === this.searchIdNumber
      );

      if (post) this.searchedPosts = post;
      else this.searchedPosts = undefined;
    }
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

  searchInputHasValue() {
    const value = this.searchForm.controls['idNumber'].value;
    console.log('Value: ' + value);

    if (value) return true;
    return false;
  }

  public validateSearchInput() {
    return this.searchForm.controls['idNumber'].valid.valueOf();
  }
}
