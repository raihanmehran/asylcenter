import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Events } from 'src/app/_models/events';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css'],
})
export class EventSearchComponent implements OnInit {
  event: Events | undefined;
  events: Events[] | undefined;
  modalRef: BsModalRef | undefined;
  @ViewChild('confirmDialog', { static: true }) confirmDialogRef:
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
        error: (error) => this.toastr.error(error.error),
      });
  }

  delete($event: Events) {
    this.event = $event;
    this.openConfirmModal(this.confirmDialogRef!);
  }

  edit($event: Events) {
    this.event = $event;
    this.toastr.show('Post edited');
  }
  openConfirmModal(onfirmDialog: TemplateRef<any>) {
    this.modalRef = this.modalService.show(onfirmDialog, { class: 'modal-sm' });
  }

  confirm() {
    if (this.event) this.deleteEvent(this.event);
    this.modalRef?.hide();
  }
  decline() {
    console.log('declined');
    this.modalRef?.hide();
  }

  deleteEvent($event: Events) {
    if (this.events) {
      const eventId = $event.id;
      this.eventService
        .deleteEvent(eventId)
        .pipe()
        .subscribe({
          next: (_) => {
            this.events = this.events?.filter((e) => e.id !== eventId);
            this.toastr.success('Event removed successfully!');
          },
          error: (error) => this.toastr.error(error.error),
        });
    }
  }
}
