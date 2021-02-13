import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, Name: string): any[] {

    const resultArray = [];
    if (value.length === 0 || filterString === '' || Name === '') {
      return value;
    }

    for (const item of value) {
      if (item[Name] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
