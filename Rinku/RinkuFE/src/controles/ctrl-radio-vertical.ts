import { autoinject, bindable, bindingMode } from 'aurelia-framework';

export class OpcionRadioVertical {
  ID: string = '';
  Deshabilitado: boolean = false;
  Nombre: string = '';
  Valor: any = null;
}

export class ConfiguracionRadioVertical {
  Nombre: string = '';
  Label: string = '';
  Obligatorio: boolean = false;
  Opciones: OpcionRadioVertical[] = [];
  Grupo: string = '';
  Seleccionado: OpcionRadioVertical = new OpcionRadioVertical();
}

@autoinject
export class CtrlRadioVertical {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) configRadio: ConfiguracionRadioVertical = new ConfiguracionRadioVertical();
}
