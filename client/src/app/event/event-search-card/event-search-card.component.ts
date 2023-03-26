import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Events } from 'src/app/_models/events';

@Component({
  selector: 'app-event-search-card',
  templateUrl: './event-search-card.component.html',
  styleUrls: ['./event-search-card.component.css'],
})
export class EventSearchCardComponent implements OnInit {
  @Input() event: Events | undefined;
  @Output() editEvent = new EventEmitter<Events>();
  @Output() deleteEvent = new EventEmitter<Events>();
  likes: number = 0;
  interested: number = 0;
  comments: number = 0;

  constructor() {}
  ngOnInit(): void {
    this.calculateFeedback();
  }

  edit() {
    this.editEvent.emit(this.event);
  }

  delete() {
    this.deleteEvent.emit(this.event);
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
