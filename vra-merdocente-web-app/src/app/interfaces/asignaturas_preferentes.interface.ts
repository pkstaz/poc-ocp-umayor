export interface AsignaPreferentes {
    rut_docente?:            string;
    nombre?:                 string;
    area_pers?:              string;
    jornada_ctto?:           string;
    facultad?:               string;
    division?:               string;
		desc_actividad?:				 string;
    fechaInsert?:            Date;
    fechaUpdate?:            Date;
    cod_asignatura?:         number;
    descripcion_asignatura?: string;
    id_sm?:                  number;
    cod_modulo?:             string;
    id_agrupador?:           number;
    regimen?:                string;
    disciplina?:             string;
    nivel?:                  number;
    cod_plan?:               string;
    id_plan?:                number;
}
