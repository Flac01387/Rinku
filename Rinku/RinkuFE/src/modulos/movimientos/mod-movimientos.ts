import { bindable, bindingMode, autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as EventosMovimientos from '../../eventos/eventos-movimientos';
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
    this.subscribeCambiarVistasMovimientos = this.ea.subscribe(EventosMovimientos.CambiarVistasMovimientos, msg => {
      self.cambiarVistaMovimientos(msg.vista);
    });
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
        this.VistasMovimientos = vista["vista"];
        this.VistasModelosMovimientos = vista["modelo"];
        break;
    }
  }
}