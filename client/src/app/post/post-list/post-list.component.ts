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
  loggedUser: LoggedUser | undefined;

  constructor(
    public postService: PostService,
    private accountServie: AccountService
  ) {
    this.getUser();
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    if (this.loggedUser) {
      this.postService.createHubConnection(
        this.loggedUser,
        this.loggedUser.userId
      );
    } else {
      this.postService.stopHubConnection();
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
