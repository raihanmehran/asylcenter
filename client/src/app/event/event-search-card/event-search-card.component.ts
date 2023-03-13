import { Component, Input, OnInit } from '@angular/core';
import { Events } from 'src/app/_models/events';

@Component({
  selector: 'app-event-search-card',
  templateUrl: './event-search-card.component.html',
  styleUrls: ['./event-search-card.component.css'],
})
export class EventSearchCardComponent implements OnInit {
  @Input() event: Events | undefined;

  constructor() {}
  ngOnInit(): void {}
}
