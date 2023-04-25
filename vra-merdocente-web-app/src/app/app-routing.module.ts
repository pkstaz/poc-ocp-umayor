import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreRoutingModule } from './core/core.routing';
import { AuthRoutingModule } from './auth/auth.routing';
import { BrowserUtils } from '@azure/msal-browser';
//import { UsersRoutingModule } from './users/users.routing';
import { NoFoundComponent } from './core/no-found/no-found.component';
import { ComponentsRoutingModule } from './core/components/component.routing';
import { CoreDashboardComponent } from './core/core-dashboard.component';
import { MsalGuard } from '@azure/msal-angular';


const routes: Routes = [
		{ 
		path: '', 
		redirectTo: 'login', 
		pathMatch: 'full' 
	},
	{
    path: 'dashboard',
		component: CoreDashboardComponent, canActivate: [MsalGuard],
  },
	{ path: '**', 
	component: NoFoundComponent 
	},
	{
    path: 'login-failed',
    component: NoFoundComponent
  }
];

const isIframe = window !== window.parent && !window.opener;


@NgModule({
  imports: [
		RouterModule.forRoot(routes, {
			initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() ? 'enabledNonBlocking' : 'disabled'
		}),
		CoreRoutingModule,
		AuthRoutingModule,
		ComponentsRoutingModule
	],
  exports: [RouterModule]
})
export class AppRoutingModule { }
