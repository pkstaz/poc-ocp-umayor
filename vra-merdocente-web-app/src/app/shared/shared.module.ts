import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { FilterTableComponent } from './filter-table/filter-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterAsignaturasComponent } from './filter-asignaturas/filter-asignaturas.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    FooterComponent,
    NavComponent,
    SidebarNavComponent,
    FilterTableComponent,
    FilterAsignaturasComponent
  ],
  imports: [
    CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		SweetAlert2Module.forRoot(),
		NgSelectModule
  ],
	exports: [
		SidebarNavComponent,
		BreadcrumbsComponent,
		NavComponent,
		FooterComponent,
		FilterTableComponent,
		FilterAsignaturasComponent
	]
})
export class SharedModule { }
