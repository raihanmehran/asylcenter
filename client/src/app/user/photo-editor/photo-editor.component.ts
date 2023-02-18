import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { LoggedUser } from 'src/app/_models/loggedUser';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { UsersService } from 'src/app/_services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() user: User | undefined;
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  loggedUser: LoggedUser | undefined;

  constructor(
    private accountService: AccountService,
    private userService: UsersService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (loggedUser) => {
        if (loggedUser) this.loggedUser = loggedUser;
      },
    });
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(photo.id).subscribe({
      next: () => {
        if (this.loggedUser && this.user) {
          this.loggedUser.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.loggedUser);
          this.user.photoUrl = photo.url;
          this.user.photos.forEach((p) => {
            if (p.isMain) p.isMain = false;
            if (p.id === photo.id) p.isMain = true;
          });
        }
      },
    });
  }

  deletePhoto(photoId: number) {
    this.userService.deletePhoto(photoId).subscribe({
      next: (_) => {
        if (this.user) {
          this.user.photos = this.user.photos.filter((x) => x.id !== photoId);
        }
      },
    });
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.loggedUser?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.user?.photos.push(photo);
      }
    };
  }
}
