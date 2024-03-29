import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
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
  modalRef: BsModalRef | undefined;
  @ViewChild('feedbackModal', { static: true }) feedbackModalRef:
    | TemplateRef<any>
    | undefined;
  modalFor: string = '';

  constructor(
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {}
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
  openModal(modalFor: string) {
    this.modalFor = modalFor;
    this.modalRef = this.modalService.show(this.feedbackModalRef!, {
      class: 'modal-md',
    });
  }
  viewLikedUsers() {
    if (this.likes === 0) {
      this.toastr.warning('No likes to show!');
    } else {
      this.openModal('like');
    }
  }

  viewCommentedUsers() {
    if (this.comments === 0) {
      this.toastr.warning('No comments to show!');
    } else {
      this.openModal('comment');
    }
  }

  viewInterestedUsers() {
    if (this.interested === 0) {
      this.toastr.warning('No interests to show!');
    } else {
      this.openModal('interest');
    }
  }

  hideModal() {
    this.modalService.hide();
  }
}
