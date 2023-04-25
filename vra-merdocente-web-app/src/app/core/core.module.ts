import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AcademicReportComponent } from './academic-report/academic-report.component';
import { AcademicSearchComponent } from './academic-search/academic-search.component';
import { AcademicChatComponent } from './academic-chat/academic-chat.component';
import { AcademicProfileComponent } from './academic-profile/academic-profile.component';
import { AcademicCalendarComponent } from './academic-calendar/academic-calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoFoundComponent } from './no-found/no-found.component';
import { CoreDashboardComponent } from './core-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { AcademicPerfilComponent } from './academic-perfil/academic-perfil.component';
import { CapitalizeFirstPipe } from '../pipes/capitalize-first.pipe';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule, NgbModalModule, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ChatBubleComponent } from './academic-chat/chat-buble/chat-buble.component';
import { SubjectChatComponent } from './academic-chat/subject-chat/subject-chat.component';
import { AcademicOpportunitiesComponent } from './academic-opportunities/academic-opportunities.component';

/* Otros */
@NgModule({
  declarations: [
    AcademicReportComponent,
    AcademicSearchComponent,
    AcademicChatComponent,
    AcademicProfileComponent,
    AcademicCalendarComponent,
    DashboardComponent,
    NoFoundComponent,
    CoreDashboardComponent,
    AcademicPerfilComponent,
		CapitalizeFirstPipe,
  	ChatBubleComponent,
    SubjectChatComponent,
    AcademicReportComponent,
		AcademicOpportunitiesComponent		
  ],
  imports: [
    CommonModule,
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		SharedModule,
		NgbModule,
		NgbModalModule,
		DataTablesModule,
		ReactiveFormsModule,
		ToastrModule,
		BrowserAnimationsModule,
		FlatpickrModule.forRoot(),
		CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
	exports: [
		NoFoundComponent,
		DashboardComponent,
		CoreDashboardComponent,
		AcademicCalendarComponent,
		AcademicChatComponent,
		AcademicChatComponent,
		AcademicReportComponent,
		ChatBubleComponent,
		AcademicReportComponent,
		AcademicOpportunitiesComponent
	],
	providers: [
		NgbModalConfig, 
		NgbModal
	]
})
export class CoreModule { }
