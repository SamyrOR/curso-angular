import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Curso } from 'src/app/models/curso';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
})
export class CursosListaComponent implements OnInit {
  //cursos: Curso[] = [];
  cursos$: Observable<Curso[]> = new Observable();
  error$ = new Subject<boolean>();
  //bsModalRef: BsModalRef = new BsModalRef();
  constructor(
    private cursosService: CursosService,
    //private modalService: BsModalService
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //   this.cursosService.list().subscribe((dados) => (this.cursos = dados));
    // }
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.cursosService.list().pipe(
      catchError((error) => {
        //this.error$.next(true);
        this.handleError();
        console.error(error);
        return empty();
      })
    );
  }

  handleError() {
    //this.bsModalRef = this.modalService.show(AlertModalComponent);
    //this.bsModalRef.content.type = 'danger';
    //this.bsModalRef.content.message =
    //  'Erro ao carregar os cursos. Por favor, tente novamente mais tarde.';
    this.alertService.showAlertDanger(
      'Erro ao carregar os cursos. Por favor, tente novamente mais tarde.'
    );
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }
}
