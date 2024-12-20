import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { authGuard } from './auth.guard';
import { CloudFrontComponentComponent } from './cloud-front-component/cloud-front-component.component';

const routes: Routes = [
  {path: "",
   component: HomePageComponent,
  pathMatch: "full"
  },
  {path: 'login',
   component: LoginComponent
  },
  {path: 'signup',
   component: SignupComponent
  },
  {path: 'userDashborad',
   component: UserDashboardComponent,
   canActivate: [authGuard],
   data: { role: 'USER' }
  },
  {path: 'distributions',
   component: CloudFrontComponentComponent,
   canActivate: [authGuard],
   data: {role: 'USER'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
