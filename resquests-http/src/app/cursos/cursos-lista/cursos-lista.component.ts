import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject, EMPTY } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
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
  bsModalRef: BsModalRef = new BsModalRef();
  @ViewChild('deleteModal') deleteModal: any;
  cursoSelected: Curso = { id: null, nome: null };
  constructor(
    private cursosService: CursosService,
    private modalService: BsModalService,
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

  onDelete(curso: Curso) {
    this.cursoSelected = curso;
    // this.bsModalRef = this.modalService.show(this.deleteModal, {
    //   class: 'modal-sm',
    // });
    // this.alertService.showConfirm(
    //   'Você tem certeza?',
    //   'Tem certeza de que deseja excluir este curso?'
    // );
    const result$ = this.alertService
      .showConfirm(
        'Você tem certeza?',
        'Tem certeza de que deseja excluir este curso?'
      )
      .asObservable();
    result$
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.cursosService.remove(curso.id) : EMPTY
        )
      )
      .subscribe(
        (success) => {
          this.onRefresh();
        },
        (error) => this.alertService.showAlertDanger('Erro ao remover curso.')
      );
  }

  onConfirmDelete() {
    this.cursosService.remove(this.cursoSelected.id).subscribe(
      (success) => {
        this.onRefresh();
        this.bsModalRef.hide();
      },
      (error) => this.alertService.showAlertDanger('Erro ao remover curso.')
    );
  }

  onDeclineDelete() {
    this.bsModalRef.hide();
  }
}
