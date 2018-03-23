import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  @Input('datasets') lineChartData:Array<any>
  @Input('labels') lineChartLabels:Array<any>
  @Input('options') lineChartOptions:any = {
    responsive: true
  };
  @Input('legend') lineChartLegend:boolean = true
  @Input('chartType') lineChartType:string = 'line'
}
