import { autoinject, bindable, bindingMode } from 'aurelia-framework';
import { Icono } from './icono';

export class ConfiguracionBoton {
  ID: string = '';
  Icono: Icono = new Icono();
  Nombre: string = '';
  Texto: string = '';
  Deshabilitado: boolean = false;
  Funcion: string = '';
  Padre: any = null
}

@autoinject
export class CtrlBoton {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) configBoton: ConfiguracionBoton = new ConfiguracionBoton();

  bind(ctx)
  {
    this.configBoton.Funcion = ctx[this.configBoton.Funcion];
  }
}
