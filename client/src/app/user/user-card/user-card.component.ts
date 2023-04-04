import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/_models/user';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() user: User | undefined;
  @Output() userId = new EventEmitter<number>();

  constructor(public presenceService: PresenceService) {}

  ngOnInit(): void {}

  viewUserPosts() {
    if (this.user) this.userId.emit(this.user.id);
  }
}
