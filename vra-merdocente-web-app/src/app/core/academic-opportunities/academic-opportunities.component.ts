import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, VERSION, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError, Observable, Subject, map } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

/* Servicios */
import { AsignaturasService } from '../../services/asignaturas.service';
import { AsignaturaService } from '../../services/asignatura.service';
import { ToastrAlertService } from '../../services/toastr-alert.service';
/*
*@Interfaces
**/
import { Busqueda } from '../../interfaces/busqueda.interface';
import { event } from 'jquery';




interface Asignaturas {
    cod_asignatura?:         number;
    descripcion_asignatura?: string;
    cod_modulo?:             string;
    facultad?:               number;
    desc_agrupador?:         string;
    regimen?:                string;
    disciplina?:             string;
    nivel?:                  number;
    id_plan?:                number;
    cod_plan?:               null;
    descripcion_plan?:       null;
    id_actividad?:           string;
    desc_actividad?:         string;
    clase_imparticion?:      string;
		selected?: 							boolean;
}

interface FormChild {
	asignatura?: number;
	division?: string;
	escuelacarreranucleo?: number;
	fullsearch?: string;
	imparticion?: string;
}


@Component({
  selector: 'app-academic-opportunities',
  templateUrl: './academic-opportunities.component.html',
  styleUrls: ['./academic-opportunities.component.scss']
})
export class AcademicOpportunitiesComponent implements OnInit, OnDestroy {

public nameVersion = 'Angular ' + VERSION.full;
/* Variables de los servicios */
public getAllAsignasturas: Asignaturas[] = [];

@ViewChild(DataTableDirective, { static: false })	dtElement!: DataTableDirective;

/* variables dataTable */
dtOptions: DataTables.Settings = {};
//dtOptions: any = {};
dtTrigger: any = new Subject<void>();


/* Variables de prueba */
public seleccionados: any = [];
public seleccionadosForEach: Asignaturas[] = [];
public seleccionadosFilter: Asignaturas[] = [];
public seleccionadosMap: Asignaturas[] = [];

public allItems: boolean = false;
public soloSeleccionados: Asignaturas[] = [];

@ViewChild('checkboxAll', { static: false }) checkboxall!: ElementRef;


 public searchDataInfo: Busqueda[] = []
	
 public loadingData: boolean = true;



 public lorem!: any;


constructor( 
	private fb: FormBuilder, 
	private serviceAsignaturas: AsignaturasService, 
	private http: HttpClient, 
	private activroute: ActivatedRoute, 
	private router: Router,
	private asignaturaService: AsignaturaService ,
	private toastr: ToastrAlertService,
	) 
	{
		console.log('%c[DEBUG]: constructor()','background: #0d6efd; color: #FFFFFF; padding: 2px 5px;'); 
	}

ngOnInit(): void {

	 setTimeout(() => {
			this.dtOptions = {
				pagingType: 'full_numbers',
				pageLength: 10, //--> cantidad de row para mostrar al iniciar la tabla
				lengthMenu: [10, 15, 25], //--> filtro cantidad de row para mostrar al iniciar la tabla
				processing: true,
				language: { url: '../../../assets/lang/es-CL.json' }
			};
			console.warn('Lenght de la tabla', this.dtOptions.pageLength);
		});
		this.getDataAsignaturas();

		console.log('%c[DEBUG]: ngOnInit()','background: #0d6efd; color: #FFFFFF;padding: 2px 5px;');

		
}


getDataAsignaturas(): void {
	/* this.serviceAsignaturas.getAsignaturas().subscribe({
			next: (data: Asignaturas[]) => {
				 this.getAllAsignasturas = data;
				console.log('%c[DEBUG] data form getAsignaturas() >>>', 'background:orange; color:#fff; padding: 2px 5px;', this.getAllAsignasturas);
				// Calling the DT trigger to manually render the table         
				this.dtTrigger.next();
			},
			error: (err: Error) => console.error('%cHTTP Error','background: #f8d7da; color: #842029; padding: 2px 5px;', err),
    	complete: () => console.log('%cHTTP request completed.','background: #d1e7dd; color: #0f5132; padding: 2px 5px;')
		}); */

		//this.searchTable();  
}

ngOnDestroy(): void {
		console.log('%c[DEBUG]: ngOnDestroy()', 'background:#0d6efd; color: #FFFFFF; padding: 2px 5px;');

		this.dtTrigger.unsubscribe();
}

agregarNuevaBusqueda( e: any, form: FormGroup) {
	console.log('%cHTTP request form PARENT', 'background:  #cff4fc; color:#084298; padding: 2px 5px;', form.value);
	this.lorem = form.value;

 const datainfochild = {
		asignatura: this.lorem.asignatura,
		division: this.lorem.division,
		escuelacarreranucleo: this.lorem.escuelacarreranucleo,
		fullsearch: this.lorem.fullsearch,
		imparticion: this.lorem.imparticion 
	}  
	console.log('%c[DEBUG | PARENT ]: this.dataBusqueda.emit >>>', 'background:#ffc107; color: #000; padding: 2px 5px;', 'form >>', datainfochild );

if( datainfochild.escuelacarreranucleo != null && datainfochild.division != null ) {
	this.toastr.showSuccess('Existe información para tu busqueda!', 'Enhorabuena!', null);
	console.log('%c[DEBUG] Ok data >>>', 'background: #28a745; color: #FFFFFF; padding: 2px 5px;', datainfochild);


	/* Activar servicio porque hay data del hijo */
	this.asignaturaService.getAsignaturaByFilters(datainfochild.escuelacarreranucleo,datainfochild.division).subscribe({
			next: (data: any)=>{
			this.getAllAsignasturas = data;
				console.log('%c[DEBUG] data from getAsignaturaByFilters >>>', 'background: #28a745; color: #FFFFFF; padding: 2px 5px;', data);
				// Calling the DT trigger to manually render the table         
				this.dtTrigger.next();
			},
			error: (err: Error) => console.error('HTTP Error', err),
			complete:()=> console.log('%cHTTP request completed. getAsignaturaByFilters', 'background: #fd7e14; color: #FFFFFF; padding: 2px 5px;')
		});

	
	} else {
		this.toastr.showError('No hay información para esta busqueda!', 'Error!', null);		
		console.log('%c[DEBUG] No data >>>', 'background: #dc3545; color: #FFFFFF; padding: 2px 5px;', datainfochild);
			
	}
		this.searchTable();  
 
}

getSelectedItems(row: any, event: any) {
		/*
		*@Functions con .filter() sleccionando 1 o mas de 2
		**/
		this.seleccionadosFilter = this.getAllAsignasturas.filter(item => item.selected);
		this.allItems = false;
		
		//this.seleccionadosChat = this.seleccionadosFilter.length;
	 console.log('%cgetSelectedItems() | this.seleccionadosFilter >>', 'background:  #cff4fc; color:#084298; padding: 2px 5px', this.seleccionadosFilter);
		
}

selectAll(event: any) {
	/*
	*@Functions con .filter(), seleccionado a todos
	**/


	this.getAllAsignasturas.filter( (selectedAll, index, all: Asignaturas[]) => {
		selectedAll.selected = event.target.checked;
		if (this.allItems === true) {
			this.soloSeleccionados.push(selectedAll);
		} else {
			this.soloSeleccionados = [];
			console.log('los 10 son false')
		}
	});
	console.log('%cselectAll | .filter() | this.soloSeleccionados >>', 'background:#d63384; color: #FFFFFF; padding: 2px 5px;', this.soloSeleccionados);
}

searchTable() {


	/*  IMPOTANTE: 
	
	Esta función tiene la idea de traer en una variable la información de buscada en el filtro, por lo que si fijan esta función se ejecuta el getDataAsignaturas().

	Por lo mismo se esta ejecutando un if el cual pregunta si this.getAllAsignasturas viene vacio, muestra un spinner si viene con data oculta el spinner
	
	*/


		
		if(this.getAllAsignasturas.length != 0 ) {
			console.log('Es > 0, hidden spinner ');			
			this.loadingData = true;
		} else {
			console.log('Es <  0, show spinner');
			this.loadingData = false;
			
		}

		//this.allDocentes = [];
		//this.dtTrigger.; 
		//this.dtTrigger.unsubscribe();

		//if( this.allDocentes.length > 0) {
		//this.allDocentes = new Array<Docentes> = [];
		//this.allDocentes = undefined;

		//} 

	/* 	this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			// Destroy the table first
			dtInstance.destroy();
			// Variable que trae la información de los docentes 
			this.getAllAsignasturas = [];
			// Call the dtTrigger to rerender again
			this.dtTrigger.next();

		}); */

		 
			/* this.dtElement.dtInstance.then( (dtInstance: DataTables.Api) => {
			// Destroy the table first
			dtInstance.destroy();
			// Variable que trae la información de los docentes 
			this.getAllAsignasturas = [];
			// Call the dtTrigger to rerender again
			this.dtTrigger.next();

		}); */

		 console.log('%c[DEBUG]: Buscando >>','background:#ffc107; color: #000; padding: 2px 5px;', this.searchDataInfo);
		/* alert('SUCCESS \n\n' + JSON.stringify( this.searchDataInfo, null, 4));  */
	}

	addAsignatura(_asignatura: any) {
		 alert('ADD \n\n' + 'function addAsignatura()' + JSON.stringify( _asignatura, null, 4));			 
	}
	deleteAsignatura(_asignatura: any) {
		alert('DELETE \n\n' + 'function deleteAsignatura()' + JSON.stringify( _asignatura, null, 4));
	}
	sendChat() {
		alert('SUCCESS \n\n' + 'function sendChat()');
	}

}
