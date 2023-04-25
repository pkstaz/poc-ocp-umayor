export interface Alerts {
	codigointerno: string;
	codigoexterno: string;
	nombredeproyecto: string;
	estadoproyecto: estadoproyecto;
	fechaprogramada: string;
	numeroinforme: string;
	alert: alert;
}
export enum alert {
  Danger = "danger",
  Warning = "warning",
}

export enum estadoproyecto {
  EnEjecución = "En ejecución",
}
