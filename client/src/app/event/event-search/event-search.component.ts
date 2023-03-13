import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Events } from 'src/app/_models/events';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css'],
})
export class EventSearchComponent implements OnInit {
  events: Events[] | undefined;

  constructor(
    private eventService: EventService,
    private toastr: ToastrService
  ) {}
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
          }
        },
        error: (error) => this.toastr.error(error.error),
      });
  }
}
