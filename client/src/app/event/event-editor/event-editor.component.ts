import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.css'],
})
export class EventEditorComponent implements OnInit {
  eventForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.maxLength(5000)],
      date: [''],
      time: [''],
      location: [''],
    });
  }
}
