import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class StringTruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20, trail: string = '...'): string {
    if (!value) {
      return '';
    }

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
