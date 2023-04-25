import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AreaPersona } from '../../interfaces/area_personas.interface';
import { Division } from '../../interfaces/division.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as $ from 'jquery';

/* Servicios */
import { ToastrAlertService } from 'src/app/services/toastr-alert.service';
import { DataSearchService } from 'src/app/services/data-search.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { AgrupadorAsignaturaService } from 'src/app/services/agrupador-asig.service';

/* Interfaces */
import { Asignatura } from 'src/app/interfaces/asignatura';
import { AgrupadorAsig } from '../../interfaces/agrupador-asig.interface';
import { Facultad } from '../../interfaces/facultad.interface';



 interface Busqueda {
	fullsearch?: string;
	areapersonas?: string;
	division?: string;
	facultad?: string;
	escuelacarreranucleo?: string;
} 

interface Modalidad {
	id: string;
	modality: string;
}
 


@Component({
  selector: 'app-filter-asignaturas',
  templateUrl: './filter-asignaturas.component.html',
  styleUrls: ['./filter-asignaturas.component.scss']
})
export class FilterAsignaturasComponent implements OnInit {

/* 	public dataSearchAsignature: Busqueda = {
		'fullsearch': '',
		'escuelacarreranucleo': '',
		'areapersonas': '',
		'division': '',
		'facultad': ''	
	};  */
	@Output('data') dataBusqueda: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
	formSearch!: FormGroup;

	public exampleData!: Array<any>;

/* 	selectedCar!: number;
	cars: any = [
        { id: '1', name: 'Volvo' },
        { id: '2', name: 'Saab' },
        { id: '3', name: 'Opel' },
        { id: '4', name: 'Audi' },
    ]; */
@ViewChild('deleteSwal')




	public escuelaCarreraNucleo!: AgrupadorAsig[]; //---> Variable para mostrar los select
	public areaPersonas!: AreaPersona[]; //---> Variable para mostrar los select
	public division!: Division[]; //---> Variable para mostrar los select
	public asignatura!: any; //---> Variable para mostrar los select
	public modalidad: any;


	public selectedDivisionId!: any;
	public selectedAgrupadorId!: any;
 	public selectedAsignaturaId!: Asignatura;


	constructor( 
		private fb: FormBuilder, 
		private toastr: ToastrAlertService,
		private _serviceSearch: DataSearchService,
		private _serviceAsignatura: AsignaturaService,
		private _serviceAgrupAsig: AgrupadorAsignaturaService
		 ) {

	}

	ngOnInit(): void {
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.

	this.formSearch = this.fb.group({
			fullsearch:[null],
			division: [null],
			escuelacarreranucleo:[null],
			imparticion: [null],
			asignatura: [null]
		});

		/*
	  * @Functions call servicios para "select division"
		* La información de dataAgrupadorAsig vienen de un archivo json, folder data
		* Se utiliza el archivo serviceSearch
		*
	  **/

		this.division = this._serviceSearch.getDivision();
		console.warn(this.division)
		/*
	  * @Functions call servicios para "select modalidad"
		* 
		* Se utiliza el archivo serviceSearch
		*
	  **/

		this.modalidad = this._serviceSearch.imparticion;
		console.warn(this.modalidad)

		/*
	  * @Functions call servicios para "select escuelacarreranucleo"
		* La información de dataAgrupadorAsig vienen de un archivo json, folder data
		* Se utiliza el archivo serviceSearch
		*
	  **/
			///BUSCA DATOS DE AGRUPADOR
		this._serviceAgrupAsig.getAgrupadorList().subscribe({
			next: (data:AgrupadorAsig[])=> {
				this.escuelaCarreraNucleo = (data as AgrupadorAsig[])
				console.log('%cHTTP request this.dataAgrupadorAsig >>>', 'background: #6f42c1; color: #FFFFFF; padding: 2px 5px;', this.escuelaCarreraNucleo);
			}
		});
	}


	onChangeAgrupador(oEvent: any){

		this.selectedAgrupadorId = this.formSearch.value.escuelacarreranucleo;
		this.selectedDivisionId = this.formSearch.value.division;
		//BUSCA ASIGNATURAS		
		this._serviceAsignatura.getAsignaturaByFilters(this.selectedAgrupadorId, this.selectedDivisionId).subscribe({
			next: (data:Asignatura[])=>{
				this.asignatura = (data as Asignatura[])				
				console.log('%cHTTP request getAsignaturaByFilters >>>', 'background: #6f42c1; color: #FFFFFF; padding: 2px 5px;', data);
				
			}
		});
	}
	get getControl() { 
		return this.formSearch.controls; 
	}
	search() {
		//console.log('%c[DEBUG] search() >>>', 'background:  #cff4fc; color:#084298; padding: 2px 5px;', this.formSearch.value);
		/* alert('SUCCESS \n\n' + JSON.stringify( this.dataSearchAsignature, null, 4));  */

/* 	  const	fullSearch =  this.formSearch.get('fullsearch')?.value;
		const	escuelaCarreraNucleo =  this.formSearch.get('escuelacarreranucleo')?.value;
		const	areaPersonas =  this.formSearch.get('areapersonas')?.value;
		const	Division =  this.formSearch.get('division')?.value;
		const	Facultad =  this.formSearch.get('facultad')?.value  



	  
		this.dataSearchAsignature = {
			'fullsearch': fullSearch,
			'escuelacarreranucleo': escuelaCarreraNucleo,
			'areapersonas': areaPersonas,
			'division': Division,
			'facultad': Facultad
		} */

		this.dataBusqueda.emit(this.formSearch);
		console.log('%cHTTP request completed. SON', 'background:  #cff4fc; color:#084298; padding: 2px 5px;', this.formSearch.value);
		/* alert('SUCCESS \n\n' + JSON.stringify( this.dataBusqueda, null, 4));  */
	}

	resetButton() {
		this.formSearch.reset()
		this.dataBusqueda.emit(this.formSearch.value);
	}






}
