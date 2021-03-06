import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { NavbarService } from '../../../shared/services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {username: 'test@gmail.com', password: '123456'};
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private navbarService: NavbarService) { }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();
      this.navbarService.updateNavbar();
  }

  showError() {
    this.error = 'Username or password is incorrect';
    this.loading = false;
  }

  login() {
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(
              result => {
                if (result === true) {
                    // login successful
                    this.router.navigate(['/']);
                } else {
                    // login failed
                    this.showError();
                }
            },
            err => {
                this.showError();
            }
        );
  }
}
