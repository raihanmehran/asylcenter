import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Events } from 'src/app/_models/events';

@Component({
  selector: 'app-event-feedback',
  templateUrl: './event-feedback.component.html',
  styleUrls: ['./event-feedback.component.css'],
})
export class EventFeedbackComponent implements OnInit {
  @Input() event: Events | undefined;
  @Input() isLikes: boolean = false;
  @Input() isInterests: boolean = false;
  @Input() isComments: boolean = true;
  commentForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  addComment() {
    console.log('Commented!');
  }
}
