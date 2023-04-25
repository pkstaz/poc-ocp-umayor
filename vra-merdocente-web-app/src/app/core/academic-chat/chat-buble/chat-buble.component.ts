import { Component, Input, OnChanges, OnInit, SimpleChanges, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { DocentesService } from 'src/app/services/docentes.service';
import { ToastrAlertService } from 'src/app/services/toastr-alert.service';
import { Docente } from 'src/app/interfaces/docente.interface';
import { NgbActiveModal, NgbModal, NgbModalConfig, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { MiServicioEjecutorService  } from "../mi-servicio-ejecutor.service";

interface InfoInput {
	IDreg?: number,
	asunto?: string,
	usuarioLeft?: string,
	usuarioLeftName?: string,
	usuarioRight?: string,
	estado?: string
}



@Component({
	selector: 'app-chat-buble',
	templateUrl: './chat-buble.component.html',
	styleUrls: ['./chat-buble.component.scss']
})
export class ChatBubleComponent implements OnInit, OnChanges, AfterViewInit {

	chatBubles: any[] = [];
	public sendChat!: string;
	/* public fechaMensaje = new Date(); */
	public float!: string;
	public avatarDummyDirector: string = '../assets/images/avatars/avatar21.png';
	public avatarDummyDocente: string = '../assets/images/avatars/avatar22.png';

	public weekday = [" ", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
	public months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	public d = new Date();//Fri Feb 03 2023 12:05:34 GMT-0300 (hora de verano de Chile)
	public day = this.d.getDate(); //--->03
	public nameday = this.weekday[this.d.getDay()];//---> Fri 
	public month = this.months[this.d.getMonth()];
	public year = this.d.getFullYear();//---> Año
	public loading: boolean = false;

	@Input('ID_reg') callbackInfo: InfoInput | undefined;


	public dataBubles: any[] = [];
	public rutUser!: any;

	public rutLeft!: string | undefined;
	public rutRight!: string | undefined;
	public asunto!: string | undefined;
	public estado!: string | undefined;

	public dataInfoDocente!: any;


	public nombreDocente!: string | undefined;
	public idChatCab!: number | undefined;

	public chatInicial: any = {
		subject: 'lorem impus dolor emmet',
		message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.'
	}
	public loadingSpinner: boolean = false;

	constructor(
		private router: Router,
		private _serviceDocente: DocentesService,
		private http: HttpClient,
		private activateRoute: ActivatedRoute,
		private fb: FormBuilder,
		private toastr: ToastrAlertService,
		private _chatService: ChatServiceService,
		config: NgbModalConfig,
		private modalService: NgbModal,
		private miServicioEjecutor: MiServicioEjecutorService
	) {
		console.log('%c[DEBUG]: constructor() --> child', 'background:  #cff4fc; color:#084298; padding: 2px 5px;');
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
	}

	ngOnInit(): void {
	}

	deleteMessage(item: any): void {
		// console.log('%c[DEBUG]: deleteMessage(item: any) --> child','background:  #cff4fc; color:#084298; padding: 2px 5px;', item);
		this._chatService.deleteChatDetail(item.id_det).subscribe({
			next: (resp: any) => {
				// debugger;
				// console.log('%cHTTP Mensaje de Chat Eliminado.','background: #d1e7dd; color: #0f5132; padding: 2px 5px;')
				this.loading = true;

				setTimeout(() => {
					this.cargadeDato();
					this.loading = false;
				}, 1000);
			},
			error: (err: Error) => console.error('%cHTTP Error', 'background: #f8d7da; color: #842029; padding: 2px 5px;', err),
			complete: () => console.log('%cHTTP request completed.', 'background: #d1e7dd; color: #0f5132; padding: 2px 5px;')
		});
	}

	archivarChatCabecera(idReg: number): void {


		Swal.fire({
			title: '¿Esta seguro de archivar esta conversación?',
			text: "No podrá revetir esto!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, archivar!'
		  }).then((result) => {
			if (result.isConfirmed) {
			  
				this._chatService.archivarChatCabecera(idReg, 'ARCHIVADA').subscribe({
					next: (resp: any) => {
						// debugger;
						// console.log('%cHTTP Mensaje de Chat Eliminado.','background: #d1e7dd; color: #0f5132; padding: 2px 5px;')
						this.loading = true;
						
						setTimeout(() => {
							// this.cargadeDato();
							Swal.fire(
								'Archivada!',
								'La conversación ha sido archivada.',
								'success'
							  );
							  this.miServicioEjecutor.miVariable$.next(true);
							// this.router.navigate(['dashboard/chat-cademico']);
							this.loading = false;

						}, 1000);
					},
					error: (err: Error) => console.error('%cHTTP Error', 'background: #f8d7da; color: #842029; padding: 2px 5px;', err),
					complete: () => console.log('%cHTTP request completed.', 'background: #d1e7dd; color: #0f5132; padding: 2px 5px;')
				});

				
			}
			
		  })
		// console.log('%c[DEBUG]: deleteMessage(item: any) --> child','background:  #cff4fc; color:#084298; padding: 2px 5px;', item);
	
	}

	cargadeDato() {

		if (this.callbackInfo?.IDreg) {
			// console.warn(this.callbackInfo);

			this._chatService.getChatDetalle(this.callbackInfo.IDreg).subscribe({
				next: (resp: any) => {
					this.dataBubles = resp;
					this.rutLeft = this.callbackInfo?.usuarioLeft;
					this.rutRight = this.callbackInfo?.usuarioRight;
					this.asunto = this.callbackInfo?.asunto;
					this.estado = this.callbackInfo?.estado;
					this.nombreDocente = this.callbackInfo?.usuarioLeftName;
					this.idChatCab = this.callbackInfo?.IDreg;

					console.log(this.dataBubles);

					const msg = document.getElementById("msg_" + resp[resp.length - 1].id_det)

					if (msg) {
						const el: HTMLElement = msg;
						el.scrollIntoView();
					}

				},
				error: (err: Error) => console.error('%cHTTP Error', 'background: #f8d7da; color: #842029; padding: 2px 5px;', err),
				complete: () => console.log('%cHTTP request completed.', 'background: #d1e7dd; color: #0f5132; padding: 2px 5px;')
			});
		}


		/*
		  * @Function servicio docentet para llamar información del emisor del chat
		  * El llamado se realiza de forma directa desde el ngOnInit()
		  **/


		// this._serviceDocente.getDocentesByRut("104034608").subscribe({
		// 	next: (data: any) => {
		// 	this.nombreDocente = data[0].nombre;		
		// 	},
		// 	error: (err: Error) => console.error('%cHTTP Error','background: #f8d7da; color: #842029; padding: 2px 5px;', err),
		// 	complete: () => console.log('%cHTTP request completed.','background: #d1e7dd; color: #0f5132; padding: 2px 5px;')
		// }); 
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.cargadeDato();
	}

	ngAfterViewChecked(): void {
		//console.log('%c[DEBUG]: from ngAfterViewChecked()','background:#198754; color:#fff; padding: 2px 5px;', this.dataInfoDocente);

	}

	ngAfterViewInit(): void {
		//console.log('%c[DEBUG]: from ngAfterViewInit()','background:#0dcaf0; color:#fff; padding: 2px 5px;', this.dataInfoDocente);
	}

	sendmessage() {

		if (this.sendChat.length > 0) {

			var _today = new Date();

			const body =
			{
				"id_cab": this.callbackInfo?.IDreg,
				"mensaje": this.sendChat,
				"fecha": _today,
				"hora": _today.getHours() + ':' + _today.getMinutes() + ':' + _today.getSeconds(),
				"autor": this.callbackInfo?.usuarioRight,
				"leido": false
			}

			this._chatService.saveChatDetail(body).subscribe({
				next: (data: any) => {
					this.loading = true;

					setTimeout(() => {
						this.cargadeDato();
						this.sendChat = '';
						this.loading = false;
					}, 1000);

					console.log('%c[DEBUG] this.chatBubles >>>', 'background:  #cff4fc; color:#084298; padding: 2px 5px;', this.chatBubles);
				},
				error: (err: Error) => console.error('%cHTTP Error', 'background: #f8d7da; color: #842029; padding: 2px 5px;', err),
				complete: () => console.log('%cHTTP request completed.', 'background: #d1e7dd; color: #0f5132; padding: 2px 5px;')
			});
			console.log('%c[DEBUG] sendmessage() >>>', 'background:  #cff4fc; color:#084298; padding: 2px 5px;', this.sendChat)
		}
	}

	open(content: any) {
		this.modalService.open(content);
	}

	saveInfo(infochat: any) {
		console.log('Esta es la información que estoy enviando por el click', infochat);
		this.loadingSpinner = true;
		setTimeout(() => {
			this.loadingSpinner = false;
			this.modalService.dismissAll();
		}, 2000);
	}



}
