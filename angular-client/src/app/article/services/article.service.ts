import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Article } from '../models/article';
import { environment } from '../../../environments/environment';

@Injectable()
export class ArticleService {
    private readonly URL = environment.apiUrl + '/api/articles';

    constructor(
        private httpClient: HttpClient,
        private authenticationService: AuthenticationService) {
    }

    public list(): Observable<Array<Article>> {
        return this.httpClient.get<Array<Article>>(this.URL);
    }

    // public list(): Article[] {
    //     const a1 = new Article();
    //     a1.title = 'title1';
    //     a1.text = 'foo';
    //     console.log('la');
    //     return [a1];
    // }
}
