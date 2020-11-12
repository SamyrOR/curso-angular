import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  emitirCursoCriado = new EventEmitter<string>();
  private cursos: string[] = ['Angular 10', 'HTML5', 'CSS3'];
  getCursos() {
    return this.cursos;
  }
  addCurso(curso: string) {
    this.cursos.push(curso);
    this.emitirCursoCriado.emit(curso);
  }
}
