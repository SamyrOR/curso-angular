import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css'],
})
export class DataBindingComponent implements OnInit {
  url: string;
  cursoAngular: boolean;
  urlImage: string;
  valorAtual: string;
  valorSalvo: string;
  isMouseOver: boolean;
  nome: string;
  pessoa: any = {
    nome: 'Samyr',
    idade: 20,
  };
  nomeDoCurso: string;
  valorInicial: number;
  constructor() {
    this.url = 'https://samyr.com';
    this.cursoAngular = true;
    this.urlImage = 'http://lorempixel.com/400/200/nature/';
    this.valorAtual = '';
    this.valorSalvo = '';
    this.isMouseOver = false;
    this.nome = 'abc';
    this.nomeDoCurso = 'Angular';
    this.valorInicial = 15;
  }

  ngOnInit(): void {}

  getValor(): number {
    return 1;
  }

  getCurtiCurso(): boolean {
    return true;
  }

  botaoClicado() {
    alert('Eu fui clicado');
  }

  onKeyUp(evento: KeyboardEvent): void {
    this.valorAtual = (evento.target as HTMLInputElement).value;
  }

  salvarValor(valor): void {
    this.valorSalvo = valor;
  }
  onMouseOverOut(): void {
    this.isMouseOver = !this.isMouseOver;
  }

  onMudouValor(evento): void {
    console.log(evento);
  }
}
