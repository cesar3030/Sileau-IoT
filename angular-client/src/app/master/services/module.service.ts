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

  getModule(module) {
    return this.http.get<Module[]>(environment.apiUrl + 'masters/' + module.id);
  }

  toogleActivation(module){
    return this.http.put(environment.apiUrl + 'masters/' + module.id, {activated: !module.activated}, {});
  }

  coapRequest(master) {
    return this.http.post(environment.apiUrl + 'masters/' + module.id + '/request', {test: ''}, {});
  }
}
