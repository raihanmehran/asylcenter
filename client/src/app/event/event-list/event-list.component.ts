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
  returnedEvent: Events | undefined;
  modalRef: BsModalRef | undefined;
  @ViewChild('likesDialog', { static: true }) likesDialogRef:
    | TemplateRef<any>
    | undefined;
  @ViewChild('commentDialog', { static: true }) commentDialogRef:
    | TemplateRef<any>
    | undefined;
  @ViewChild('interestDialog', { static: true }) interestDialogRef:
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

  openModal(modal: TemplateRef<any>) {
    this.modalRef = this.modalService.show(modal, {
      class: 'modal-md',
    });
  }

  viewLikesModal($event: Events) {
    if ($event) {
      this.returnedEvent = $event;
      this.openModal(this.likesDialogRef!);
    }
  }

  viewCommentsModal($event: Events) {
    if ($event) {
      this.returnedEvent = $event;
      this.openModal(this.commentDialogRef!);
    }
  }

  viewInterestsModal($event: Events) {
    if ($event) {
      this.returnedEvent = $event;
      this.openModal(this.interestDialogRef!);
    }
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

  addUserComment($event: string) {
    this.toastr.show($event + ' : Your comment is here!');
    this.modalService.hide();
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

  hideModal() {
    this.modalService.hide();
  }
}
