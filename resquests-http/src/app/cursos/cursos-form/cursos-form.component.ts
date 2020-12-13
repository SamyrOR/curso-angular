import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  submitted: boolean = false;
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private cursosService: Cursos2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.params
    //   .pipe(
    //     map((params: any) => params['id']),
    //     switchMap((id: number) => this.cursosService.loadByID(id))
    //   )
    //   .subscribe((curso) => this.updateForm(curso));
    const curso = this.route.snapshot.data['curso'];
    this.form = this.formBuilder.group({
      id: [curso.id],
      nome: [
        curso.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  // updateForm(curso: Curso) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome,
  //   });
  // }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      let msgSuccess = 'Curso adicionado com sucesso';
      let msgError =
        'O curso não foi inserido, por favor tente novamente mais tarde';
      if (this.form.value.id) {
        msgSuccess = 'Curso atualizado com sucesso';
        msgError =
          'Erro ao atualizar o curso, por favor tente novamente mais tarde';
      }
      this.cursosService.save(this.form.value).subscribe(
        (success) => {
          this.modal.showAlertSuccess(msgSuccess), this.location.back();
        },
        (error) => {
          this.modal.showAlertDanger(msgError);
        }
      );
      // if (this.form.value.id) {
      //   this.cursosService.update(this.form.value).subscribe(
      //     (success) => {
      //       this.modal.showAlertSuccess('Curso atualizado com sucesso'),
      //         this.location.back();
      //     },
      //     (error) =>
      //       this.modal.showAlertDanger(
      //         'Erro ao atualizar o curso, por favor tente novamente mais tarde'
      //       )
      //   );
      // } else {
      //   this.cursosService.create(this.form.value).subscribe(
      //     (success) => {
      //       this.modal.showAlertSuccess('Curso adicionado com sucesso'),
      //         this.location.back();
      //     },
      //     (error) =>
      //       this.modal.showAlertDanger(
      //         'O curso não foi inserido, por favor tente novamente mais tarde'
      //       )
      //   );
      // }
    }
  }
  onCancel() {
    this.submitted = false;

    this.form.reset();
  }
}
