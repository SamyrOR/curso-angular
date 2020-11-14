import { Component, OnInit } from '@angular/core';

import { CursosService } from '../cursos/cursos.service';

@Component({
  selector: 'app-receber-curso-criado',
  templateUrl: './receber-curso-criado.component.html',
  styleUrls: ['./receber-curso-criado.component.scss'],
})
export class ReceberCursoCriadoComponent implements OnInit {
  curso: string;

  constructor(private crusosService: CursosService) {}

  ngOnInit(): void {
    this.crusosService.emitirCursoCriado.subscribe(
      (cursoCriado) => (this.curso = cursoCriado)
    );
  }
}
