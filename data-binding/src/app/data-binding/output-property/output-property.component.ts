import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'contador',
  templateUrl: './output-property.component.html',
  styleUrls: ['./output-property.component.css'],
})
export class OutputPropertyComponent implements OnInit {
  @Input() valor: number;
  @Output() mudouValor = new EventEmitter();
  constructor() {
    this.valor = 0;
  }

  ngOnInit(): void {}

  incrementa(): void {
    this.valor++;
    this.mudouValor.emit({ novoValor: this.valor });
  }
  decrementa(): void {
    this.valor--;
    this.mudouValor.emit({ novoValor: this.valor });
  }
}
