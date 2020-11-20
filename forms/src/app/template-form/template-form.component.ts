import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css'],
})
export class TemplateFormComponent implements OnInit {
  usuario: any = {
    nome: '',
    email: '',
    cep: '',
    numero: '',
    complemento: '',
    rua: '',
    bairro: '',
    cidade: '',
    estado: '',
  };
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(form) {
    this.http
      .post('https://httpbin.org/post', JSON.stringify(form.value))
      .subscribe((dados) => console.log(dados));
  }

  aplicaCssErro(campo) {
    return {
      'is-invalid': !campo.valid && campo.touched,
    };
  }

  consultaCEP(cep, form) {
    cep = cep.replace(/\D/g, '');
    if (cep != '') {
      let validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)) {
        this.http
          .get(`//viacep.com.br/ws/${cep}/json`)
          .subscribe((dados) => this.populaDadosForm(dados, form));
      }
    }
  }

  populaDadosForm(dados, form) {
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
      form.form.patchValue({
        endereco: {
          complemento: dados.complemento,
          rua: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf,
        },
      });
    } else {
      this.resetaDadosForm(form);
      alert('CEP não encontrado');
    }
  }
  resetaDadosForm(formulario) {
    formulario.form.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null,
      },
    });
  }
}
