import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonsComponent } from './buttons/buttons.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { ChartsComponent } from './charts/charts.component';
import { ChatsComponent } from './chats/chats.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { DataTableComponent } from './data-table/data-table.component';
import { FormsElementsComponent } from './forms-elements/forms-elements.component';
import { FormSelect2Component } from './form-select2/form-select2.component';
import { ListJobsComponent } from './list-jobs/list-jobs.component';
import { PreferenceFinderComponent } from './preference-finder/preference-finder.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { SearchListComponent } from './search-list/search-list.component';
import { TablesComponent } from './tables/tables.component';



@NgModule({
  declarations: [
    ButtonsComponent,
    CalendarioComponent,
    ChartsComponent,
    ChatsComponent,
    ContactListComponent,
    DataTableComponent,
    FormsElementsComponent,
    FormSelect2Component,
    ListJobsComponent,
    PreferenceFinderComponent,
    ProfileComponent,
    ProfileSettingComponent,
    SearchListComponent,
    TablesComponent
  ],
  imports: [
    CommonModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule
  ],
	exports: [
		ButtonsComponent,
    CalendarioComponent,
    ChartsComponent,
    ChatsComponent,
    ContactListComponent,
    DataTableComponent,
    FormsElementsComponent,
    FormSelect2Component,
    ListJobsComponent,
    PreferenceFinderComponent,
    ProfileComponent,
    ProfileSettingComponent,
    SearchListComponent,
    TablesComponent
	]
})
export class ComponentModule { }
