import { Time } from '@angular/common';

export interface Events {
  id: number;
  title: string;
  content: string;
  date: Date;
  time: Time;
  location: string;
  photoUrl: string;
  created: Date;
}
