import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[no-copy-paste]'
})
export class NoCopyPasteDirective {

  constructor() { }

  @HostListener('paste', ['$event']) noPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) noCopy(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) noCut(e: KeyboardEvent) {
    e.preventDefault();
  }
}
