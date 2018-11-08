import { autoinject, bindable, bindingMode } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as EventosMenu from '../eventos/eventos-menu';
import { Icono } from './icono';

export class ConfiguracionOpcionesMenu {
  Funcion: string = "";
  Nombre: string = ""
  Icono: Icono = null;
}

export class ConfiguracionMenu {
  Titulo: string = "";
  ImagenFondo: string = "";
  Opciones: any[] = [];
}

@autoinject
export class CtrlMenu
{
  @bindable({ defaultBindingMode: bindingMode.twoWay }) configMenu: ConfiguracionMenu = new ConfiguracionMenu();

  constructor(private ea: EventAggregator) { }

  attached() {
    var elems = document.querySelector('.sidenav');
    var instance = M.Sidenav.init(elems);
    instance.open();
  }

  clickOpcion(opcion: string)
  {
    this.ea.publish(new EventosMenu.CambiarModulo(opcion));
  }
}