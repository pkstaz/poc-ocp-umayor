/*  interface Busqueda {
	areapersonas?: any;
	division?: any;
	facultad?: any;
	escuelacarreranucleo?: any;
}  */

export interface Busqueda {
	// areapersonas?: AreaPersona;
	// division?: Division;
	// facultad?: Facultad;
	// escuelacarreranucleo?: EscCarrNucl[];
	division?: any;
	asignatura?: any;
	agrupadorAsig?:any;
}

export interface EscCarrNucl {
	id_agrupador?:   number;
	desc_agrupador?: string;
}
export interface AreaPersona {
	area_pers?: string;
}

export interface Division {
    division?: string;
}

export interface Facultad {
	facultad?: string;
}