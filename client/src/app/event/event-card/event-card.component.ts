import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Events } from 'src/app/_models/events';
import { LoggedUser } from 'src/app/_models/loggedUser';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent implements OnInit {
  @Input() event: Events | undefined;
  likes: number = 0;
  interested: number = 0;
  comments: number = 0;
  loggedUser: LoggedUser | undefined;
  eventLiked: boolean = false;
  eventInterested: boolean = false;
  eventCommented: boolean = false;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.calculateFeedback();
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
    if (this.event) {
      this.likes = this.event.eventFeedback.filter(
        (x) => x.liked === true
      ).length;
      this.interested = this.event.eventFeedback.filter(
        (x) => x.interested === true
      ).length;
      this.comments = this.event.eventFeedback.filter(
        (x) => x.comment !== null
      ).length;
    }
  }
}
