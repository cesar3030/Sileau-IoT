import { Component, OnInit, Input } from '@angular/core';
import { Module } from '../../models/module';
import { ModuleService } from '../../services/module.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sensor-module',
  templateUrl: './sensor-module.component.html',
  styleUrls: ['./sensor-module.component.css']
})
export class SensorModuleComponent implements OnInit {
  @Input() sModule: Module
  private milliseconds = 10000
  private nbDataChart = 30
  public fanActivated
  public pressure
  public temperature
  public humidity
  private intervalId
  public lineChartLabels:Array<any>
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];

  constructor(private _moduleService :ModuleService) { 
    this.lineChartLabels = new Array(this.nbDataChart).map((i) => '')
  }
  
  ngOnInit() {
    this.processData()
    this.updateData()
  }

  updateData(){
    this.intervalId = setInterval(
      () => this.getModuleInfo(),
      this.milliseconds
    )
  }

  processData(){
    this.fanActivated = this.sModule.activated
    this.humidity = this.sModule.humidity[this.sModule.humidity.length - 1].value
    this.pressure = this.sModule.pressure[this.sModule.pressure.length - 1].value
    this.temperature = this.sModule.temperature[this.sModule.temperature.length - 1].value
    this.sModule.temperature = this.sModule.temperature.slice(Math.max(this.sModule.temperature.length - this.nbDataChart, 1))
    this.sModule.humidity = this.sModule.humidity.slice(Math.max(this.sModule.humidity.length - this.nbDataChart, 1))
    this.sModule.pressure = this.sModule.pressure.slice(Math.max(this.sModule.pressure.length - this.nbDataChart, 1))
    this.processDataForCharts()
  }
  
  getModuleInfo() {
    this._moduleService.getModule(this.sModule).subscribe(
      data => {
        this.sModule = data
        this.processData()
      },
      err => console.log(err),
      () => console.log('done loading masters')
    );
  }

  toggleFlag() {
    this._moduleService.toogleActivation(this.sModule).subscribe(
       data => {
        console.log(data)
        this.fanActivated = !this.fanActivated
        this.sModule.activated = this.fanActivated
       },
       error => {
         console.log("Error updating flag!");
         return Observable.throw(error);
       }
    );
  }

  processDataForCharts(){
    this.lineChartData = [
      {
        data: this.sModule.temperature.map((entry) => entry.value),
        label: 'Température'
      },
      {
        data: this.sModule.pressure.map((entry) => entry.value),
        label: 'Pression'
      },
      {
        data: this.sModule.humidity.map((entry) => entry.value),
        label: 'Humidité'
      }
    ];
    var count= 1
    this.lineChartLabels = this.sModule.temperature.map((entry) => {
      const d = new Date(entry.datetime)
      return (count++ % 5) == 0 ?  this.formatedDate(d) : ''
    })
  }

  formatedDate(d){
    return this.addZero(d.getHours()) + ':' + this.addZero(d.getMinutes()) + ':' + this.addZero(d.getSeconds())
  }

  addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}