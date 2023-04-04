import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { take } from 'rxjs';
import { LoggedUser } from 'src/app/_models/loggedUser';
import { Post } from 'src/app/_models/post';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { PostService } from 'src/app/_services/post.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  @ViewChild('userTabs', { static: true }) userTabs?: TabsetComponent;
  user: User = {} as User;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  activeTab?: TabDirective;
  posts: Post[] = [];
  loggedUser?: LoggedUser;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    public presenceService: PresenceService,
    public postService: PostService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) this.loggedUser = user;
      },
    });
  }

  ngOnDestroy(): void {
    this.postService.stopHubConnection();
  }

  ngOnInit(): void {
    this.loadUser();
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];
    this.getPosts();
  }
  getImages() {
    if (!this.user) return [];
    const imageUrls = [];

    for (const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
      });
    }
    return imageUrls;
  }
  loadUser() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.userService.getUser(username).subscribe({
      next: (user) => {
        console.log(user);

        (this.user = user), (this.galleryImages = this.getImages());
      },
    });
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Posts' && this.loggedUser) {
      this.postService.createHubConnection(this.loggedUser, this.user.id);
    } else {
      this.postService.stopHubConnection();
    }
  }

  getPosts() {
    if (this.loggedUser) {
      // const username = this.route.snapshot.paramMap.get('username');
      const userId = this.route.snapshot.paramMap.get('id');
      this.postService.getPosts(Number(userId)).subscribe({
        next: (response) => {
          if (response) {
            this.posts = response;
            console.log(this.posts);
          }
        },
      });
    }
  }
}
