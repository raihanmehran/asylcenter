import { Component } from '@angular/core';
import { Events } from 'src/app/_models/events';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css'],
})
export class EventSearchComponent {
  events: Events[] | undefined;
}
