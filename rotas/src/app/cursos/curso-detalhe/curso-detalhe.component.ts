import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css'],
})
export class CursoDetalheComponent implements OnInit, OnDestroy {
  id: number;
  inscricao: Subscription;
  curso: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cursosService: CursosService
  ) {}

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.curso = this.cursosService.getCurso(this.id);
      if (!this.curso) this.router.navigate(['/cursos/404']);
    });
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}
