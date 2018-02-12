import { Component, OnInit } from '@angular/core';
import { Article } from '../../../article/models/article';
import { ArticleService } from '../../../article/services/article.service';
import { NavbarService } from '../../../shared/services/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private navbarService: NavbarService) { }

  ngOnInit() {
    this.navbarService.updateNavbar();
  }
}
