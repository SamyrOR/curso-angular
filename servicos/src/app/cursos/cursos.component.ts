import { Component, OnInit } from '@angular/core';

import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  cursos: string[];
  cursosServices: CursosService;

  constructor(private _cursosService: CursosService) {
    this.cursosServices = this._cursosService;
  }

  ngOnInit(): void {
    this.cursos = this.cursosServices.getCursos();
    CursosService.criouNovoCurso.subscribe((curso) => this.cursos.push(curso));
  }
}
