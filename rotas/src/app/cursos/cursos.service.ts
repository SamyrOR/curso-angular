import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  getCursos(): object[] {
    return [
      { id: 1, nome: 'Angular' },
      { id: 2, nome: 'CSS3' },
      { id: 3, nome: 'HTML5' },
      { id: 4, nome: 'TypeScript' },
    ];
  }

  getCurso(id: number): object | null {
    let cursos = this.getCursos();
    for (let i = 0; i < cursos.length; i++) {
      let curso: any = cursos[i];
      if (curso.id == id) {
        return curso;
      }
    }
    return null;
  }

  constructor() {}
}
