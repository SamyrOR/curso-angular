import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>',
})
export abstract class BaseFormComponent implements OnInit {
  formulario: FormGroup;
  constructor() {}

  ngOnInit(): void {}

  abstract submit();

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }
  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((campo) => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      controle.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetarForm() {
    this.formulario.reset();
  }
  getCampo(campo) {
    let validacao = this.formulario.get(campo);

    return validacao;
  }

  aplicaCssErro(campo: string) {
    let validacao = this.getCampo(campo);
    return {
      'is-invalid': !validacao.valid && validacao.dirty,
    };
  }

  aplicaValidacao(campo: string, error: string) {
    return this.getCampo(campo).hasError(error);
  }
}
