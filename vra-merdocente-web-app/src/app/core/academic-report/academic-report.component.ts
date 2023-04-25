import { Component, OnInit, VERSION, OnChanges, OnDestroy} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { DataTableDirective } from 'angular-datatables';
import { of, throwError, Observable, Subject, map } from 'rxjs';

/* @Services */
import { DocentesService } from '../../services/docentes.service';

/* @interfaces */
import { DummyDocente } from '../../interfaces/searchList.interface';
import { Docente } from 'src/app/interfaces/docente.interface';
/* import DataTables from 'datatables.net'; */

@Component({
  selector: 'app-academic-report',
  templateUrl: './academic-report.component.html'
})
export class AcademicReportComponent implements OnInit, OnChanges, OnDestroy {

	/* 
	*@variables de entorno 
	**/
	public nameVersion = 'Angular ' + VERSION.full;
	public allUsersDummy: DummyDocente[] = []; 
	public allDocentes: Docente[] = [];
	public pruebaNgModel: string = '';
	public dataToFind: string = '';
	
	// dtOptions: DataTables.Settings = {};
	dtOptions: any = {};
	dtTrigger: any = new Subject<void>();
	
	constructor( private router: Router, private serviceDocente: DocentesService, private http: HttpClient, private activroute: ActivatedRoute ) 
	{
		console.log('%c[DEBUG]: constructor()','background: #0d6efd; color: #FFFFFF; padding: 2px 5px;'); 
	}
	ngOnChanges() {
		console.log('%c[DEBUG]: ngOnChanges()','background: #0d6efd; color: #FFFFFF; padding: 2px 5px;');
	}
	ngOnInit(): void {
		console.log('%c[DEBUG]: ngOnInit()','background: #0d6efd; color: #FFFFFF;padding: 2px 5px;');

		

	/*
  * @Functions opciones de la dataTable
	* La variable dtOptions se encuentra en la cabecera de class
	* 
  **/
		setTimeout(()=>{  
    	this.dtOptions = {
				pagingType: 'full_numbers',
				pageLength: 5,
				lengthMenu : [5, 10, 25],
				processing: true,
				language: {
					url: '../../../assets/lang/es-CL.json'
				},
				// Declare the use of the extension in the dom parameter
				dom: 'Bfrtip',
				// Configure the buttons
				buttons: [
					// 'columnsToggle',
					// 'colvis',
					'copy',
					'print',
					'excel'
					// ,
					// {
					//   text: 'Some button',
					//   key: '1',
					//   action: function (e, dt, node, config) {
					// 	alert('Button activated');
					//   }
					// }
				  ]
			};
		});

		/* 
		*@Function servicio dummy data
		**/	
		this.serviceDocente.getDocentesList().subscribe( {
			next: (data: Docente[]) => { 
				this.allDocentes = data;
				console.log('%c[DEBUG] Data this.allDocentes >>>', 'background: #28a745; color: #FFFFFF; padding: 2px 5px;', this.allDocentes ); 
				// Calling the DT trigger to manually render the table         
  			this.dtTrigger.next(); 
			 },
			error: (err: Error) => console.error('HTTP Error', err),
    	complete: () => console.log('%cHTTP request completed.','background: #fd7e14; color: #FFFFFF; padding: 2px 5px;')
		});
		//this.users();

		/* 
		*@Function que trae la data desde el archivo servicio
		**/
		/* this.serviceDocente.getDummyDocentes().subscribe(
			 data => {
				this.allUsersDummy = (data as any).users;
				 console.log('%c[DEBUG] Data de la tabla this.allUsersDummy >>>>>>>>>>', 'background: #28a745; color: #FFFFFF; padding: 2px 5px;', this.allUsersDummy );
				 	this.usersLenght = (data as any).users.length
				 console.log('%c[DEBUG] Data de la tabla this.usersLenght >>>>>>>>>>', 'background: #0dcaf0; color: #FFFFFF; padding: 2px 5px;', this.usersLenght);
			},
			(error) => {
				console.log(error);
			}
		);  */
	}
	ngOnDestroy(): void {
   console.log('%c[DEBUG]: ngOnDestroy()','background:#0d6efd; color: #FFFFFF; padding: 2px 5px;');
	 this.dtTrigger.unsubscribe();
  }
	ngAfterContentInit() {
     console.log('%c[DEBUG]: ngAfterContentInit()','background:#0d6efd; color: #FFFFFF; padding: 2px 5px;');
  }
  ngAfterViewInit() {
      console.log('%c[DEBUG]: ngAfterViewInit()','background:#0d6efd; color: #FFFFFF; padding: 2px 5px;');
  }
	/* editUser(i: number, userDummy: any) {
		console.log('%c[DEBUG]: Info usuario para Edit','background: #20c997; color: #FFFFFF; padding: 2px 5px;', i, userDummy)
	}
	deleteUser(i: number, userDummy: any) {
		console.log('%c[DEBUG]: Info usuario para Delete','background: #6610f2; color: #FFFFFF; padding: 2px 5px;', i, userDummy)
	} */
	seeAcademic(id: any, dataUser: any ) {
		console.log('%c[DEBUG]: Info usuario para Edit','background: #20c997; color: #FFFFFF; padding: 2px 5px;',id.trimEnd(), dataUser );
		//localStorage.setItem('dataUser', JSON.stringify(dataUser));
		this.router.navigate(['dashboard/profile', id.trimEnd()]);
	}
	chatAcademic(id: any, dataUser: any ) {
		console.log('%c[DEBUG]: Info usuario para Delete','background: #6610f2; color: #FFFFFF; padding: 2px 5px;', id, dataUser);
		this.router.navigate(['dashboard/chat-cademico']);
	}

	/* 
	*@Function servicio dummy desde el componente
	**/
	users() {
		 this.http.get('../../../assets/dummy/data-dummy.json').subscribe({   
				next: (data: any) => {
				this.allUsersDummy = data;
				console.log('%c[DEBUG] data-dummy.json >>>>>>>>>>', 'background: #0dcaf0; color: #FFFFFF; padding: 2px 5px;', this.allUsersDummy);
				this.dtTrigger.next(data);
			 },
			error: (err: Error) => console.error('Observer got an error: ' + err),
    	complete: () => console.log('%c[DEBUG] Observer recibió una notificación completa','background: #fd7e14; color: #FFFFFF; padding: 2px 5px;')   
      }); 
	}

}
