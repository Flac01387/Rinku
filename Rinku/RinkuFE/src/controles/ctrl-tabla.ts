import { autoinject, bindable, bindingMode  } from 'aurelia-framework';
import { EnumIconos } from 'enumeradores/enum-iconos';
import { ConfiguracionMenuFlotanteHorizontal } from './ctrl-menu-flotante-horizontal';

export enum EnumTipoColumnas
{
    Entero= "number",
    Decimal= "decimal",
    Texto = "string",
    Fecha = "date",
    Moneda = "money",
    Checkbox = "checkbox",
    Acciones = "actions"
}

export class Columnas
{
    Valor: any = null;
    Tipo: EnumTipoColumnas = null;

    constructor(Valor: any, Tipo: EnumTipoColumnas = EnumTipoColumnas.Texto)
    {
        this.Valor = Valor;
        this.Tipo = Tipo;
    }
}

export class Encabezados{
    Llave: string = '';
    Texto: string = '';

    constructor(Llave: string = '', Texto: string = '')
    {
        this.Llave = Llave;
        this.Texto = Texto;
    }
}

export class ConfiguracionTabla {
  ID: string = '';
  Nombre: string = '';
  Clases: string = '';
  Encabezados: Encabezados[] = [];
  JsonDatos: any[] = [];
}

@autoinject
export class CtrlTabla {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) configTabla: ConfiguracionTabla;
  
  formatearValor(valor: any, tipo: EnumTipoColumnas)
  {
    switch(tipo)
    {
        case EnumTipoColumnas.Texto:
        case EnumTipoColumnas.Entero:
            return valor;
        case EnumTipoColumnas.Moneda:
            return "$"+valor;
        case EnumTipoColumnas.Fecha:
            return valor.substring(0, 10);
        case EnumTipoColumnas.Acciones:
            return;
        default:
            return valor;
    }
  }
}

export class KeysValueConverter {
    toView(obj) {
        return Reflect.ownKeys(obj);
    }
}