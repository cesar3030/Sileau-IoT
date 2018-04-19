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
  @Input() module: Module;
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
    this.getModuleInfo()
    this.updateData()
  }

  updateData(){
    this.intervalId = setInterval(
      () => this.getModuleInfo(),
      15000
    )
  }

  mapData(){
    this.fanActivated = this.module.activated
    this.humidity = this.module.humidity[this.module.humidity.length - 1].value
    this.pressure = this.module.pressure[this.module.pressure.length - 1].value
    this.temperature = this.module.temperature[this.module.temperature.length - 1].value
  }
  
  getModuleInfo() {
    this._moduleService.getModule(this.module).subscribe(
      data => {
        this.module.temperature = this.module.temperature.slice(Math.max(this.module.temperature.length - this.nbDataChart, 1))
        this.module.humidity = this.module.humidity.slice(Math.max(this.module.humidity.length - this.nbDataChart, 1))
        this.module.pressure = this.module.pressure.slice(Math.max(this.module.pressure.length - this.nbDataChart, 1))
        this.mapData()
        console.log(this.fanActivated)
        this.processDataForCharts()
      },
      err => console.log(err),
      () => console.log('done loading masters')
    );
  }

  toggleFlag() {
    this._moduleService.toogleActivation(module).subscribe(
       data => {
        console.log(data)
        this.fanActivated = !this.fanActivated
        this.module.activated = this.fanActivated
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
        data: this.module.temperature.map((entry) => entry.value),
        label: 'Température'
      },
      {
        data: this.module.pressure.map((entry) => entry.value),
        label: 'Pression'
      },
      {
        data: this.module.humidity.map((entry) => entry.value),
        label: 'Humidité'
      }
    ];
    this.lineChartLabels = this.module.temperature.map((entry) => {
      const d = new Date(entry.datetime)
      return d.getHours() + ':' + d.getMinutes()
    })
    console.log(this.lineChartLabels)
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  
}