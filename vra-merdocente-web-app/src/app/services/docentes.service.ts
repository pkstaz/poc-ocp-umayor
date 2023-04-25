import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/*
* @Interfaces
**/
import { Docente } from '../interfaces/docente.interface';
import { DummyDocente } from '../interfaces/searchList.interface';
import { AllAsignaturas } from '../interfaces/all_asignaturas.interface';
import { AsignaPreferentes } from '../interfaces/asignaturas_preferentes.interface';
import { ChatDocente } from '../interfaces/chat-docente';
/*
* @Otros
**/
import { API_BACKEND } from '../constants/constantes';

interface DocenteRedes {
  rut: string,
  resumen: string,
  linkedin: string,
  facebook: string,
  twitter: string,
  whatsapp: string
}


@Injectable({
  providedIn: 'root'
})
export class DocentesService {

  //private readonly api_desarrollo = API_BACKEND.desarrollo
	private readonly api_desarrollo = API_BACKEND.produccion

  constructor(private http: HttpClient) { 
		console.log('%c<<< Start All services >>>','background: #fff3cd; color: #664d03; padding: 2px 5px;'); 
  }

	/* Llamado a todos los docentes */
	getDocentesList(): Observable<Docente[]> {
		return this.http.get<Docente[]>(this.api_desarrollo +  'api/docentes' );
	}

	/* Llamado a un docente */
  getDocentesByRut(_rut: string ):Observable <Docente> {
    return this.http.get<Docente>(this.api_desarrollo +  "api/docentes/" + _rut.toString());
  }
	/* Llamado a un docente */
  getDocentesByAsignatura(_cod: number ):Observable <Docente[]> {
    return this.http.get<Docente[]>(this.api_desarrollo +  "api/docentes/docentesByAsignatura/" + _cod);
  }

	/* Llamado a todos las Asignaturas  */
	getAsignaturasList(): Observable<AllAsignaturas[]> {
		return this.http.get<AllAsignaturas[]>(this.api_desarrollo +  'api/asignaturas' );
	}

	/* Llamado a un docente asignaturas-preferentes  */
  getAsignaturasByRut(_rut: string ):Observable<AsignaPreferentes[]> {
    return this.http.get<AsignaPreferentes[]>(this.api_desarrollo +  'api/preferencias/' + _rut.toString());
  }

	/* Crear perfil docente */
	createDocente( body: DocenteRedes ): Observable<Docente>{
	return this.http.post<Docente>(this.api_desarrollo +  'api/docentesRedes/', body);
	}

	/* Actualizar perfil docente */
	editDocente( body: DocenteRedes ): Observable<Docente>{
		return this.http.patch<Docente>(this.api_desarrollo +  'api/docentesRedes/', body);
	}

	getDataRedes(_rut: string): Observable<DocenteRedes> {
		return this.http.get<DocenteRedes>(this.api_desarrollo +  'api/docentesRedes/' + _rut.toString());
	}
	
	/* 
	*@Call files dummy 
	**/


	/* Dummy docente */
	getDummyDocentes(): Observable<DummyDocente[]> {
		const usuariosLista = 'assets/dummy/data-dummy.json';
		return this.http.get<DummyDocente[]>(usuariosLista);
	}
/* Dummy asignatura */
	getDummyAsignaturas(): Observable<AllAsignaturas> {
		const asignaturasList = 'assets/dummy/asignatura-dummy.json';
		return this.http.get<AllAsignaturas>(asignaturasList);
	}
/* Dummy chat */
	getDummyChat(): Observable<ChatDocente> {
		const chatList = 'assets/dummy/dummy-chat.json'
		return this.http.get<ChatDocente>(chatList);
	}
/* Dummy chat Buble */

	getDummyBuble(): Observable<ChatDocente> {
		const chatList = 'assets/dummy/dummy-buble.json'
		return this.http.get<ChatDocente>(chatList);
	}

}
