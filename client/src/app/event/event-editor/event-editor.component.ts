import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.css'],
})
export class EventEditorComponent implements OnInit {
  eventForm: FormGroup = new FormGroup({});
  imageUrl: string = '';
  image: File | undefined;

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
      date: ['', Validators.required],
      time: [''],
      location: [''],
    });
  }
  onFileSelected(event: any) {
    this.imageUrl = '';
    const file: File = event.target.files[0];

    if (!file.type.startsWith('image/')) {
      this.toastr.warning('Invalid file type selected!');
    } else {
      if (file) {
        this.image = file;

        console.log(file);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          const fileContents = e.target.result;
          this.imageUrl = fileContents;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  resetForm() {
    this.initializeForm();
    this.imageUrl = '';
    this.image = undefined;
  }
}
