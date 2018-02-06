import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: User = new User();
  loading = false;
  error = '';

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService) { }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();
  }

  showError() {
    this.error = 'Username or password is incorrect';
    this.loading = false;
  }

  login() {
      this.loading = true;
      this.authenticationService.login(this.model.email, this.model.password)
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
