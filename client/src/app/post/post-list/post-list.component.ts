import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { LoggedUser } from 'src/app/_models/loggedUser';
import { Post } from 'src/app/_models/post';
import { AccountService } from 'src/app/_services/account.service';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  loggedUser: LoggedUser | undefined;
  userId: number | undefined;

  constructor(
    private postService: PostService,
    private accountServie: AccountService
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.getUser();
    if (this.loggedUser) {
      this.userId = this.loggedUser.userId;

      this.postService.getPosts(this.userId).subscribe({
        next: (response) => {
          this.posts = response;
          console.log(this.posts);
        },
      });
    }
  }

  getUser() {
    this.accountServie.currentUser$.pipe(take(1)).subscribe({
      next: (loggedUser) => {
        if (loggedUser) {
          this.loggedUser = loggedUser;
        }
      },
    });
  }
}
