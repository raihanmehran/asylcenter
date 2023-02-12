import { Photo } from './photo';

export interface User {
  id: number;
  userName: string;
  idNumber: string;
  firstName: string;
  lastName: string;
  country: string;
  age: number;
  created: Date;
  lastActive: Date;
  phone: string;
  email: string;
  gender: string;
  language: string;
  photoUrl: string;
  address: string;
  photos: Photo[];
}
