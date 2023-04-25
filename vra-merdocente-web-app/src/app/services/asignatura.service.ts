import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/*
* @Interfaces
**/
import { Asignatura } from "../interfaces/asignatura";

/*
* @Otros
**/
import { API_BACKEND } from '../constants/constantes';

@Injectable({
    providedIn: 'root'
  })
  export class AsignaturaService {

  //private readonly api_desarrollo = API_BACKEND.desarrollo
	private readonly api_desarrollo = API_BACKEND.produccion

    constructor(private http: HttpClient) { 
		console.log('%c<<< Start All services >>>','background: #fff3cd; color: #664d03; padding: 2px 5px;'); 
    }

    /* Llamado a todos las asignaturas */
	getAsignaturaList(): Observable<Asignatura[]> {
		return this.http.get<Asignatura[]>(this.api_desarrollo +  'api/asignaturas' );
	}

	/* Llamado a una asignatura */
  getAsignaturaById(_codAsignatura: number ):Observable <Asignatura> {
    return this.http.get<Asignatura>(this.api_desarrollo +  "api/asignaturas/" + _codAsignatura);
  }
  // getAsignaturaByAgrupador(_idAgrupador: number ):Observable <Asignatura[]> {
  //     return this.http.get<Asignatura[]>(this.api_desarrollo +  "api/asignaturasByAgrupador/" + _idAgrupador);
  // }
  getAsignaturaByFilters(_idAgrupador: number, sede: string ):Observable <Asignatura[]> {
      return this.http.get<Asignatura[]>(this.api_desarrollo +  "api/asignaturas/Filters/" + _idAgrupador + "/" + sede);
  }
}