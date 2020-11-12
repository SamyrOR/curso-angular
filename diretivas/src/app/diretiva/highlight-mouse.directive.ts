import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[highlightMouse]',
})
export class HighlightMouseDirective {
  @HostListener('mouseenter') onMouseOver(): void {
    // this._renderer.setStyle(
    //   this._elementRef.nativeElement,
    //   'background-color',
    //   'yellow'
    // );
    this.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.backgroundColor = 'white';
  }

  @HostBinding('style.backgroundColor') get setColor(): string {
    return this.backgroundColor;
  }
  private backgroundColor: string;

  constructor() {}
}
