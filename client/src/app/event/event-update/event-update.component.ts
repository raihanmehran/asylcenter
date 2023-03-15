import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Events } from 'src/app/_models/events';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css'],
})
export class EventUpdateComponent implements OnInit {
  eventForm: FormGroup = new FormGroup({});
  @Input() event: Events | undefined;
  @Output() eventToUpdate: Events | undefined;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {}
  ngOnInit(): void {}

  initializeForm() {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.maxLength(5000)],
      date: ['', Validators.required],
      time: [''],
      location: [''],
      photo: [''],
    });
  }

  updateEvent() {}
  resetForm() {}
}
