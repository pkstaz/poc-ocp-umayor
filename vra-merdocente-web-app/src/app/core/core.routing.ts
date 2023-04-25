import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoreDashboardComponent } from './core-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AcademicReportComponent } from './academic-report/academic-report.component';
import { AcademicCalendarComponent } from './academic-calendar/academic-calendar.component';
import { AcademicSearchComponent } from './academic-search/academic-search.component';
import { AcademicChatComponent } from './academic-chat/academic-chat.component';
import { AcademicProfileComponent } from './academic-profile/academic-profile.component';
import { AcademicPerfilComponent } from './academic-perfil/academic-perfil.component';
import { AcademicOpportunitiesComponent } from './academic-opportunities/academic-opportunities.component';


const routes: Routes = [

	{
		path: 'dashboard',
		component: CoreDashboardComponent,
		children: [
			{ 
				path: '', 
				component: DashboardComponent
			 },
			{ 
				path: 'calendar',
				component: AcademicCalendarComponent 
			},		
			{
				path: 'buscador',
				component: AcademicSearchComponent 
			},
			{ 
				path: 'chat-cademico',
				component: AcademicChatComponent
			},
			{
				path: 'reporte',
				component: AcademicReportComponent
			},
			{
				path: 'my-profile',
				component: AcademicProfileComponent
			},

			{
				path: 'profile/:id',
				//component: AcademicPerfilComponent
				component: AcademicProfileComponent
			},
			{
				path: 'oportunidades',
				component: AcademicOpportunitiesComponent
			}
		]
	},

	//{ path: 'path/:routeParam', component: MyComponent },
	//{ path: 'staticPath', component: ... },
	//{ path: '**', component: ... },
	//{ path: 'oldPath', redirectTo: '/staticPath' },
	//{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CoreRoutingModule {}
