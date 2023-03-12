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

  constructor() {}
  ngOnInit(): void {}

  formatTime(time: Time): string {
    var timeString = time.toLocaleString();
    var timeArr = timeString.split(':');
    var hours = parseInt(timeArr[0]);
    var minutes = timeArr[1];

    return `${hours}:${minutes}`;
  }
}
