import { EnumPosiciones } from '../enumeradores/enum-posiciones';

export class Icono {
  nombre: string = '';
  posicion: EnumPosiciones = EnumPosiciones.default;

  constructor(nombre: string = '', posicion: EnumPosiciones = EnumPosiciones.default) {
    this.nombre = nombre;
    this.posicion = posicion;
  }
}
