import { AfterViewInit, Component, OnInit, VERSION, OnChanges, OnDestroy, ViewChild, Input, Output, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { of, throwError, Observable, Subject, map } from 'rxjs';
/* import { DataTableDirective } from 'angular-datatables'; */

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
/*
*@Services
**/
import { DocentesService } from '../../services/docentes.service';
import { DataSearchService } from '../../services/data-search.service';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { ToastrAlertService } from '../../services/toastr-alert.service';

/*
*@Interfaces
**/
import { DummyDocente } from '../../interfaces/searchList.interface';
import { Docente } from '../../interfaces/docente.interface';
import { Busqueda } from '../../interfaces/busqueda.interface';
import { AgrupadorAsig } from '../../interfaces/agrupador-asig.interface';
import { AreaPersona } from 'src/app/interfaces/area_personas.interface';
import { Division } from 'src/app/interfaces/division.interface';
import { Facultad } from 'src/app/interfaces/facultad.interface';


/* Bootstrap */
import { NgbActiveModal, NgbModal, NgbModalConfig, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { __makeTemplateObject } from 'tslib';
import { Asignatura } from 'src/app/interfaces/asignatura';
import { DataTableDirective } from 'angular-datatables/src/angular-datatables.directive';



@Component({
	selector: 'app-academic-search',
	templateUrl: './academic-search.component.html'
})
export class AcademicSearchComponent implements OnInit, OnDestroy {


	@ViewChild(DataTableDirective, { static: false })
	dtElement!: DataTableDirective;

	/* variables dataTable */
	dtOptions: DataTables.Settings = {};
	//dtOptions: any = {};
	dtTrigger: any = new Subject<void>();

	
	/*
	*@Variables de entorno
	**/
	public nameVersion = 'Angular ' + VERSION.full;
	public allDocentes: Docente[] = []; //---> Variable para mostrar el servicio información de los docentes
	public pruebaNgModel: string = '';
	public dataToFind: string = '';
	public dataSeleccionados: string = ''; //---> Variable para mostrar los seleccionados en la tabla
	seleccionado = {};
	public rutUserSesion!: string;
	public joinSeleccionados: any[] = [];


	/* public SearchDataInfo: Busqueda = {
		'escuelacarreranucleo': '',
		'areapersonas': '',
		'division': '',
		'facultad': ''
	};  */


	/* Variables de prueba */
	public seleccionados: any = [];
	public seleccionadosForEach: Docente[] = [];
	public seleccionadosFilter: Docente[] = [];
	public seleccionadosMap: Docente[] = [];

	public allItems: boolean = false;
	public soloSeleccionados: Docente[] = [];
	@ViewChild('checkboxAll', { static: false }) checkboxall!: ElementRef;


	


	/* variables modal chat */
	public chatInicial: any = {
		subject: 'lorem impus dolor emmet',
		message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.'
	}
	

	public seleccionadosChatUnit: any;
	public seleccionadosChatMas: any;

	public loadingSpinner: boolean = false;

	constructor(private router: Router,
		private serviceDocente: DocentesService,
		private http: HttpClient,
		private activroute: ActivatedRoute,
		private serviceSearch: DataSearchService,
		config: NgbModalConfig,
		private modalService: NgbModal,
		private _chatService: ChatServiceService,
		private toastr: ToastrAlertService) {
		console.log('%c[DEBUG]: constructor()', 'background: #0d6efd; color: #FFFFFF; padding: 2px 5px;');
	}
	ngOnInit(): void {
		console.log('%c[DEBUG]: ngOnInit()', 'background: #0d6efd; color: #FFFFFF;padding: 2px 5px;');
		/*
	  * @Functions opciones de la dataTable
		* La variable dtOptions se encuentra en la cabecera de class
		* 
	  **/

		this.rutUserSesion = "103821568";

		setTimeout(() => {
			this.dtOptions = {
				pagingType: 'full_numbers',
				pageLength: 5, //--> cantidad de row para mostrar al iniciar la tabla
				lengthMenu: [5, 10, 15], //--> filtro cantidad de row para mostrar al iniciar la tabla
				processing: true,
				language: { url: '../../../assets/lang/es-CL.json' }
			};
			console.warn('Lenght de la tabla', this.dtOptions.pageLength);
		});
		
		// this.getDataDocentes(); //---> Function servicio data	

		// console.warn('Lenght de la tabla', this.dtOptions.pageLength);
	}
	push() {
		throw new Error('Method not implemented.');
	}
	getDataDocentes(): void {
		console.log('get data docente >>>');
		this.serviceDocente.getDocentesList().subscribe({
			next: (data: Docente[]) => {
				this.allDocentes = data;
				console.log('%c[DEBUG] Data this.allDocentes >>>', 'background: #28a745; color: #FFFFFF; padding: 2px 5px;', this.allDocentes);
				// Calling the DT trigger to manually render the table         
				this.dtTrigger.next();
			},
			error: (err: Error) => console.error('HTTP Error', err),
			complete: () => console.log('%cHTTP request completed.', 'background: #fd7e14; color: #FFFFFF; padding: 2px 5px;')
		});
		/* this.serviceDocente.getDocentesList().subscribe( {
			next: (data: Docente[]) => { 
				this.allDocentes = data;
				console.log('%c[DEBUG] Data this.allDocentes >>>>>>>>>>', 'background: #28a745; color: #FFFFFF; padding: 2px 5px;', this.allDocentes );
				this.dtTrigger.next(data);
			 },
			error: (err: Error) => console.error('HTTP Error', err),
		complete: () => console.log('%cHTTP request completed.','background: #fd7e14; color: #FFFFFF; padding: 2px 5px;')
		}); */
		/* 
		
		
		this.serviceDocente.getDummyDocentes().subscribe({
			next: (data: DummyDocente[]) => { 
				this.allDocentes = data;
				console.log('%c[DEBUG] Data this.allDocentes >>>>>>>>>>', 'background: #28a745; color: #FFFFFF; padding: 2px 5px;', this.allDocentes );
				this.dtTrigger.next(data);
			 },
			error: (err: Error) => console.error('HTTP Error', err),
		complete: () => console.log('%cHTTP request completed.','background: #fd7e14; color: #FFFFFF; padding: 2px 5px;')
			}
		); */
	}
	ngOnDestroy(): void {
		console.log('%c[DEBUG]: ngOnDestroy()', 'background:#0d6efd; color: #FFFFFF; padding: 2px 5px;');

		this.dtTrigger.unsubscribe();
	}

	seeAcademic(id: any, dataUser: any) {
		console.log('%c[DEBUG]: Info usuario para Edit', 'background: #20c997; color: #FFFFFF; padding: 2px 5px;', id.trimEnd(), dataUser);
		//localStorage.setItem('dataUser', JSON.stringify(dataUser));
		this.router.navigate(['dashboard/profile', id.trimEnd()]);
	}

	chatAcademic(id: any, dataUser: any) {
		console.log('%c[DEBUG]: Info usuario para Delete', 'background: #6610f2; color: #FFFFFF; padding: 2px 5px;', id, dataUser);
		this.router.navigate(['dashboard/chat-cademico']);
	}

	search() {
		//this.allDocentes = [];
		//this.dtTrigger.; 
		//this.dtTrigger.unsubscribe();

		//if( this.allDocentes.length > 0) {
		//this.allDocentes = new Array<Docentes> = [];
		//this.allDocentes = undefined;

		//} 

		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			// Destroy the table first
			dtInstance.destroy();
			// Variable que trae la información de los docentes 
			this.allDocentes = [];
			// Call the dtTrigger to rerender again
			this.dtTrigger.next();

		});




		/* console.log('%c[DEBUG]: Buscando >>','background:#ffc107; color: #000; padding: 2px 5px;', this.SearchDataInfo);
		alert('SUCCESS \n\n' + JSON.stringify( this.SearchDataInfo, null, 4));  */
	}

	getSelectedItems(row: any, event: any) {
		/*
		*@Functions con .filter() sleccionando 1 o mas de 2
		**/
		this.seleccionadosFilter = this.allDocentes.filter(item => item.selected);
		this.allItems = false;
		
		//this.seleccionadosChat = this.seleccionadosFilter.length;
	 console.log('%cgetSelectedItems() | this.seleccionadosFilter >>', 'background:  #cff4fc; color:#084298; padding: 2px 5px', this.seleccionadosFilter);
		
	}

	selectAll(event: any) {
		/*
		*@Functions con .filter(), seleccionado a todos
		**/


		this.allDocentes.filter((selectedAll, index, all: Docente[]) => {
			selectedAll.selected = event.target.checked;
			// debugger;
			if (this.allItems === true) {
				this.soloSeleccionados.push(selectedAll);
			} else {
				this.soloSeleccionados = [];
				console.log('los 10 son false')
			}
		});
		console.log('%cselectAll | .filter() | this.soloSeleccionados >>', 'background:#d63384; color: #FFFFFF; padding: 2px 5px;', this.soloSeleccionados);
	}

	agregarNuevaBusqueda(argumento: Busqueda) {
		// debugger;
		// console.warn(argumento);
		console.log('%c[DEBUG]: this.dataBusqueda.emit >>', 'background:#ffc107; color: #000; padding: 2px 5px;', argumento);
		// alert('SUCCESS \n\n' + JSON.stringify(argumento, null, 4));
		

		if (argumento.division !== undefined && argumento.agrupadorAsig !== undefined && argumento.asignatura !== undefined){
			this.serviceDocente.getDocentesByAsignatura(argumento.asignatura).subscribe({
				next: (data: Docente[])=>{
					if (data.length > 0){

						this.allDocentes = data;
						this.toastr.showSuccess('Existe información para tu busqueda!', 'Enhorabuena!', null);
						console.log('%c[DEBUG] Data this.allDocentes >>>', 'background: #28a745; color: #FFFFFF; padding: 2px 5px;', this.allDocentes);
						// Calling the DT trigger to manually render the table         
						this.dtTrigger.next();
					}else{
						this.toastr.showError('No hay información para esta busqueda!', 'Error!', null);		
						console.log('%c[DEBUG] No data >>>', 'background: #dc3545; color: #FFFFFF; padding: 2px 5px;', argumento);
					}
				},
				error: (err: Error) => console.error('HTTP Error', err),
				complete:()=> console.log('%cHTTP request completed. getAsignaturaByFilters', 'background: #fd7e14; color: #FFFFFF; padding: 2px 5px;')
			});
		}else{
			this.toastr.showWarning('Debe ingresar los parámetros necesarios!', 'Atención!', null);		
			console.log('%c[DEBUG] No data >>>', 'background: #dc3545; color: #FFFFFF; padding: 2px 5px;', argumento);
		}

	}

	open(content: any, docente: any) {
		docente.selected = true;
		this.modalService.open(content);
		this.chatInicial.rutDocente = docente.rut;
		this.seleccionadosChatUnit = [docente];		
		this.selectChat( this.allDocentes.filter(item => item.selected))
	}

	openMass(content: any) {
		this.selectChat(this.allDocentes.filter(item => item.selected))
		// VERIFICAR SI HAY SELECCIONADOS
		if (this.allDocentes.filter(item => item.selected).length > 0) {
			this.modalService.open(content);
		} else {
			alert("Debe seleccionar al menos uno");
		}

		// console.log('%c[DEBUG]: Open Modal-DataDocente >>', 'background:#ffc107; color: #000; padding: 2px 5px;', docente);
		// this.chatInicial.rutDocente = docente.rut;
	}

	creaChatInicial(infochat: any) {

		console.log('Esta es la información que estoy enviando por el click', infochat);
		this.loadingSpinner = true;

		var _today = new Date();

		this.seleccionadosFilter = this.allDocentes.filter(item => item.selected);


		// RECORRER LOS SELECCIONADOS
		var _lim = this.seleccionadosFilter.length; // LIMITE ANTES DE NAVEGACIÓN
		var _count = 0;
		this.seleccionadosFilter.forEach(element => {
			console.log('%c[DEBUG] this.seleccionadosFilter >>>', 'background:  #cff4fc; color:#cff4fc; padding: 2px 5px;', element);


			const body =
			{
				fecha_reg: _today,
				activo: "1",
				anio_periodo: "",
				miembros: String(this.rutUserSesion).trim() + "," + String(element.rut).trim(),
				asunto: infochat.subject,
				cod_asignatura: "",
				modificado: _today,
				estado: "INICIADA"
			}

			// INSERT CABECERA
			this._chatService.saveChatCab(body).subscribe({
				next: (data: any) => {

					//INSERT EN CHAT DETALLE
					const body_det =
					{
						"id_cab": data[0].Identity,
						"mensaje": this.chatInicial.message,
						"fecha": _today,
						"hora": _today.getHours() + ':' + _today.getMinutes() + ':' + _today.getSeconds(),
						"autor": String(this.rutUserSesion).trim(),
						"leido": false
					}


					this._chatService.saveChatDetail(body_det).subscribe({
						next: (data: any) => {
							// _count++;							
						},
						error: (err: Error) => console.error('%cHTTP Error', 'background: #f8d7da; color: #842029; padding: 2px 5px;', err),
						complete: () => {
							console.log('%cHTTP request completed.', 'background: #d1e7dd; color: #0f5132; padding: 2px 5px;')
							// if (_lim = _count){
							// 	this.loadingSpinner = false;
							// 	this.modalService.dismissAll();

							// 	//NAVEGAR SECCIÓN DE CHAT
							// 	this.router.navigate(['/dashboard/chat-cademico']);
							// }

						}
					});



					console.log('%c[DEBUG] _chatService.saveChatCab >>>', 'background:  #cff4fc; color:#084298; padding: 2px 5px;', body);
				},
				error: (err: Error) => console.error('%cHTTP Error', 'background: #f8d7da; color: #842029; padding: 2px 5px;', err) ,
				complete: () => console.log('%cHTTP request completed.', 'background: #d1e7dd; color: #0f5132; padding: 2px 5px;')
			});

		}); //FOR EACH

		// /////// VERIFICAR ANTES DE NAVEGACIÓN
		// if (_ok) {

			setTimeout(() => {
				// this.cargadeDato();
				// this.sendChat = '';

				this.loadingSpinner = false;
				this.modalService.dismissAll();

				//NAVEGAR SECCIÓN DE CHAT
				this.router.navigate(['/dashboard/chat-cademico']);

			}, 2000);
		// }
	}


	selectChat(cantidadSeleccionados: any) {
		this.seleccionadosChatMas = cantidadSeleccionados.length;
	}
  
}
