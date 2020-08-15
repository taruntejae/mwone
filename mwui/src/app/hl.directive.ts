import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appHl]'
})
export class HlDirective {

  constructor() { }

  @HostBinding('style.border') border = '1px solid green';
  @HostBinding('style.padding') padding = '0.2rem';
  @HostBinding('style.color') color = 'navy';
  @HostBinding('style.backgroundColor') bgColor = 'yellow';

}
