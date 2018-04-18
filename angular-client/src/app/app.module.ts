import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterializeModule } from 'angular2-materialize';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleListComponent } from './article/components/article-list/article-list.component';
import { ArticleService } from './article/services/article.service';
import { MasterService } from './master/services/master.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { HomeComponent } from './home/components/home/home.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './welcome/components/login/login.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/components/signup/signup.component';
import { SignupService } from './signup/services/signup.service';
import { WelcomeComponent } from './welcome/components/welcome/welcome.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NavbarService } from './shared/services/navbar.service';
import { MasterComponent } from './master/components/master/master.component';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './shared/components/chart/chart.component';
import { SensorModuleComponent } from './master/components/sensor-module/sensor-module.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    WelcomeComponent,
    NavbarComponent,
    MasterComponent,
    ChartComponent,
    SensorModuleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterializeModule,
    ChartsModule
  ],
  providers: [
    ArticleService,
    AuthGuard,
    AuthenticationService,
    SignupService,
    NavbarService,
    MasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
