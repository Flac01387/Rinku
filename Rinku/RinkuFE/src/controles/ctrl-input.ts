import { autoinject, bindable, bindingMode  } from 'aurelia-framework';

export class ConfiguracionInput {
  ID: string = '';
  Icono: boolean = false;
  Nombre: string = '';
  Label: string = '';
  Placeholder: string = '';
  SoloLectura: boolean = false;
  Deshabilitado: boolean = false;
  Obligatorio: boolean = false;
  Valor: any = null;
  Clases: string = '';
}

@autoinject
export class CtrlInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) configInput: ConfiguracionInput;
}
