import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import 'materialize-css';
import { Router } from 'aurelia-router';
import { EnumVistas } from './enumeradores/enum-vistas';
import { ConfiguracionMenu, ConfiguracionOpcionesMenu } from './controles/ctrl-menu';
import * as EventosMenu from './eventos/eventos-menu';

@autoinject
export class App 
{
  Vistas: string;
  VistasModelos: string;

  configOpcionesMenu: ConfiguracionOpcionesMenu[] = [];
  configMenu: ConfiguracionMenu = new ConfiguracionMenu();

  migas: string[] = [];

  //Subscripciones
  subscribeCambiarModulo: any;

  constructor(private ea: EventAggregator) {
    this.inicializarControles();
  }

  attached() {
    
    var self = this;

    this.subscribeCambiarModulo = this.ea.subscribe(EventosMenu.CambiarModulo, msg =>
    {      
      switch(msg.modulo)
      {
        case "empleados":
          this.cambiarModulo(EnumVistas.vistaEmpleados);
          break;
        case "movimientos":
          this.cambiarModulo(EnumVistas.vistaMovimientos);
          break;
      }
    });
    
    this.cambiarModulo(EnumVistas.vistaEmpleados);
  }

  detached() {
    this.subscribeCambiarModulo.dispose();
  }

  inicializarControles()
  {
    var configOpcionMenu: ConfiguracionOpcionesMenu = {
      Funcion: "empleados",
      Icono: null,
      Nombre: "Empleados"
    };

    this.configOpcionesMenu.push(configOpcionMenu);

    var configOpcionMenu: ConfiguracionOpcionesMenu = {
      Funcion: "movimientos",
      Icono: null,
      Nombre: "Movimientos"
    };

    this.configOpcionesMenu.push(configOpcionMenu);

    this.configMenu.ImagenFondo = "../imagenes/rinku-logo.jpg";
    this.configMenu.Opciones = this.configOpcionesMenu;
    this.configMenu.Titulo = "Rinku";
  }

  cambiarModulo(vista: EnumVistas) {
    this.Vistas = vista["vista"];
    this.VistasModelos = vista["modelo"];

    var elems = document.querySelector('.sidenav');
    var instance = M.Sidenav.init(elems);
    instance.close();
  }
}
  
String.prototype["format"] = function () {
  var base = this;
  for (var ndx = 0; ndx < arguments.length; ndx++) {
    var regexp = new RegExp("\\{" + ndx.toString() + "}", "gi");
    base = base.replace(regexp, arguments[ndx]);
  }
  return base;
}