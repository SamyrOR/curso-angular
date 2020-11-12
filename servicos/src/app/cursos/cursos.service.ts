import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  getCursos() {
    return ['Angular 10', 'Java'];
  }
}
