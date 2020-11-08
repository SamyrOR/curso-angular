import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'contador',
  templateUrl: './output-property.component.html',
  styleUrls: ['./output-property.component.css'],
})
export class OutputPropertyComponent implements OnInit {
  @Input() valor: number;
  @Output() mudouValor = new EventEmitter();
  @ViewChild('campoInput') campoValorInput: ElementRef;
  constructor() {
    this.valor = 0;
  }

  ngOnInit(): void {}

  incrementa(): void {
    this.campoValorInput.nativeElement.value++;
    this.mudouValor.emit({
      novoValor: this.campoValorInput.nativeElement.value,
    });
    console.log(this.campoValorInput.nativeElement.value);
  }
  decrementa(): void {
    this.campoValorInput.nativeElement.value--;
    this.mudouValor.emit({
      novoValor: this.campoValorInput.nativeElement.value,
    });
    console.log(this.campoValorInput.nativeElement.value);
  }
}
