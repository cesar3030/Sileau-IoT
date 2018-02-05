import { Component, OnInit } from '@angular/core';
import { Article } from '../../../article/models/article';
import { ArticleService } from '../../../article/services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: Article[] = [];
  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    // get articles from secure api end point
    this.articleService.list().subscribe(articles => {
        this.articles = articles;
        console.log(this.articles.length);
    });
  }

}
