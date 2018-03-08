import { Injectable } from '@angular/core';
import { Master } from '../models/master'
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class MasterService {

  constructor(private http:HttpClient) {}
 
  getMasters() {
    return this.http.get(environment.apiUrl + '/api/masters');
  }

  coapRequest(master) {
    return this.http.post(environment.apiUrl + '/api/masters/' + master.id + '/request', {test: ''}, {});
  }

}
