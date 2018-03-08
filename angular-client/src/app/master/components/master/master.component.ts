import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service'
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  public masters;

  constructor(private _masterService :MasterService) { }

  ngOnInit() {
    this.getMasters()
  }
  
  getMasters() {
    this._masterService.getMasters().subscribe(
      data => { this.masters = data},
      err => console.error(err),
      () => console.log('done loading foods')
    );
  }

  toggleFlag(master) {
    this._masterService.coapRequest(master.id).subscribe(
       data => {
         return true;
       },
       error => {
         console.error("Error requesting beaglebone!");
         return Observable.throw(error);
       }
    );
  }
  

}
