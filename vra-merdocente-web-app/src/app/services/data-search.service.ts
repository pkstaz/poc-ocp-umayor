import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


/* Interfaces */
import { AgrupadorAsig } from '../interfaces/agrupador-asig.interface';
import { AreaPersona } from '../interfaces/area_personas.interface';
import { Division } from '../interfaces/division.interface';
import { Facultad } from '../interfaces/facultad.interface';
 
interface Modalidad {
	id: string;
	modality: string;
}
 

@Injectable({
  providedIn: 'root'
})
export class DataSearchService {

public areapersonas: AreaPersona[] = [ 
	{"area_pers": "Académico Jornada"},
  {"area_pers": "Coordinaciones"},
	{"area_pers": "Direc. Académicas"},
  {"area_pers": "Otras Direcciones"}
];
 

public division:Division[] = [
	{ id: 1, division: "Santiago"},
	{ id: 2, division: "Temuco"}
]


public imparticion: Modalidad[] = [
	{ id: 'Presencial', modality: 'Presencial'},
	{ id: 'No Presencial', modality: 'No Presencial'}
]

public facultad:Facultad[] = [
  {"facultad": "AUXILIAR DE LABORATORIO C"},
  {"facultad": "CENTRO TECNOLÓGICO Y DE E"},
  {"facultad": "DECANATURA PREGRADO"},
  {"facultad": "DIREC. BACHILLERATO CS DE"},
  {"facultad": "DIRECCIÓN DE INNOVACIÓN Y"},
  {"facultad": "DIRECCIÓN DE INVESTIGACIÓ"},
	{"facultad": "DIRECCIÓN DE NÚCLEOS TRAN"},
  {"facultad": "DIRECCIÓN DE POSTGRADOS D"},
  {"facultad": "DIRECCIÓN INVESTIGACIÓN Y"},
  {"facultad": "ESCUELA DE EDUCACIÓN"},
  {"facultad": "ESCUELA DE EDUCACIÓN."},
  {"facultad": "FACULTAD DE ARTES"},
  {"facultad": "FACULTAD DE ARTES."},
  {"facultad": "FACULTAD DE CIENCIAS"},
  {"facultad": "FACULTAD DE CIENCIAS SOCI"},
  {"facultad": "FACULTAD DE CIENCIAS."},
  {"facultad": "FACULTAD DE HUMANIDADES"},
  {"facultad": "FACULTAD DE HUMANIDADES."},
  {"facultad": "GREZ, LUIS H."},
  {"facultad": "PRORRECTORÍA"},
  {"facultad": "VICERRECTORÍA ACADÉMICA"},
  {"facultad": "VICERRECTORÍA ACADÉMICA."},
  {"facultad": "VICERRECTORÍA DE INVESTIG"},
  {"facultad": "VICERRECTORÍA INVESTIGACI"},
  {"facultad": "VICERRECTORÍA REGIONAL"}
]

  constructor( private http: HttpClient ) {
		console.log('%c<<< Start data search services >>>','background: #fff3cd; color: #664d03; padding: 2px 5px;');
	}

	getAreaPersona() { return this.areapersonas;}
	getDivision() {return this.division;}
	getFacultad() {return this.facultad;}

	/* Archivo Escuela Carrera Nucleo */
	getAgrupadorAsig(): Observable<AgrupadorAsig[]> {
		const asignaturasList = 'assets/data/escuelacarreranucleo.json';
		return this.http.get<AgrupadorAsig[]>(asignaturasList);
	}
}
