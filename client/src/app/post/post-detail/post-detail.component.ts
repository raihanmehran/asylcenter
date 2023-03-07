import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Post } from 'src/app/_models/post';
import { PostService } from 'src/app/_services/post.service';
import { ReadService } from 'src/app/_services/read.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;
  id: number | undefined;
  isTranslate: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private readService: ReadService
  ) {
    this.getIdFromRoute();
  }
  ngOnInit(): void {
    this.getPost();
    this.isTranslate = false;
  }

  getIdFromRoute() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  getPost() {
    if (this.id) {
      this.postService
        .getPost(this.id)
        .pipe(take(1))
        .subscribe({
          next: (post) => {
            this.post = post;
          },
        });
    }
  }

  translate() {
    this.isTranslate = true;
  }

  deTranslate() {
    this.isTranslate = false;
  }

  readTitle() {
    this.read(this.post?.title as string);
  }
  readDescription() {
    this.read(this.post?.description as string);
  }

  read(text: string) {
    if (text) this.readService.read(text);
  }
}
