import { Component, OnInit, VERSION, OnChanges, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { of, throwError, Observable, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

/*
*@Services
**/
import { DocentesService } from '../../services/docentes.service';
/*
*@Interfaces
**/
import { Docente } from '../../interfaces/docente.interface';
import { AllAsignaturas } from '../../interfaces/all_asignaturas.interface';

@Component({
  selector: 'app-academic-perfil',
  templateUrl: './academic-perfil.component.html'
})
export class AcademicPerfilComponent implements OnInit {

public nameVersion = 'Angular ' + VERSION.full;
public dataAcademicoId!:any;
public fullDataAcademic: Docente[] = [];


	constructor( private router: Router, private serviceDocente: DocentesService, private http: HttpClient, private activateRoute: ActivatedRoute, )
	 {
		console.log('%c[DEBUG]: constructor()','background: #0d6efd; color: #FFFFFF; padding: 2px 5px;'); 
	
		 
	
	}

	ngOnInit(): void {
		console.log('%c[DEBUG]: ngOnInit()','background: #0d6efd; color: #FFFFFF;padding: 2px 5px;');

		this.activateRoute.params.subscribe(params => {
      this.dataAcademicoId = params['id'];
      console.log('%c[DEBUG]: call data dataAcademicoId  >>>','background: #cff4fc; color: #055160;padding: 2px 5px;', this.dataAcademicoId);
    });
	
		this.serviceDocente.getDocentesByRut(this.dataAcademicoId)
		.subscribe({
			/* (resp: any) => {this.fullDataAcademic = resp;console.log('%c[DEBUG] Data de la tabla input getDocentesByRut() >>>>>>>>>>', 'background: #28a745; color: #FFFFFF; padding: 2px 5px;', resp); 
			} */
			next: ( data:any) => { 
				 this.fullDataAcademic = (data as any);
				console.log('%c[DEBUG] Data this.asignaturasPerfil  >>>', 'background: #fff3cd; color: #664d03; padding: 2px 5px;',  this.fullDataAcademic );
			 },
			error: (err: Error) => console.error('HTTP Error', err),
    	complete: () => console.log('%cHTTP request completed.','background: #fd7e14; color: #FFFFFF; padding: 2px 5px;')
		
		});
		console.log("ngOnInit After this.docentesService.getDocentesByRut:");	
	
	/* 	getDocentesByRut(_rut:  string ):Observable <Docente> {
  	  return this.http.get<Docente>(this.api_backend.desarrollo +  "api/docentes/" + _rut.toString()   );
  } */
	
	}
}
