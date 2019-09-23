import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input('appHighlight') highlight: string;

  constructor(private el: ElementRef) { 
    
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highLight(this.highlight || 'green');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highLight(null);
  }

  highLight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
