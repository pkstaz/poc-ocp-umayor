import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/*
* @Interfaces
**/
import { AgrupadorAsig } from "../interfaces/agrupador-asig.interface";

/*
* @Otros
**/
import { API_BACKEND } from '../constants/constantes';

@Injectable({
    providedIn: 'root'
  })
  export class AgrupadorAsignaturaService {

  //private readonly api_desarrollo = API_BACKEND.desarrollo
	private readonly api_desarrollo = API_BACKEND.produccion

    constructor(private http: HttpClient) { 
		console.log('%c<<< Start All services >>>','background: #fff3cd; color: #664d03; padding: 2px 5px;'); 
    }

    /* Llamado a todos los Agrupadores */
		getAgrupadorList(): Observable<AgrupadorAsig[]> {
			return this.http.get<AgrupadorAsig[]>(this.api_desarrollo +  'api/agrupador' );
		}

		/* Llamado a un Agrupador */
		getAgrupadorById(_cod: number ):Observable <AgrupadorAsig> {
			return this.http.get<AgrupadorAsig>(this.api_desarrollo +  "api/agrupador/" + _cod);
		}
  

  }