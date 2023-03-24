import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { EventFeedback } from 'src/app/_models/eventFeedback';
import { Events } from 'src/app/_models/events';
import { LoggedUser } from 'src/app/_models/loggedUser';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { EventService } from 'src/app/_services/event.service';

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
  @Output() userComment = new EventEmitter<EventFeedback>();
  @Output() hideModal = new EventEmitter();
  isCommented: boolean = false;
  commentForm: FormGroup = new FormGroup({});
  loggedUser: LoggedUser | undefined;
  feedbackUsers: User[] | undefined;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService,
    private eventService: EventService
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

  getLikedUsers() {
    if (this.event) {
      this.eventService
        .getLikeFeedbackUsers(this.event.id)
        .pipe()
        .subscribe({
          next: (users) => {
            if (users) {
              this.feedbackUsers = <User[]>users;
            }
          },
        });
    }
  }

  getInterestedUsers() {
    if (this.event) {
      this.eventService
        .getInterestFeedbackUsers(this.event.id)
        .pipe()
        .subscribe({
          next: (users) => {
            if (users) {
              this.feedbackUsers = <User[]>users;
            }
          },
        });
    }
  }

  getCommentedUsers() {
    if (this.event) {
      this.eventService
        .getCommentFeedbackUsers(this.event.id)
        .pipe()
        .subscribe({
          next: (users) => {
            if (users) {
              this.feedbackUsers = <User[]>users;
            }
          },
        });
    }
  }

  getComment(idNumber: string) {
    var feedback = this.event?.eventFeedback.filter(
      (x) => x.idNumber === idNumber && x.comment !== null
    );
    console.log(feedback);

    return feedback?.map((x) => x.comment);
  }

  addComment() {
    if (this.commentForm.invalid) {
      this.toastr.warning('Please enter a valid comment!');
    } else if (!this.loggedUser) {
      this.toastr.warning('Please log in again!');
    } else if (this.isCommented === true) {
      this.toastr.warning('You have commented once!');
    } else {
      const value = this.commentForm.controls['comment'].value;
      if (this.event) {
        const comment: EventFeedback = {
          comment: value,
          idNumber: this.loggedUser.username,
          eventId: this.event.id,
        };
        this.userComment.emit(comment);
        this.hideModal.emit();
      }
    }
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
    if (this.event) {
      if (this.for === 'like') {
        this.isLikes = true;
        this.getLikedUsers();
      } else if (this.for === 'comment') {
        this.getLoggedUser();
        if (this.loggedUser) {
          this.isComments = true;
          this.isCommented =
            this.event.eventFeedback.filter(
              (x) =>
                x.comment !== null &&
                x.idNumber === this.loggedUser?.username
            ).length > 0
              ? true
              : false;
          this.getCommentedUsers();
        }
      } else if (this.for === 'interest') {
        this.isInterests = true;
        this.getInterestedUsers();
      }
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

  closeModal() {
    this.hideModal.emit();
  }
}
