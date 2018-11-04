import { EnumPosiciones } from '../enumeradores/enum-posiciones';
import { EnumIconos } from '../enumeradores/enum-iconos';
import { EnumColores } from '../enumeradores/enum-colores';

export class Icono {
  icono: EnumIconos = EnumIconos.SinIcono;
  color: EnumColores = EnumColores.SinColor;
  posicion: EnumPosiciones = EnumPosiciones.default;

  constructor(icono: EnumIconos = EnumIconos.SinIcono, color: EnumColores= EnumColores.SinColor, posicion: EnumPosiciones = EnumPosiciones.default) {
    this.icono = icono;
    this.color = color;
    this.posicion = posicion;
  }
}
//https://google.github.io/material-design-icons/