import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocentesService } from '../../../services/docentes.service';
import { Docente } from '../../../interfaces/docente.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
@Injectable()
export class ProfileComponent implements OnInit {

  // manejo de datos del perfil de docente en FrontEnd
  docentesPerfil!: Docente;

  constructor(private docentesService: DocentesService) { }

  ngOnInit(): void {

    console.log("ngOnInit this.docentesService.getDocentesByRut")
    

    this.docentesService.getDocentesByRut('102602234').subscribe(    
    
        (respuesta: Docente) => {
          console.log(respuesta);

          this.docentesPerfil = respuesta;

        }
    );

    console.log("ngOnInit After this.docentesService.getDocentesByRut: ")

  }

}
