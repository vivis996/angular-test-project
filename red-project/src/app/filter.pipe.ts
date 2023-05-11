import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  // filter will reload everytime the array/data changes
  // it cost performance, use only in special ocassions
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(value: {
    instanceType: string,
    name: string,
    status: string,
    started: Date
  }[], filterString: string, propName: string): {
    instanceType: string,
    name: string,
    status: string,
    started: Date
  }[] {
    filterString = filterString.trim();
    if (value.length === 0 || filterString.length === 0) {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
