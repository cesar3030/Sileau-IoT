import { Injectable } from '@angular/core';
import { Master } from '../models/master'
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class MasterService {

  constructor(private http:HttpClient) {}
 
  getMasters() {
    return this.http.get(environment.apiUrl + 'masters');
  }

  toogleActivation(master){
    return this.http.put(environment.apiUrl + 'masters/' + master.id, {activated: !master.activated}, {});
  }

  coapRequest(master) {
    return this.http.post(environment.apiUrl + 'masters/' + master.id + '/request', {test: ''}, {});
  }

}
