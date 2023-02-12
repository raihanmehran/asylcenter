import { Photo } from './photo';

export interface RootObject {
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
  photos: Photo[];
}
