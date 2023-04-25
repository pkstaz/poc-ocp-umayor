import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MiServicioEjecutorService {
  // Creamos un BehaviorSubject de tipo boolean
  public miVariable$ = new BehaviorSubject<boolean>(false);

  constructor() { }
}