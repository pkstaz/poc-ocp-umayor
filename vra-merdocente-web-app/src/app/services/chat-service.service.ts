import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BACKEND } from '../constants/constantes';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

	//private readonly api_desarrollo = API_BACKEND.desarrollo
	private readonly api_desarrollo = API_BACKEND.produccion

  constructor(private http: HttpClient) {
		console.log('%c<<< Start All services chat >>>','background: #fff3cd; color: #664d03; padding: 2px 5px;'); 
	}

	/* 
	* @Chat inicial con usuario <dicrector> y docente 
	* Guardar los datos de la cabecera del primer chat
		"fecha_reg": "2023-02-15T15:01:41.516Z",
		"anio_periodo": "2023001", //---> harkodeado
		"miembros": "rut(Director),rut(Docente)",
		"asunto": "string",
		"cod_asignatura": 0, //---> harkodeado
		"modificado": "2023-02-15T15:01:41.516Z",
		"estado": "string"
	*/
	saveChatCab(body: any): Observable<any> {
		return this.http.post<any>(this.api_desarrollo + 'chat-cab/', body);
	}

	/* Llamado a todas las cabeceras de chat del rut
		{
    "id_reg": 1,
    "fecha_reg": "2023-01-31T03:00:00.000Z",
    "activo": true,
    "anio_periodo": "2023001 ",
    "miembros": "1-9,1-7",
    "asunto": "Iniciación",
    "cod_asignatura": 2000069,
    "modificado": "2023-01-31T03:00:00.000Z",
    "estado": "ABIERTO"	
	*/
	getChatCabByRut(_rut: string): Observable<any> {
		return this.http.get<any>(this.api_desarrollo +  'chat-cab/' + _rut.toString() );
	}

	/* 
	* @Chat detalle <dicrector> y docente 
	* Llamar a todos bubles de la cabecera a consultar
	{
    "id_cab": 1,//---> se generan de forma automatica
    "id_det": 1,//---> se generan de forma automatica
    "mensaje": "Hola, don Pepito",
    "fecha": "2023-01-31T03:00:00.000Z",
    "hora": "11:54",
    "autor": "1-9",
    "leido": false
  }
	**/

	getChatDetalle(_id_reg: number): Observable<any> {
		return this.http.get<any>(this.api_desarrollo +  'chat-det/' + _id_reg);
	}


	/* 
	* @Chat generar inserción de nuevos bubles <dicrector> y docente 
	* Inserta nuevo buble al servicio chat-detalles
	{
		"id_cab": 0,
		"id_det": 0,
		"mensaje": "string",
		"fecha": "2023-02-15T15:21:14.303Z",
		"hora": "string",
		"autor": "string",
		"leido": true
	}
	**/
	saveChatDetail(body: any): Observable<any> {
		return this.http.post<any>(this.api_desarrollo + 'chat-det', body);
	}


	/* 
	* @Chat borrar un buble <dicrector> y docente 
	* Borra un buble por id que se seleccione chat-detalles
	{
		"id_cab": 0,
		"id_det": 0,
		"mensaje": "string",
		"fecha": "2023-02-15T15:21:14.303Z",
		"hora": "string",
		"autor": "string",
		"leido": true
	}
	**/

	deleteChatDetail(id_det: any): Observable<any> {
		return this.http.delete<any>(this.api_desarrollo + 'chat-det/' + id_det);
	}
	
	archivarChatCabecera(id_reg: number, estado:string): Observable<any> {
		return this.http.patch<any>(this.api_desarrollo + 'chat-cab/modificar/estado/'+ id_reg + '/' + estado, {});
	}


}
