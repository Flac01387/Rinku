import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { EnumVistas } from './enumeradores/enum-vistas';

@autoinject
export class App {
  Vistas: string;
  VistasModelos: string;

  migas: string[] = [];

  constructor(private ea: EventAggregator) {
    this.pantallaPrincipal();
  }

  attached()
  {
    //Inicializar  los controles
    /*var element = document.querySelector("div.input-field select");
    M.FormSelect.init(element,{});*/
  }

  pantallaPrincipal() {
    this.Vistas = EnumVistas.vistaEmpleados["vista"];
    this.VistasModelos = EnumVistas.vistaEmpleados["modelo"];
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