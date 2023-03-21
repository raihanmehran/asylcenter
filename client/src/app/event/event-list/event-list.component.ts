import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  modalRef: BsModalRef | undefined;
  @ViewChild('feedbackDialog', { static: true }) feedbackDialogRef:
    | TemplateRef<any>
    | undefined;

  constructor(
    private eventService: EventService,
    private toastr: ToastrService,
    private modalService: BsModalService
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
      });
  }

  openModal() {
    this.modalRef = this.modalService.show(this.feedbackDialogRef!, {
      class: 'modal-md',
    });
  }

  viewLikesModal($event: Events) {
    console.log($event);
    this.toastr.show('likes on the way!');
  }

  viewCommentsModal($event: Events) {
    console.log($event);
    this.toastr.show('comments on the way!');
  }

  viewInterestsModal($event: Events) {
    console.log($event);
    this.toastr.show('interests on the way!');
  }

  addFeedback($event: EventFeedback) {
    const feedback = $event;
    this.eventService.addFeedback(feedback).subscribe({
      next: () => {
        this.toastr.success('Your feedback saved!');
        this.getEvents();
      },
      error: (error) => this.toastr.error(error.error),
    });
  }

  removeFeedback($event: number) {
    const feedbackId = $event;
    this.eventService.deleteFeedback(feedbackId).subscribe({
      next: () => {
        this.toastr.warning('Your feedback removed!');
        this.getEvents();
      },
      error: (error) => this.toastr.error(error.error),
    });
  }
}
