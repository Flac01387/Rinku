import { EnumPosiciones } from '../enumeradores/enum-posiciones';
import { EnumIconos } from '../enumeradores/enum-iconos';
import { EnumColores } from '../enumeradores/enum-colores';

export enum EnumTamanosIconos
{
  Chico= "small",
  Mediano= "medium",
  Grande= "big"
}

export class Icono {
  icono: EnumIconos = EnumIconos.SinIcono;
  color: EnumColores = EnumColores.SinColor;
  posicion: EnumPosiciones = EnumPosiciones.default;
  titulo: string = '';
  tamano: EnumTamanosIconos = EnumTamanosIconos.Chico;

  constructor(icono: EnumIconos = EnumIconos.SinIcono, color: EnumColores= EnumColores.SinColor, posicion: EnumPosiciones = EnumPosiciones.default, titulo: string = '', tamano: EnumTamanosIconos= EnumTamanosIconos.Chico) {
    this.icono = icono;
    this.color = color;
    this.posicion = posicion;
    this.titulo = titulo;
    this.tamano = tamano;
  }
}
//https://google.github.io/material-design-icons/