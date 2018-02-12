import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { AuthenticationService } from './shared/services/authentication.service';
import { NavbarService } from './shared/services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showMenu: Boolean = false;
  constructor (public nav: NavbarService) {}

  ngOnInit() {
    this.nav.updateNavbar();
  }
}
