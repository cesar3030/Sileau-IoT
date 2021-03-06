import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SignupService {

  constructor(private httpClient: HttpClient) { }

  signUp(user: User) {
    const body = {
      'firstname': user.firstname,
      'lastname': user.lastname,
      'email': user.email,
      'password': user.password,
      'address': user.address,
      'city': user.city,
      'postalCode': user.postalCode,
      'province': user.province
    };
    return this.httpClient.post(environment.apiUrl + '/users', body)
      .catch((error: any) => {
        return Observable.throw(error.statusText);
      });
  }
}
