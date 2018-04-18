import { Component, OnInit, Input } from '@angular/core';
import { Master } from '../../models/master';
import { MasterService } from '../../services/master.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sensor-module',
  templateUrl: './sensor-module.component.html',
  styleUrls: ['./sensor-module.component.css']
})
export class SensorModuleComponent implements OnInit {
  @Input() module: Master;
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

  constructor(private _masterService :MasterService) { 
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

  mapData(data){
    this.fanActivated = data[0].activated
    this.humidity = data[0].humidity[data[0].humidity.length - 1].value
    this.pressure = data[0].pressure[data[0].pressure.length - 1].value
    this.temperature = data[0].temperature[data[0].temperature.length - 1].value
  }
  
  getModuleInfo() {
    this._masterService.getMasters().subscribe(
      data => {
        this.module = data
        this.module[0].temperature = this.module[0].temperature.slice(Math.max(this.module.temperature.length - this.nbDataChart, 1))
        this.module[0].humidity = this.module[0].humidity.slice(Math.max(this.module.humidity.length - this.nbDataChart, 1))
        this.module[0].pressure = this.module[0].pressure.slice(Math.max(this.module.pressure.length - this.nbDataChart, 1))
        this.mapData(data)
        console.log(this.fanActivated)
        this.processDataForCharts()
      },
      err => console.log(err),
      () => console.log('done loading masters')
    );
  }

  toggleFlag() {
    this._masterService.toogleActivation(module).subscribe(
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
        data: this.masters[0].temperature.map((entry) => entry.value),
        label: 'Température'
      },
      {
        data: this.masters[0].pressure.map((entry) => entry.value),
        label: 'Pression'
      },
      {
        data: this.masters[0].humidity.map((entry) => entry.value),
        label: 'Humidité'
      }
    ];
    this.lineChartLabels = this.masters[0].temperature.map((entry) => {
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