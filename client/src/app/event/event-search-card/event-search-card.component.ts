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

  constructor() {}
  ngOnInit(): void {}

  edit() {
    this.editEvent.emit(this.event);
  }

  delete() {
    this.deleteEvent.emit(this.event);
  }
}
