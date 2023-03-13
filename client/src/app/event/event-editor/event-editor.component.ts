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
  selectedFile: File | undefined;

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
      photo: [''],
    });
  }
  onFileSelected(event: any) {
    this.imageUrl = '';
    this.selectedFile = <File>event.target.files[0];

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

  addEvent() {
    const dateOnly = this.getDateOnly(this.eventForm.controls['date'].value);
    const timeOnly = this.getTimeOnly(this.eventForm.controls['time'].value);

    // const values = {
    //   ...this.eventForm.value,
    //   date: dateOnly,
    //   time: timeOnly,
    //   photo: this.image,
    // };
    // const photo = this.eventForm.controls['photo'].value;
    // console.log('values:');
    // console.log(values);

    // this.eventService
    //   .addEvent2(values)
    //   .pipe()
    //   .subscribe({
    //     next: (response) => {
    //       this.toastr.success('Event added successfully');
    //       console.log(response);
    //     },
    //     error: (error) => this.toastr.error(error.error),
    //   });

    // this.eventService
    //   .addEvent(photo, values)
    //   .pipe()
    //   .subscribe({
    //     next: (response) => {
    //       this.toastr.success('Event added successfully');
    //       console.log(response);
    //     },
    //     error: (error) => this.toastr.error(error.error),
    //   });

    const formData = new FormData();

    if (this.selectedFile)
      formData.append('image', this.selectedFile, this.selectedFile.name);
    formData.append('title', this.eventForm.controls['title'].value);
    formData.append('content', this.eventForm.controls['content'].value);
    formData.append('date', dateOnly!.toString());
    formData.append('time', timeOnly!.toString());
    formData.append('location', this.eventForm.controls['location'].value);
    console.log(formData);

    this.eventService.addEvent2(formData).subscribe({
      next: (response) => {
        this.toastr.success('Event added successfully');
        console.log(response);
      },
      error: (error) => this.toastr.error(error.error),
    });
  }

  resetForm() {
    this.initializeForm();
    // this.imageUrl = '';
    // this.image = undefined;
    this.eventForm.controls['time'].setValue(void 0);
  }

  private getDateOnly(date: string | undefined) {
    if (!date) return;
    let theDate = new Date(date);
    return new Date(
      theDate.setMinutes(theDate.getMinutes() - theDate.getTimezoneOffset())
    )
      .toISOString()
      .slice(0, 10);
  }
  private getTimeOnly(timeString: string | undefined) {
    if (!timeString) return;

    const date = new Date(timeString);
    const hours = date.getHours().toString().padStart(2, '0');
    const mins = date.getMinutes().toString().padStart(2, '0');
    const secs = date.getSeconds().toString().padStart(2, '0');

    return `${hours}:${mins}:${secs}`;
  }
}
