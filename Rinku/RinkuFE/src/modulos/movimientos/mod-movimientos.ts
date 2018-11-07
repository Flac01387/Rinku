import { bindable, bindingMode, autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { EnumVistas } from '../../enumeradores/enum-vistas';

@autoinject
export class ModMovimientos {
  
  VistasMovimientos: string;
  VistasModelosMovimientos: string;
  tituloMovimientos: string = 'Movimientos';
  migas: string[] = ["Movimientos"];

  //Subscripciones
  subscribeCambiarVistasMovimientos: any;

  constructor(private ea: EventAggregator) {
    this.cambiarVistaMovimientos(EnumVistas.vistaRegistroMovimientos);
  }

  attached() {
    var self = this;
    /*this.subscribeCambiarVistasNominas = this.ea.subscribe(eventosNominas.CambiarVistasEmpleados, msg => {
      self.cambiarVistaEmpleados(msg.vista);
    });*/
  }

  detached() {
    this.subscribeCambiarVistasMovimientos.dispose();
  }

  cambiarVistaMovimientos(vista: EnumVistas)
  {
    switch(vista)
    {
      case EnumVistas.vistaRegistroMovimientos:
        this.migas= ["Movimientos","Registro Movimientos"];
        this.VistasMovimientos = EnumVistas.vistaRegistroMovimientos["vista"];
        this.VistasModelosMovimientos = EnumVistas.vistaRegistroMovimientos["modelo"];
        break;
    }
  }
}