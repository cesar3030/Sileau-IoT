import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { HomeComponent } from './home/components/home/home.component';
import { WelcomeComponent } from './welcome/components/welcome/welcome.component';
import { LoginComponent } from './welcome/components/login/login.component';
import { SignupComponent } from './signup/components/signup/signup.component';

const routes: Routes = [
    {
        path: 'welcome',
        component: WelcomeComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'logout',
        component: LoginComponent
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
