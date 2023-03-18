import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Events } from 'src/app/_models/events';
import { LoggedUser } from 'src/app/_models/loggedUser';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css'],
})
export class EventUpdateComponent implements OnInit {
  eventForm: FormGroup = new FormGroup({});
  @Input() event: Events | undefined;
  @Output() updateEvent = new EventEmitter<Event>();
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  loggedUser: LoggedUser | undefined;
  eventToUpdate: Events | undefined;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private accountService: AccountService
  ) {}
  ngOnInit(): void {
    this.initializeForm();
    console.log(this.event);
  }

  initializeForm() {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.maxLength(5000)],
      date: ['', Validators.required],
      time: [''],
      location: [''],
    });
  }

  eventUpdate() {
    if (this.event) {
      if (this.eventForm.valid) {
        this.event.title = this.eventForm.controls['title'].value;
        this.event.content = this.eventForm.controls['content'].value;
        this.event.date = this.eventForm.controls['date'].value;
        this.event.time = this.eventForm.controls['time'].value
          .toTimeString()
          .substring(0, 8);
        this.event.location = this.eventForm.controls['location'].value;
      }
    }
  }
  resetForm() {}

  getLoggedUser() {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (loggedUser) => {
        if (loggedUser) this.loggedUser = loggedUser;
      },
    });
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
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
    console.log('image');

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        // this.user?.photos.push(photo);
        // if (photo.isMain && this.loggedUser && this.user) {
        //   this.loggedUser.photoUrl = photo.url;
        //   this.user.photoUrl = photo.url;
        //   this.accountService.setCurrentUser(this.loggedUser);
        // }
      }
    };
  }

  private getDateOnly(date: Date) {
    if (!date) return;
    let theDate = new Date(date);
    return new Date(
      theDate.setMinutes(theDate.getMinutes() - theDate.getTimezoneOffset())
    )
      .toISOString()
      .slice(0, 10);
  }

  private getTimeOnly(timeString: string | undefined) {
    if (!timeString) return;

    const date = new Date(timeString);
    const hours = date.getHours().toString().padStart(2, '0');
    const mins = date.getMinutes().toString().padStart(2, '0');
    const secs = date.getSeconds().toString().padStart(2, '0');

    return `${hours}:${mins}:${secs}`;
  }
}
