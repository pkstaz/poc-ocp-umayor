import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BACKEND } from '../constants/constantes';
import { AllAsignaturas } from '../interfaces/all_asignaturas.interface';
import { AsignaPreferentes } from '../interfaces/asignaturas_preferentes.interface';


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
}

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

//private readonly api_desarrollo = API_BACKEND.desarrollo
	private readonly api_desarrollo = API_BACKEND.produccion


  constructor( private http: HttpClient ) {
		console.log('%c<<< Start All services chat >>>','background: #fff3cd; color: #664d03; padding: 2px 5px;'); 
	}

	/* Llamado a todos los asignaturas */
	getAsignaturas(): Observable<Asignaturas[]> {
		return this.http.get<Asignaturas[]>(this.api_desarrollo +  'api/asignaturas' );
	}

	/* Llamado a un docente y sus asignaturas
	{
		"cod_asignatura": 0,
		"descripcion_asignatura": "string",
		"id_sm": 0,
		"cod_modulo": "string",
		"id_agrupador": 0,
		"regimen": "string",
		"diciplima": "string",
		"nivel": 0,
		"id_plan": 0
	}
	*/
getAsignaturasById(_codigo: string ):Observable<AllAsignaturas> {
	return this.http.get<AllAsignaturas>(this.api_desarrollo +  'api/asignaturas/' + _codigo.toString());
}

/* Llamado a preferencias */
getPreferencias(): Observable<any> {
	return this.http.get<AllAsignaturas>(this.api_desarrollo +  'api/preferencias' );
}
/* Guardar preferencias */
savePreferencias(body: any): Observable<any> {
	return this.http.post<any>(this.api_desarrollo + 'api/preferencias', body);
}
/* Llamar las preferencia por rut */
getPreferenciasByRut(_rut: string): Observable<any> {
	return this.http.get<AllAsignaturas>(this.api_desarrollo +  'api/preferencias' + _rut.toString());
}

/* Borrar una preferencia */
deletePreferenciasById(_id: any): Observable<any> {
	return this.http.delete<any>(this.api_desarrollo + 'api/preferencias' + _id);
}


}
