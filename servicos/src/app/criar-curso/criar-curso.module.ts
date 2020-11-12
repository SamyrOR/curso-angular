import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriarCursoComponent } from './criar-curso.component';
import { ReceberCursoCriadoComponent } from '../receber-curso-criado/receber-curso-criado.component';

@NgModule({
  declarations: [CriarCursoComponent, ReceberCursoCriadoComponent],
  imports: [CommonModule],
  exports: [CriarCursoComponent],
})
export class CriarCursoModule {}
