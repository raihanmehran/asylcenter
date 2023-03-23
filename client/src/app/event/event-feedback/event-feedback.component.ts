import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { EventFeedback } from 'src/app/_models/eventFeedback';
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
  @Output() userComment = new EventEmitter<EventFeedback>();
  @Output() hideModal = new EventEmitter();
  isCommented: boolean = false;
  commentForm: FormGroup = new FormGroup({});
  loggedUser: LoggedUser | undefined;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService
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
      } else if (this.for === 'comment') {
        this.getLoggedUser();
        if (this.loggedUser) {
          this.isComments = true;
          this.isCommented =
            this.event.eventFeedback.filter(
              (x) =>
                x.interested === true &&
                x.idNumber === this.loggedUser?.username
            ).length > 0
              ? true
              : false;
        }
      } else if (this.for === 'interest') {
        this.isInterests = true;
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
