import {
	Component,
	OnInit,
	VERSION,
	OnDestroy,
	Output,
	EventEmitter,
	Input,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { of, throwError, Observable, Subject, map } from 'rxjs';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { DocentesService } from 'src/app/services/docentes.service';
import { ToastrAlertService } from 'src/app/services/toastr-alert.service';
import { Docente } from 'src/app/interfaces/docente.interface';
import { AllAsignaturas } from 'src/app/interfaces/all_asignaturas.interface';
import { ChatDocente } from 'src/app/interfaces/chat-docente';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { MiServicioEjecutorService } from '../academic-chat/mi-servicio-ejecutor.service';

@Component({
	selector: 'app-academic-chat',
	templateUrl: './academic-chat.component.html',
})
export class AcademicChatComponent implements OnInit, OnChanges {
	public nameVersion = 'Angular ' + VERSION.full;
	docentesPerfil!: Docente;
	asignaturasDummyPerfil: AllAsignaturas[] = [];
	userChatCab!: any;
	chatBubles!: any;

	informacionDocente: Docente[] = [];

	//@Input() loremIpsun: string; // decorate the property with @Input()
	//@Output('data') dataBusqueda: EventEmitter<any> = new EventEmitter();

	public onlyBubles!: number;
	public dataBubles: any;

	public sendChat!: string;
	/* public fechaMensaje = new Date(); */
	public float!: string;
	public avatarDummyDirector: string = '../assets/images/avatars/avatar21.png';
	public avatarDummyDocente: string = '../assets/images/avatars/avatar22.png';

	public showChat: boolean = true;

	public rutUserSesion: string;
	public enviandInfoInput!: string;
	public weekday = [
		' ',
		'Lunes',
		'Martes',
		'Miércoles',
		'Jueves',
		'Viernes',
		'Sábado',
		'Domingo',
	];
	public months = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
	];
	public d = new Date(); //Fri Feb 03 2023 12:05:34 GMT-0300 (hora de verano de Chile)
	public day = this.d.getDate(); //--->03
	public nameday = this.weekday[this.d.getDay()]; //---> Fri
	public month = this.months[this.d.getMonth()];
	public year = this.d.getFullYear(); //---> Año

	public attrTarget: string = '#marked-message-';
	public attrTargetTab: string = 'marked-message-';
	public idTab: string = '';

	constructor(
		private router: Router,
		private _serviceDocente: DocentesService,
		private http: HttpClient,
		private activateRoute: ActivatedRoute,
		private fb: FormBuilder,
		private toastr: ToastrAlertService,
		private _chatService: ChatServiceService,
		private miServicioEjecutor: MiServicioEjecutorService
	) {
		console.log(
			'%c[DEBUG]: constructor()',
			'background:  #cff4fc; color:#084298; padding: 2px 5px;'
		);
		this.rutUserSesion = '103821568';
	}

	ngOnInit(): void {
		console.log(
			'%c[DEBUG]: ngOnInit()',
			'background:  #cff4fc; color:#084298; padding: 2px 5px;'
		);

		this.miServicioEjecutor.miVariable$.subscribe((data) => {
			console.log(`El valor de la variable cambio a: ${data}`);
			// debugger;
			this.getChatCabecera();

			return;
		});

		// this.getChatCabecera();


	}

	getChatCabecera() {
		this._chatService.getChatCabByRut(this.rutUserSesion).subscribe({
			next: (data: any) => {
				this.userChatCab = data;
				console.log(
					'%c[DEBUG] Data this.userChatCab >>>',
					'background:  #cff4fc; color:#084298; padding: 2px 5px;',
					this.userChatCab
				);
			},
			error: (err: Error) =>
				console.error(
					'%cHTTP Error',
					'background: #f8d7da; color: #842029; padding: 2px 5px;',
					err
				),
			complete: () =>
				console.log(
					'%cHTTP request completed.',
					'background: #d1e7dd; color: #0f5132; padding: 2px 5px;'
				),
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log(
			'%c[DEBUG]: ngOnChanges() pather',
			'background:  #cff4fc; color:#084298; padding: 2px 5px;',
			changes
		);
		// debugger;
		/* console.log('data', this.data); */
	}

	getChat(item: any) {
		this.showChat = false;
		// const usuarios = item.miembros.split(',');
		this.chatBubles = {
			IDreg: item.id_reg,
			asunto: item.asunto.trimEnd(),
			usuarioLeft: item.RUT_RECEPTOR.trimEnd(),
			usuarioLeftName: item.NOM_RECEPTOR.trimEnd(),
			usuarioRight: item.RUT_EMISOR.trimEnd(),
			usuarioRightName: item.NOM_EMISOR.trimEnd(),
			estado: item.estado.trimEnd(),
		};

		console.log(
			'%c[DEBUG] informacion desde el padre al click >>>',
			'background: #084298; color:#fff; padding: 2px 5px;',
			this.chatBubles
		);
	}
}
