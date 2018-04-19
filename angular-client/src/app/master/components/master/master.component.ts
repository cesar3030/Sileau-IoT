import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ModuleService } from '../../services/module.service'
import { Observable } from 'rxjs/Rx';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AppComponent } from '../../../app.component';
import { Module } from '../../models/module';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  public modules: Module[]

  constructor(private _moduleService :ModuleService) { 
  }
  
  ngOnInit() {
    this.getModules()
  }
  
  getModules() {
    this._moduleService.getModules().subscribe(
      data => {
        this.modules = data
        console.log(data)
      },
      err => console.log(err),
      () => console.log('done loading masters')
    );
  }
}
