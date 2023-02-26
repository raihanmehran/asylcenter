import { LoggedUser } from './loggedUser';

export class UserParams {
  gender: string;
  minAge = 18;
  maxAge = 99;
  pageNumber = 1;
  pageSize = 5;

  constructor(loggedUser: LoggedUser) {
    this.gender = loggedUser.gender === 'female' ? 'male' : 'female';
  }
}
