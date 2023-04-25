import {
  Component,
  OnInit,
  VERSION,
  OnChanges,
  OnDestroy,
  ViewChild,
  Input,
  Output,
  ElementRef,
  EventEmitter,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { of, throwError, Observable, Subject, map } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

/*
 *@Services
 **/
import { DocentesService } from '../../services/docentes.service';
import { DataSearchService } from '../../services/data-search.service';
import { AsignaturaService } from '../../services/asignatura.service';
import { AgrupadorAsignaturaService } from '../../services/agrupador-asig.service';

/*
 *@Interfaces
 **/
import { AgrupadorAsig } from '../../interfaces/agrupador-asig.interface';
import { AreaPersona } from 'src/app/interfaces/area_personas.interface';
import { Division } from 'src/app/interfaces/division.interface';
import { Facultad } from 'src/app/interfaces/facultad.interface';
import { Asignatura } from '../../interfaces/asignatura';

interface Busqueda {
  division?: any;
  asignatura?: any;
  agrupadorAsig?: any;
}

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
})
export class FilterTableComponent implements OnInit {
  public SearchDataInfo: any = {
    'division': '',
    'asignatura': '',
    'agrupadorAsig': '',
  };

  public dataAsignatura!: Asignatura[]; //---> Variable para mostrar los select
  public dataAgrupadorAsig!: AgrupadorAsig[]; //---> Variable para mostrar los select
  public AreaPersonas!: AreaPersona[]; //---> Variable para mostrar los select
  public Division: Division[] = []; //---> Variable para mostrar los select
  public Factultades!: Facultad[]; //---> Variable para mostrar los select

  public selectedDivisionId!: any;
  public selectedAgrupadorId!: any;
  public selectedAsignaturaId!: Asignatura;

  selectedCar!: number;
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  @Output('data') dataBusqueda: EventEmitter<Busqueda> = new EventEmitter();

  constructor(
    private router: Router,
    private serviceDocente: DocentesService,
    private http: HttpClient,
    private activroute: ActivatedRoute,
    private serviceSearch: DataSearchService,
    private serviceAsignatura: AsignaturaService,
    private serviceAgrupAsig: AgrupadorAsignaturaService
  ) {
    console.log(
      '%c[DEBUG]: constructor()',
      'background: #0d6efd; color: #FFFFFF; padding: 2px 5px;'
    );
  }

  ngOnInit(): void {
    console.log(
      '%c[DEBUG]: ngOnInit()',
      'background: #0d6efd; color: #FFFFFF;padding: 2px 5px;'
    );
    /*
     * @Functions call servicios para "select filtro"
     * La información de dataAgrupadorAsig vienen de un archivo json, folder data
     * Se utiliza el archivo serviceSearch
     *
     *	this.dataAgrupadorAsig
     *	this.AreaPersonas
     *	this.Division
     *	this.Factultades
     **/
    ///BUSCA DATOS DE DIVISIÓN
    this.Division = this.serviceSearch.getDivision();
    console.log(
      '%cHTTP request this.Fact >>>',
      'background: #6f42c1; color: #FFFFFF; padding: 2px 5px;',
      this.Division
    );

    ///BUSCA DATOS DE AGRUPADOR
    this.serviceAgrupAsig.getAgrupadorList().subscribe({
      next: (data: AgrupadorAsig[]) => {
        this.dataAgrupadorAsig = data as AgrupadorAsig[];
        console.log(
          '%cHTTP request this.dataAgrupadorAsig >>>',
          'background: #6f42c1; color: #FFFFFF; padding: 2px 5px;',
          this.dataAgrupadorAsig
        );
      },
    });
  }

  onChangeAgrupador(oEvent: any) {
    //BUSCA ASIGNATURAS

    this.serviceAsignatura
      .getAsignaturaByFilters(this.selectedAgrupadorId, this.selectedDivisionId)
      .subscribe({
        next: (data: Asignatura[]) => {
          this.dataAsignatura = data as Asignatura[];
          console.log(
            '%cHTTP request getAsignaturaByFilters >>>',
            'background: #6f42c1; color: #FFFFFF; padding: 2px 5px;',
            data
          );
        },
      });
  }

  push() {
    throw new Error('Method not implemented.');
  }

  search() {
    this.SearchDataInfo = {
      division: this.selectedDivisionId,
      asignatura: this.selectedAsignaturaId,
      agrupadorAsig: this.selectedAsignaturaId,
    };
    this.dataBusqueda.emit(this.SearchDataInfo);

  }

	resetButton() {
		this.SearchDataInfo = {
			'division': '',
			'asignatura': '',
			'agrupadorAsig':''
		};
	}
}







