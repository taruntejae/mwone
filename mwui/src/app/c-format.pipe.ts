import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cFormat'
})
export class CFormatPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value > 5) return value+'+';
    else return value;
  }

}
