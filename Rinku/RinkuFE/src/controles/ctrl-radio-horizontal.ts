import { autoinject, bindable, bindingMode, BindingEngine } from 'aurelia-framework';

export class OpcionRadioHorizontal {
  ID: string = '';
  Deshabilitado: boolean = false;
  Nombre: string = '';
  Valor: any = null;
}

export class ConfiguracionRadioHorizontal {
  Nombre: string = '';
  Label: string = '';
  Grupo: string = '';
  Obligatorio: boolean = false;
  Opciones: OpcionRadioHorizontal[] = [];
  Seleccionado: OpcionRadioHorizontal = new OpcionRadioHorizontal();
}

@autoinject
export class CtrlRadioHorizontal {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) configRadio: ConfiguracionRadioHorizontal = new ConfiguracionRadioHorizontal();
}
