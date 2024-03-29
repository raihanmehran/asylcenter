import { Time } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs';
import { Events } from 'src/app/_models/events';
import { LoggedUser } from 'src/app/_models/loggedUser';
import { EventFeedback } from 'src/app/_models/eventFeedback';
import { AccountService } from 'src/app/_services/account.service';
import { isIdentifier } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent implements OnInit {
  @Input() event: Events | undefined;
  @Output() addFeedback = new EventEmitter<EventFeedback>();
  @Output() removeFeedback = new EventEmitter<number>();
  @Output() viewLikes = new EventEmitter<Events>();
  @Output() viewComments = new EventEmitter<Events>();
  @Output() viewInterests = new EventEmitter<Events>();

  likes: number = 0;
  interested: number = 0;
  comments: number = 0;
  loggedUser: LoggedUser | undefined;
  eventLiked: boolean = false;
  eventInterested: boolean = false;
  eventCommented: boolean = false;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getLoggedUser();
    this.calculateFeedback();
  }

  showLikes() {
    if (this.event) {
      if (this.likes === 0 || this.likes < 0) {
        this.toastr.warning('0 Likes to show!');
      } else {
        this.viewLikes.emit(this.event);
      }
    }
  }

  showComments() {
    if (this.event) {
      if (this.comments === 0 || this.comments < 0) {
        this.toastr.warning('0 Comments to show!');
      } else {
        this.viewComments.emit(this.event);
      }
    }
  }

  showInterests() {
    if (this.event) {
      if (this.interested === 0 || this.interested < 0) {
        this.toastr.warning('0 Interests to show!');
      } else {
        this.viewInterests.emit(this.event);
      }
    }
  }

  handleLike() {
    if (this.event && this.loggedUser) {
      if (this.eventLiked) {
        if (confirm('Are you sure want to remove your Like?')) {
          var isLiked = this.event.eventFeedback.filter(
            (x) => x.liked === true && x.idNumber === this.loggedUser?.username
          );
          if (isLiked.length > 0) {
            var id = isLiked[0].id;
            this.removeFeedback.emit(id);
          }
        }
      } else {
        const like: EventFeedback = {
          liked: true,
          idNumber: this.loggedUser.username,
          eventId: this.event.id,
        };
        this.addFeedback.emit(like);
      }
    }
  }

  handleInterest() {
    if (this.event && this.loggedUser) {
      if (this.eventInterested) {
        if (confirm('Are you sure want to remove your Interest?')) {
          var isInterested = this.event.eventFeedback.filter(
            (x) =>
              x.interested === true && x.idNumber === this.loggedUser?.username
          );
          if (isInterested.length > 0) {
            var id = isInterested[0].id;
            this.removeFeedback.emit(id);
          }
        }
      } else {
        const interest: EventFeedback = {
          interested: true,
          idNumber: this.loggedUser.username,
          eventId: this.event.id,
        };
        this.addFeedback.emit(interest);
      }
    }
  }

  handleComment() {
    if (this.event) {
      if (this.eventCommented) {
        if (confirm('Are you sure want to remove your Comment?')) {
          var isCommented = this.event.eventFeedback.filter(
            (x) =>
              x.comment !== null && x.idNumber === this.loggedUser?.username
          );
          if (isCommented.length > 0) {
            var id = isCommented[0].id;
            this.removeFeedback.emit(id);
          }
        }
      } else {
        this.viewComments.emit(this.event);
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

  formatTime(time: Time): string {
    var timeString = time.toLocaleString();
    var timeArr = timeString.split(':');
    var hours = parseInt(timeArr[0]);
    var minutes = timeArr[1];

    return `${hours}:${minutes}`;
  }

  calculateFeedback() {
    if (this.event && this.loggedUser) {
      this.likes = this.event.eventFeedback.filter(
        (x) => x.liked === true
      ).length;
      this.interested = this.event.eventFeedback.filter(
        (x) => x.interested === true
      ).length;
      this.comments = this.event.eventFeedback.filter(
        (x) => x.comment !== null
      ).length;

      var isLiked = this.event.eventFeedback.filter(
        (x) => x.liked === true && x.idNumber === this.loggedUser?.username
      ).length;
      if (isLiked > 0) this.eventLiked = true;

      var isInterested = this.event.eventFeedback.filter(
        (x) => x.interested === true && x.idNumber === this.loggedUser?.username
      ).length;
      if (isInterested > 0) this.eventInterested = true;

      var isCommented = this.event.eventFeedback.filter(
        (x) => x.comment !== null && x.idNumber === this.loggedUser?.username
      ).length;
      if (isCommented > 0) this.eventCommented = true;
    }
  }
}
