import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroArray',
})
export class FiltroArrayPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value.length === 0 || args === undefined) {
      return value;
    }
    return value;
  }
}
