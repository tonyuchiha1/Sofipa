import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreMes'
})
export class NombreMesPipe implements PipeTransform {
  transform(numeroMes: number): string {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    if (numeroMes >= 1 && numeroMes <= 12) {
      return meses[numeroMes - 1];
    }

    return '';
  }
}
