import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase',
})
export class CamelCasePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    let values: string[];
    if (typeof value === 'string') {
      values = value.split(' ');
    }
    let result = '';
    for (let value of values) {
      result += this.capitalize(value) + ' ';
    }
    return result;
  }

  capitalize(value: string) {
    return value.substr(0, 1).toUpperCase() + value.substr(1).toLowerCase();
  }
}
