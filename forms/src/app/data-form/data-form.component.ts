import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';

import { empty, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { FormValidations } from '../shared/form-validations';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { VerificaEmailService } from '../shared/services/verifica-email.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css'],
})
export class DataFormComponent implements OnInit {
  formulario: FormGroup;
  estados: Observable<EstadoBr[]>;
  cargos: any[];
  tecnologias: any[];
  newsletterOpt: any[];

  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDown: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) {}

  ngOnInit(): void {
    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null),
    // });

    this.formulario = this.formBuilder.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [
        null,
        [Validators.required, Validators.email],
        this.validarEmail.bind(this),
      ],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks(),
    });
    this.estados = this.dropDown.getEstadosBr();
    this.cargos = this.dropDown.getCargos();
    this.tecnologias = this.dropDown.getTecs();
    this.newsletterOpt = this.dropDown.getNewsletter();
    this.formulario
      .get('endereco.cep')
      .statusChanges.pipe(
        distinctUntilChanged(),
        switchMap((status) =>
          status === 'VALID'
            ? this.cepService.consultaCEP(this.getCampo('endereco.cep').value)
            : empty()
        )
      )
      .subscribe((dados) => (dados ? this.populaDadosForm(dados) : {}));
    // this.verificaEmailService.verificarEmail('email@email.com').subscribe();
  }

  buildFrameworks() {
    const values = this.frameworks.map((v) => new FormControl(false));
    return this.formBuilder.array(
      values,
      FormValidations.requiredMinCheckbox(2)
    );
  }

  onSubmit() {
    let valueSubmit = Object.assign({}, this.formulario.value);
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v, i) => (v ? this.frameworks[i] : null))
        .filter((v) => v !== null),
    });
    if (this.formulario.valid) {
      this.http
        .post('https://httpbin.org/post', JSON.stringify(valueSubmit))
        .subscribe(
          (dados) => {
            console.log(dados);
            this.resetarForm();
          },
          (error) => console.log('erro:', error)
        );
    } else {
      console.log('fomulario invalido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((campo) => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if (controle instanceof FormGroup) {
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

  consultaCEP() {
    let cep = this.formulario.get('endereco.cep').value;
    if (cep != null && cep !== '') {
      this.cepService
        .consultaCEP(cep)
        .subscribe((dados) => this.populaDadosForm(dados));
    }
  }
  populaDadosForm(dados) {
    // form.setValue({
    //   nome: form.value.nome,
    //   email: form.value.email,
    //   endereco: {
    //     cep: dados.cep,
    //     numero: '',
    //     complemento: dados.complemento,
    //     rua: dados.logradouro,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     estado: dados.uf,
    //   },
    // });

    if (!('erro' in dados)) {
      this.formulario.patchValue({
        endereco: {
          complemento: dados.complemento,
          rua: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf,
        },
      });
    } else {
      this.resetaDadosForm();
      alert('CEP não encontrado');
    }
  }
  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null,
      },
    });
  }

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Junior', desc: 'Dev  Pl' };
    this.formulario.get('cargo').setValue(cargo);
  }
  comparaObjetos(obj1, obj2) {
    return obj1 && obj2 ? obj1.nome === obj2.nome : obj1 === obj2;
  }

  setarTecnologias() {
    this.formulario.get('tecnologias').setValue(['html', 'css', 'js']);
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService
      .verificarEmail(formControl.value)
      .pipe(
        map((emailExiste) => (emailExiste ? { emailInvalido: true } : null))
      );
  }
}
