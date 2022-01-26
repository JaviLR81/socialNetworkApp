import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agregarArroba'
})
export class AgregarArrobaPipe implements PipeTransform {

  transform(value: string): string {

    if(value.trim().length > 0){
      return value.concat('@');
    }

    return '';
  }

}
