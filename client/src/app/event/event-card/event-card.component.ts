import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Events } from 'src/app/_models/events';

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

  constructor() {}
  ngOnInit(): void {
    this.calculateFeedback();
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
