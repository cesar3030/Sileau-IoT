import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterializeModule } from 'angular2-materialize';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleListComponent } from './article/components/article-list/article-list.component';
import { ArticleService } from './article/services/article.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { HomeComponent } from './home/components/home/home.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './welcome/components/login/login.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/components/signup/signup.component';
import { SignupService } from './signup/services/signup.service';
import { WelcomeComponent } from './welcome/components/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterializeModule
  ],
  providers: [
    ArticleService,
    AuthGuard,
    AuthenticationService,
    SignupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
