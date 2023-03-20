import { Time } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs';
import { Events } from 'src/app/_models/events';
import { LoggedUser } from 'src/app/_models/loggedUser';
import { EventFeedback } from 'src/app/_models/eventFeedback';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent implements OnInit {
  @Input() event: Events | undefined;
  @Output() feedback = new EventEmitter<EventFeedback>();

  likes: number = 0;
  interested: number = 0;
  comments: number = 0;
  loggedUser: LoggedUser | undefined;
  eventLiked: boolean = false;
  eventInterested: boolean = false;
  eventCommented: boolean = false;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.getLoggedUser();
    this.calculateFeedback();
  }

  addLike() {
    if (this.event && this.loggedUser) {
      if (this.eventLiked) {
        if (confirm('Are you sure want to remove your Like?')) {
          const like: EventFeedback = {
            liked: false,
            idNumber: this.loggedUser.username,
            eventId: this.event.id,
          };
          this.feedback.emit(like);
        }
      } else {
        const like: EventFeedback = {
          liked: true,
          idNumber: this.loggedUser.username,
          eventId: this.event.id,
        };
        this.feedback.emit(like);
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
