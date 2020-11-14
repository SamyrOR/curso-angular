import { Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Pipe({
  name: 'filtroArrayImpuro',
  pure: false,
})
export class FiltroArrayImpuroPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    //if (value.length === 0 || args === undefined) return value;
    //return value.filter((v) => v.toLocaleLowerCase().indexOf(args) != -1);
    return value;
  }
}
