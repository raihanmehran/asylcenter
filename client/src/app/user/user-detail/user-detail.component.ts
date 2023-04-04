import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { User } from 'src/app/_models/user';
import { PresenceService } from 'src/app/_services/presence.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    public presenceService: PresenceService
  ) {}

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
        (this.user = user), (this.galleryImages = this.getImages());
      },
    });
  }
}
