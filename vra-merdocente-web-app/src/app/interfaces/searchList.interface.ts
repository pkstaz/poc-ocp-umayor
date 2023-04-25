export interface DummyDocente {
	projectName: string;
	companyProject: Company;
	dateProject: number;
	active: boolean;
	academicoId: string;
	avatar: string;
	username: string;
	nombre: string;
	apellido: string;
	area?: string;
	company: Company;
	email: string;
	emailpersonal: string;
	rol: Rol[];
	status: boolean;
	typeDay?: string;
	EscCarrNucl?: string;
	funcion?: string;
}

export enum Company {
	UniversidadMayor = "Universidad Mayor",
}



export interface Rol {
	nombre: Nombre;
	rolid: number;
}

export enum Nombre {
	Academico = "Academico",
	Administrador = "Administrador",
	Auditor = "Auditor",
	Gestor = "Gestor",
}
