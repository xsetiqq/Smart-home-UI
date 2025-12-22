import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appHighlightActive]',
  standalone: true,
})
export class HighlightActiveDirective {
  @HostBinding('class.card--highlight') hostHighlight = false;

  @Input('appHighlightActive') set highlightActive(value: boolean) {
    this.hostHighlight = value;
  }
}
