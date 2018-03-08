import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class NavbarService {
  visible: boolean;

  constructor(private authenticationService: AuthenticationService) { this.visible = this.authenticationService.isLoggedIn(); }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }

  updateNavbar() { this.visible = this.authenticationService.isLoggedIn(); }
}
