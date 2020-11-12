import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective {
  @HostListener('mouseenter') onMouseOver() {
    this.backgroundColor = this.highlightColor;
    this.color = 'white';
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = this.defaultColor;
    this.color = 'black';
  }
  @HostBinding('style.backgroundColor') backgroundColor: string;
  @HostBinding('style.color') color: string;

  @Input() defaultColor: string = 'white';
  @Input() highlightColor: string = 'yellow';

  constructor() {}

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
    this.color = 'black';
  }
}
