import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Post } from 'src/app/_models/post';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;
  id: number | undefined;

  constructor(private route: ActivatedRoute, private postService: PostService) {
    this.getIdFromRoute();
  }
  ngOnInit(): void {
    console.log('Id : ' + this.id);
    this.getPost();
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
            console.log(this.post);
          },
        });
    }
  }
}
