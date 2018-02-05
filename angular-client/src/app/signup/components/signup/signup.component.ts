import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private user = new User();
  private loading = false;
  private error = '';

  constructor(private router: Router,
              private signupService: SignupService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // If the user is already logged in we redirect to the home page
    if (this.authenticationService.isLoggedIn()) {
      this.redirectHomePage();
    }
  }

  signup() {
    this.loading = true;
    this.signupService.signUp(this.user)
    .subscribe(
      data => {
        this.redirectHomePage();
      },
      err => {
        if (err === 'Conflict') {
          this.error = 'Email already registered';
        } else {
          this.error = 'An error occured, please try again';
        }
        this.loading = false;
      }
    );
  }

  redirectHomePage() {
    this.router.navigate(['/']);
  }
}
