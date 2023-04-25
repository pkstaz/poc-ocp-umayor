import { Component, OnInit, VERSION, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { of, throwError, Observable, Subject, map } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

/*  
*@Servicios
**/
import { DocentesService } from '../../services/docentes.service';
import { ToastrAlertService } from '../../services/toastr-alert.service';

/* 
*@Interfaces 
**/

import { Docente } from '../../interfaces/docente.interface';
import { AllAsignaturas } from '../../interfaces/all_asignaturas.interface';
import { AsignaPreferentes } from '../../interfaces/asignaturas_preferentes.interface';
import { Nombre } from '../../interfaces/searchList.interface';

interface DocenteRedes {
  rut: string,
  resumen: string,
  linkedin: string,
  facebook: string,
  twitter: string,
  whatsapp: string
}

@Component({
  selector: 'app-academic-profile',
  templateUrl: './academic-profile.component.html'
})
export class AcademicProfileComponent implements OnInit, OnDestroy {

	/** @Variables del entorno */ 
	profileForm!: FormGroup;
	public submitted: boolean = false;



	public nameVersion = 'Angular ' + VERSION.full;
	// manejo de datos del perfil de docente en FrontEnd
	docentesPerfil!: Docente;
	asignaturasDummyPerfil: AllAsignaturas[] = [];
	userAcademic: Docente[] = [];
	userAsignaturas: AsignaPreferentes[] = [];
	
	public index!: any;


	public dataAcademicoId!: string; //---> Variables para obtener el rut del docente y pasarlo por un servicio
	public fullDataAcademic: Docente = {}; //---> Variables para mostrar los datos de docente, forma funcional
	public addDataAcademic: DocenteRedes = {
		rut: '',
		resumen: '',
		linkedin: '',
		facebook: '',
		twitter: '',
		whatsapp: ''
	};
	/* public fullDataAsignatura: Asignatura = {}; */
	public dummySummary!: string;



	/* variables dataTable */
	dtOptions: DataTables.Settings = {};
	dtTrigger: any = new Subject<void>();

	/*
	* variables componente equipos e inputs
	
	**/
	public value: string = ''; //---> Variable counter textarea
  public maxlength: number = 1;//---> Variable counter textarea
  public maxChars: number = 223;
  public charachtersCount!: number;//---> Variable counter textarea
	public inputReadonly: boolean = true;	
	public isDisabled: boolean = true;
	public DISABLED: boolean = true;
	public widthInput: number = 95;
	public tooltip: string = 'tooltip';
	public placement: string = 'top';
	public titleInput: string = 'Agregar una persona al equipo';
	enable = true;

	styleTable = {
		width: '100%'
	}

	constructor(
		private router: Router, 
		private serviceDocente: DocentesService, 
		private http: HttpClient, 
		private activateRoute: ActivatedRoute,
		private fb: FormBuilder,
		private toastr: ToastrAlertService
	) { 
		console.log('%c[DEBUG]: constructor()','background:  #cff4fc; color:#084298; padding: 2px 5px;'); 
	}


	/*
  * @Inputs is-invalid
  **/
  get fullnombreInValid() {
    //return this.profileForm.get('fullnombre')?.invalid && this.profileForm.get('fullnombre')?.touched
		return this.profileForm.get('fullnombre')?.invalid && this.submitted
  }
	get summaryInValid() {
    return this.profileForm.get('summary')?.invalid && this.profileForm.get('summary')?.pristine
  }
	get EscCarrNuclInValid() {
		 return this.profileForm.get('EscCarrNucl')?.invalid && this.profileForm.get('EscCarrNucl')?.pristine
	}
	get areaPersInValid() {
 return this.profileForm.get('areaPers')?.invalid && this.profileForm.get('areaPers')?.pristine
	}
	get facultadInValid() {
 return this.profileForm.get('facultad')?.invalid && this.profileForm.get('facultad')?.pristine
	}
	get divPersonalInValid() {
		 return this.profileForm.get('divPersonal')?.invalid && this.profileForm.get('divPersonal')?.pristine
	}
	get jerarquiaInValid() {
		 return this.profileForm.get('jerarquia')?.invalid && this.profileForm.get('jerarquia')?.pristine
	}
	get tituloInValid() {
		 return this.profileForm.get('titulo')?.invalid && this.profileForm.get('titulo')?.pristine
	}
	get nivelEducMaxInValid() {
		 return this.profileForm.get('nivelEducMax')?.invalid && this.profileForm.get('nivelEducMax')?.pristine
	}
	get jornadaCttoInValid() {
 return this.profileForm.get('jornadaCtto')?.invalid && this.profileForm.get('jornadaCtto')?.pristine
	}
	get funcionPpalInValid() {
 return this.profileForm.get('funcionPpal')?.invalid && this.profileForm.get('funcionPpal')?.pristine
	}
	get emailInValid() {
return this.profileForm.get('email')?.invalid && this.profileForm.get('email')?.touched
	}
	get telefonoInValid() {
return this.profileForm.get('telefono')?.invalid && this.profileForm.get('telefono')?.touched
	}
	get twitterInValid() {
return this.profileForm.get('twitter')?.invalid && this.profileForm.get('twitter')?.touched
	}
	get facebookInValid() {
return this.profileForm.get('facebook')?.invalid && this.profileForm.get('facebook')?.touched
	}
	get linkedinInValid() {
return this.profileForm.get('linkedin')?.invalid && this.profileForm.get('linkedin')?.touched
	}

	/*
  * @Inputs is-valid
  **/
  get fullnombreValid() {
    //return this.profileForm.get('fullnombre')?.pristine && this.profileForm.get('fullnombre')?.pristine
		return this.profileForm.get('fullnombre')?.valid && this.profileForm.get('fullnombre')?.pristine
  }
	get summaryValid() {
    return this.profileForm.get('summary')?.valid && this.profileForm.get('summary')?.pristine
  }
	get EscCarrNuclValid() {
		return this.profileForm.get('EscCarrNucl')?.valid && this.profileForm.get('EscCarrNucl')?.pristine
	}
	get areaPersValid() {
return this.profileForm.get('areaPers')?.valid && this.profileForm.get('areaPers')?.pristine
	}
	get facultadValid() {
return this.profileForm.get('facultad')?.valid && this.profileForm.get('facultad')?.pristine
	}
	get divPersonalValid() {
		return this.profileForm.get('divPersonal')?.valid && this.profileForm.get('divPersonal')?.pristine
	}
	get jerarquiaValid() {
return this.profileForm.get('jerarquia')?.valid && this.profileForm.get('jerarquia')?.pristine
	}
	get tituloValid() {
return this.profileForm.get('titulo')?.valid && this.profileForm.get('titulo')?.pristine
	}
	get nivelEducMaxValid() {
return this.profileForm.get('nivelEducMax')?.valid && this.profileForm.get('nivelEducMax')?.pristine
	}
	get jornadaCttoValid() {
return this.profileForm.get('jornadaCtto')?.valid && this.profileForm.get('jornadaCtto')?.pristine
	}
	get funcionPpalValid() {
return this.profileForm.get('funcionPpal')?.valid && this.profileForm.get('funcionPpal')?.pristine
	}
	get emailValid() {
return this.profileForm.get('email')?.valid && this.profileForm.get('email')?.touched
	}
	get telefonoValid() {
return this.profileForm.get('telefono')?.valid && this.profileForm.get('telefono')?.touched
	}
	get twitterValid() {
return this.profileForm.get('twitter')?.valid && this.profileForm.get('twitter')?.touched
	}
	get facebookValid() {
return this.profileForm.get('facebook')?.valid && this.profileForm.get('facebook')?.touched
	}
	get linkedinValid() {
return this.profileForm.get('linkedin')?.valid && this.profileForm.get('linkedin')?.touched
	}


	ngOnInit(): void {
		console.log('%c[DEBUG]: ngOnInit()','background:  #cff4fc; color:#084298; padding: 2px 5px;',);

		/*
  * @Function "params" para obtener el rut desde la url que viene desde el componente academic-search
  * El llamado se realiza de forma directa desde el ngOnInit()
  **/

		this.activateRoute.params.subscribe( params => {
      this.dataAcademicoId = params['id'];
      console.log('%c[DEBUG]: call data dataAcademicoId  >>>','background: #cff4fc; color: #055160;padding: 2px 5px;', this.dataAcademicoId);
    });

		/*
  * @Function "getDocentesByRut" para obtener la información del academico consultado por el rut
  * El llamado se realiza de forma directa desde el ngOnInit()
  **/
		this.serviceDocente.getDocentesByRut(this.dataAcademicoId).subscribe({
			next: (data: any) => {  
				this.fullDataAcademic = (data[0] as Docente);
				console.log('%c[DEBUG] Data this.fullDataAcademic >>>', 'background:  #cff4fc; color:#084298; padding: 2px 5px;',  this.fullDataAcademic);
			  
			
				if(data[0]) {
					this.serviceDocente.getDataRedes(this.dataAcademicoId).subscribe({						
						next: (resp:any) => {
						this.addDataAcademic = (resp[0] as DocenteRedes);
						console.log('%c[DEBUG] Data this.fullDataAcademic >>>', 'background:  #cff4fc; color:#084298; padding: 2px 5px;', this.addDataAcademic);

						/*
					* @Function seteo del formulario para profile edit
					* El llamado se realiza de forma directa desde el ngOnInit()
					**/				
					if(resp[0]) {
						this.profileForm.setValue({
								'fullnombre': this.fullDataAcademic.nombre || 'no hay info...',
								'summary': this.addDataAcademic.resumen || 'no hay info...',
								'EscCarrNucl': this.fullDataAcademic.esc_carr_nuc|| 'no hay info...',
								'areaPers': this.fullDataAcademic.area_pers || 'no hay info...',
								'facultad': this.fullDataAcademic.facultad || 'no hay info...',
								'divPersonal': this.fullDataAcademic.division_pers || 'no hay info...',
								'jerarquia': this.fullDataAcademic.jerarquia || 'no hay info...',
								'titulo': this.fullDataAcademic.titulo || 'no hay info...',
								'nivelEducMax': this.fullDataAcademic.nivel_educ_max || 'no hay info...',
								'jornadaCtto': this.fullDataAcademic.jornada_ctto || 'no hay info...',
								'funcionPpal': this.fullDataAcademic.funcion_ppal || 'no hay info...',
								'email': this.fullDataAcademic.email || 'no hay info...',
								'telefono': this.addDataAcademic.whatsapp || '',
								'twitter': this.addDataAcademic.twitter || '',
								'facebook': this.addDataAcademic.facebook || '',
								'linkedin': this.addDataAcademic.linkedin || ''
							});
							} else {
								this.profileForm.setValue({
								'fullnombre': this.fullDataAcademic.nombre || 'no hay info...',
								'summary': '' || 'no hay info...',
								'EscCarrNucl': this.fullDataAcademic.esc_carr_nuc|| 'no hay info...',
								'areaPers': this.fullDataAcademic.area_pers || 'no hay info...',
								'facultad': this.fullDataAcademic.facultad || 'no hay info...',
								'divPersonal': this.fullDataAcademic.division_pers || 'no hay info...',
								'jerarquia': this.fullDataAcademic.jerarquia || 'no hay info...',
								'titulo': this.fullDataAcademic.titulo || 'no hay info...',
								'nivelEducMax': this.fullDataAcademic.nivel_educ_max || 'no hay info...',
								'jornadaCtto': this.fullDataAcademic.jornada_ctto || 'no hay info...',
								'funcionPpal': this.fullDataAcademic.funcion_ppal || 'no hay info...',
								'email': this.fullDataAcademic.email || 'no hay info...',
								'telefono': '' || 'no hay info...',
								'twitter': '' || 'no hay info...',
								'facebook': '' || 'no hay info...',
								'linkedin': '' || 'no hay info...'
							});
							}						
						}
					});					
				} else {
					throw new Error('Method not implemented.');					
				}

			/*
			* @Function dividiendo la cadena "this.fullDataAcademic.name" usando el carácter espacio
			* El llamado se realiza de forma directa desde el ngOnInit()
			**/   
				 if (this.fullDataAcademic.nombre) {
						let fragmentedName = this.fullDataAcademic.nombre.split(' ');
						console.log('Dato nombre fragmentado (i) >>>', fragmentedName );
					} else {
						// 👇️ this runs
						console.log('fullDataAcademic.nombre not found');
					}                                  
			 },
			error: (err: Error) => console.error('%cHTTP Error','background: #f8d7da; color: #842029; padding: 2px 5px;', err),
    	complete: () => console.log('%cHTTP request completed.','background: #d1e7dd; color: #0f5132; padding: 2px 5px;')
		
		});
		console.log("ngOnInit After this.docentesService.getDocentesByRut:");	


		   
    	this.dtOptions = {
				pagingType: 'full_numbers',
				pageLength: 2,
				lengthMenu : [2, 10, 25],
				processing: true,
				language: {
					url: '../../../assets/lang/es-CL.json'
				}
			};
			 	

		/*
  * @Function "getAsignaturasByRut" para obtener la información del academico consultado por el rut
  * El llamado se realiza de forma directa desde el ngOnInit() '100245779'
  **/
		this.serviceDocente.getAsignaturasByRut(this.dataAcademicoId).subscribe({
			next: (data: AsignaPreferentes[] ) => {
				/* this.userAsignatura */  
				 this.userAsignaturas = (data as AsignaPreferentes[]);
				 this.dtTrigger.next();
				console.log('%c[DEBUG] Data getAsignaturasByRut >>>', 'background:  #cff4fc; color:#084298; padding: 2px 5px;',  data);
			},
			error: (err: Error) => console.error('%cHTTP Error','background: #f8d7da; color: #842029; padding: 2px 5px;', err),
    	complete: () => console.log('%cHTTP request completed.','background: #d1e7dd; color: #0f5132; padding: 2px 5px;')
		});
		

		this.serviceDocente.getAsignaturasList().subscribe({
			next: (data) => {
				console.log('%c[DEBUG] Data getAsignaturasList() >>', 'background:orange; color:#fff; padding: 2px 5px;',  data);
			},
			error: (err: Error) => console.error('%cHTTP Error','background: #f8d7da; color: #842029; padding: 2px 5px;', err),
    	complete: () => console.log('%cHTTP request completed.','background: #d1e7dd; color: #0f5132; padding: 2px 5px;')
		});
		
	/*
  * @Function FormBuilder formulario para profile edit
  * El llamado se realiza de forma directa desde el ngOnInit()
  **/

 		this.profileForm = this.fb.group({
			fullnombre: [{value: '', disabled: this.isDisabled}],
			summary: ['', Validators.required],
			EscCarrNucl: [{value:'', disabled: this.isDisabled}],
			areaPers: [{ value: '', disabled: this.isDisabled }],
			facultad: [{ value: '', disabled: this.isDisabled }],
			divPersonal: [{ value: '', disabled: this.isDisabled }],
			jerarquia: [{ value: '', disabled: this.isDisabled }],
			titulo: [{ value: '', disabled: this.isDisabled }],
			nivelEducMax: [{ value: '', disabled: this.isDisabled }],
			jornadaCtto: [{ value: '', disabled: this.isDisabled }],
			funcionPpal: [{ value: '', disabled: this.isDisabled }],
			email: [{ value: '', disabled: this.isDisabled }],
			telefono: ['', Validators.required],
			twitter: ['', Validators.required],
			facebook: ['', Validators.required],
			linkedin: ['', Validators.required]
		 });

		/* Servicio Dummy Asignaturas */
		this.serviceDocente.getDummyAsignaturas().subscribe( {
			next: ( data: AllAsignaturas) => { 
				this.asignaturasDummyPerfil = (data as any);				
			 },
			error: (err: Error) => console.error('%cHTTP Error','background: #f8d7da; color: #842029; padding: 2px 5px;', err),
    	complete: () => console.log('%cHTTP request completed.','background: #d1e7dd; color: #0f5132; padding: 2px 5px;')
		});

		this.index = this.activateRoute.snapshot.paramMap.get('id');
    console.log('%c[DEBUG]: call this.index >>>','background: #0d6efd; color: #FFFFFF; padding: 2px 5px;', this.index);
  }

	/*
  * @Function Get del formulario para respuesta sus validaciones
  * El llamado se realiza en el contructor
  **/
  get getControl() {
		//this.profileForm.controls['fullnombre'].disable();
    return this.profileForm.controls;
  }

	ngOnDestroy(): void {
   console.log('%c[DEBUG]: ngOnDestroy()','background:#0d6efd; color: #FFFFFF; padding: 2px 5px;');
	 this.dtTrigger.unsubscribe();
  }	 

	onSubmit(): void {	
		const dataAcademico: DocenteRedes = {
			"rut": this.dataAcademicoId,
			"resumen": this.profileForm.value.summary,
			"whatsapp": this.profileForm.value.telefono,
			"twitter": this.profileForm.value.twitter,
			"facebook": this.profileForm.value.facebook,
			"linkedin": this.profileForm.value.linkedin
		};
		this.toastr.showSuccess('Tu formulario, fue actualizado con éxito!', 'Enhorabuena!', null);	
		
 this.serviceDocente.createDocente(dataAcademico).subscribe( {
			next: (data) => { 
				console.log('%cHTTP completed sendData.','background: #d1e7dd; color: #0f5132; padding: 2px 5px;');
				this.toastr.showSuccess('El Formulario, fue actualizado con éxito!', 'Enhorabuena!', null);			
			 },
			error: (err: Error) => {
				this.toastr.showError('El Formulario, tiene un error!', 'Error!', null);
				console.error('%cHTTP Error','background: #f8d7da; color: #842029; padding: 2px 5px;', err);
			},
    	complete: () => console.log('%cHTTP request completed.','background: #d1e7dd; color: #0f5132; padding: 2px 5px;')
		}); 
		
		
	
		
		/* this.http.post<any>('https://reqres.in/api/posts', body, { headers }).subscribe(data => {
        this.postId = data.id;
    });
 */
		
		console.log('%cEvento click del ReactiveForm >>>','background:  #cff4fc; color:#084298; padding: 2px 5px;', this.profileForm.getRawValue() );

		console.log('%cEvento click send const dataAcademico >>>','background: #0d6efd; color: #FFFFFF; padding: 2px 5px;', dataAcademico );

		 
		 //alert('SUCCESS \n\n' + JSON.stringify(this.profileForm.value, null, 4));
	}

	activarToastr() {
		console.log('click btn')
		this.toastr.showSuccess('Tu formulario, fue actualizado con éxito!', 'Enhorabuena!', null);
	}
}
