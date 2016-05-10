import { Injectable } from '@angular/core';

import { USER } from './mock-user';

@Injectable()
export class UserService {
  getUser() {
    return Promise.resolve(USER);
  }
}
