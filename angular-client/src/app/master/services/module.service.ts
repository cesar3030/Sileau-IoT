import { Injectable } from '@angular/core';
import { Module } from '../models/module'
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ModuleService {

  constructor(private http:HttpClient) {}
 
  getModules(): Observable<Module[]>{
    return this.http.get<Module[]>(environment.apiUrl + 'masters');
  }

  getModule(m): Observable<Module> {
    return this.http.get<Module>(environment.apiUrl + 'masters/' + m.id);
  }

  toogleActivation(m){
    console.log("log: "+m.id)
    return this.http.put(environment.apiUrl + 'masters/' + m.id, {activated: !m.activated, imei: m.imei}, {});
  }

  coapRequest(m) {
    return this.http.post(environment.apiUrl + 'masters/' + m.id + '/request', {test: ''}, {});
  }
}
