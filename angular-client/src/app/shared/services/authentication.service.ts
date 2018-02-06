/***
 * The Authentication process has been implemented based on Jason Watmore's tutorial.
 * Link to the tutorial: http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private httpClient: HttpClient) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    login(email: string, password: string): Observable<boolean> {
        const body = { email: email, password: password };
        const headers = {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Basic ' + btoa(email + ':' + password))
        };
        return this.httpClient.post('http://0.0.0.0:9000/api/auth', body, headers)
            .map((response: Response) => {
                    // login successful if there's a jwt token in the response
                    const token = response['token'];
                    // response.json() && response.json().token;
                    if (token) {
                        // set token property
                        this.token = token;
                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify({ email: email, token: token }));
                        // return true to indicate successful login
                        return true;
                    } else {
                        // return false to indicate failed login
                        return false;
                    }
            }).catch((error: any) => {
                return Observable.throw(error.statusText);
            });
    }
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
    isLoggedIn() {
        return this.token ? true : false;
    }
}
