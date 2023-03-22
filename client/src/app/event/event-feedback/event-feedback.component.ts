import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Events } from 'src/app/_models/events';
import { LoggedUser } from 'src/app/_models/loggedUser';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-event-feedback',
  templateUrl: './event-feedback.component.html',
  styleUrls: ['./event-feedback.component.css'],
})
export class EventFeedbackComponent implements OnInit {
  @Input() event: Events | undefined;
  @Input() for: string = '';
  @Input() isLikes: boolean = false;
  @Input() isInterests: boolean = false;
  @Input() isComments: boolean = false;
  isCommented: boolean = false;
  commentForm: FormGroup = new FormGroup({});
  loggedUser: LoggedUser | undefined;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {}
  ngOnInit(): void {
    this.initializeForm();
    this.chooseDialog();
  }

  initializeForm() {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  addComment() {
    console.log('Commented!');
  }

  getLoggedUser() {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) this.loggedUser = user;
      },
      error: (error) => console.log(error.error),
    });
  }

  chooseDialog() {
    if (this.for === 'like') {
      this.isLikes = true;
    } else if (this.for === 'comment') {
      this.isComments = true;
      this.isCommented =
        this.event?.eventFeedback.filter(
          (x) =>
            x.interested === true && x.idNumber === this.loggedUser.username
        ).length > 0
          ? true
          : false;
    } else if (this.for === 'interest') {
      this.isInterests = true;
    }
  }

  calculateFeedback() {
    if (this.event) {
      if (this.for === 'like') {
        return this.event.eventFeedback.filter((x) => x.liked === true).length;
      } else if (this.for === 'comment') {
        return this.event.eventFeedback.filter((x) => x.comment !== null)
          .length;
      } else if (this.for === 'interest') {
        return this.event.eventFeedback.filter((x) => x.interested === true)
          .length;
      }
    }
    return 0;
  }
}
