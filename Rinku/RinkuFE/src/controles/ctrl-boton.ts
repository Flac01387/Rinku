import { autoinject, bindable, bindingMode } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as EventosControles from '../eventos/eventos-controles';
import { Icono } from './icono';

export class ConfiguracionBoton {
  ID: string = '';
  Icono: Icono = new Icono();
  Nombre: string = '';
  Texto: string = '';
  Deshabilitado: boolean = false;
  Mostrar: boolean = true;
  Funcion: string = '';
}

@autoinject
export class CtrlBoton {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) configBoton: ConfiguracionBoton = new ConfiguracionBoton();

  constructor(private ea: EventAggregator) { }

  clickBoton()
  {
    this.ea.publish(new EventosControles.ClickBoton(this.configBoton.Funcion));
  }
}
