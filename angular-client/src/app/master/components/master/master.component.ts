import { Component, OnInit, OnDestroy } from '@angular/core';
import { MasterService } from '../../services/master.service'
import { Observable } from 'rxjs/Rx';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit, OnDestroy {

  public masters;
  public fanActivated;
  public pressure;
  public temperature;
  public humidity;
  private intervalId;
  constructor(private _masterService :MasterService) { }

  ngOnInit() {
    this.getMasters()
    this.updateData()
  }

  updateData(){
    this.intervalId = setInterval(
      () => this.getMasters(),
      15000
    )
  }

  mapData(data){
    this.fanActivated = data[0].activated
    this.humidity = data[0].humidity[data[0].humidity.length - 1].value
    this.pressure = data[0].pressure[data[0].pressure.length - 1].value
    this.temperature = data[0].temperature[data[0].temperature.length - 1].value
  }
  
  getMasters() {
    this._masterService.getMasters().subscribe(
      data => {
        this.masters = data
        this.mapData(data)
        console.log(this.fanActivated)
      },
      err => console.log(err),
      () => console.log('done loading masters')
    );
  }

  toggleFlag() {
    this._masterService.toogleActivation(this.masters[0]).subscribe(
       data => {
        console.log(data)
        this.fanActivated = !this.fanActivated
        this.masters[0].activated = this.fanActivated
       },
       error => {
         console.log("Error updating flag!");
         return Observable.throw(error);
       }
    );
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  
}
