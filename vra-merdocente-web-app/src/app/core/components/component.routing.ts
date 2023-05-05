import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


/** 
 * @Component
 **/
import { CoreDashboardComponent } from '../core-dashboard.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ChartsComponent } from './charts/charts.component';
import { ProfileComponent } from './profile/profile.component';
import { TablesComponent } from './tables/tables.component';
import { DataTableComponent } from './data-table/data-table.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { ChatsComponent } from './chats/chats.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SearchListComponent } from './search-list/search-list.component';
import { ListJobsComponent } from './list-jobs/list-jobs.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { FormSelect2Component } from './form-select2/form-select2.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { PreferenceFinderComponent } from './preference-finder/preference-finder.component';
import { FormsElementsComponent } from './forms-elements/forms-elements.component';


const routes: Routes = [
	{
		path: 'dashboard',
		component: CoreDashboardComponent,
		children: [
			{ path: '', component: DashboardComponent },
			{ path: 'components/chart', component: ChartsComponent },
			{ path: 'components/forms', component: FormsElementsComponent },
			{ path: 'components/profile', component: ProfileComponent },
			{ path: 'components/table', component: TablesComponent },
			{ path: 'components/data-table', component: DataTableComponent },
			{ path: 'components/calendario', component: CalendarioComponent },
			{ path: 'components/chats', component: ChatsComponent },
			{ path: 'components/contact-list', component: ContactListComponent },
			{ path: 'components/search-list', component: SearchListComponent },
			{ path: 'components/list-jobs', component: ListJobsComponent },
			{ path: 'components/profile-setting', component: ProfileSettingComponent },
			{ path: 'components/form-select2', component: FormSelect2Component },
			{ path: 'components/buttons', component: ButtonsComponent },
			{ path: 'components/buscador-preferencias', component: PreferenceFinderComponent },
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
export class ComponentsRoutingModule {}
