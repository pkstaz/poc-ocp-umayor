/* export interface Asignatura {
    cod_asignatura?:         number;
    descripcion_asignatura?: string;
    id_sm?:                  number;
    cod_modulo?:             string;
    id_agrupador?:           string;
    regimen?:                string;
    diciplima?:              string;
    nivel?:                  string;
    id_plan?:                string;
} */

export interface AllAsignaturas {
    clase_imparticion:      string;
    cod_asignatura:         number;
    cod_modulo:             string;
    cod_plan:               string;
    desc_actividad:         string;
    desc_agrupador:         string;
    descripcion_asignatura: string;
    descripcion_plan:       string;
    disciplina:             string;
    facultad:               number;
    id_actividad:           string;
    id_plan:                number;
    nivel:                  number;
    regimen:                string;
}




