import { EventEmitter, Injectable } from '@angular/core';

import { LogService } from '../log.service';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  emitirCursoCriado = new EventEmitter<string>();
  static criouNovoCurso = new EventEmitter<string>();
  private cursos: string[] = ['Angular 10', 'HTML5', 'CSS3'];
  constructor(private logService: LogService) {}
  getCursos() {
    this.logService.consoleLog('Obtendo lista de cursos');
    return this.cursos;
  }
  addCurso(curso: string) {
    this.logService.consoleLog(`Criando um novo curso ${curso}`);
    this.cursos.push(curso);
    this.emitirCursoCriado.emit(curso);
    CursosService.criouNovoCurso.emit(curso);
  }
}
