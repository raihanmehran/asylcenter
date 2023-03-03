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

  constructor(
    private postService: PostService,
    private accountServie: AccountService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts(3).subscribe({
      next: (response) => {
        this.posts = response;
      },
    });
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
