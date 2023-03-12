import { Component, OnInit } from '@angular/core';
import { Events } from 'src/app/_models/events';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  events: Events[] = [];

  constructor(private eventService: EventService) {}
  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.eventService
      .getEvents()
      .pipe()
      .subscribe({
        next: (response) => {
          if (response) {
            this.events = response;
            console.log(this.events);
          }
        },
      });
  }
}
