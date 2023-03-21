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
  @Input() for: string = '';
  @Input() isLikes: boolean = false;
  @Input() isInterests: boolean = false;
  @Input() isComments: boolean = true;
  isCommented: boolean = false;
  commentForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.initializeForm();
    this.chooseDialog();
  }

  initializeForm() {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  addComment() {
    console.log('Commented!');
  }

  chooseDialog() {
    if (this.for === 'like') {
      this.isLikes = true;
    } else if (this.for === 'comment') {
      this.isComments = true;
    } else if (this.for === 'interest') {
      this.isInterests = true;
    }
  }
}
