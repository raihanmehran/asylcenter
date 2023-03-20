import { Component, OnInit } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { EventFeedback } from 'src/app/_models/eventFeedback';
import { Events } from 'src/app/_models/events';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  events: Events[] = [];

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
            console.log(this.events);
          }
        },
      });
  }

  addFeedback($event: EventFeedback) {
    const feedback = $event;
    this.eventService.addFeedback(feedback).subscribe({
      next: () => {
        this.toastr.success('Your feedback saved!');
        console.log(this.events);
      },
      error: (error) => this.toastr.error(error.error),
    });
  }
  removeFeedback($event: number) {
    console.log($event);
    
  }
}
