import { bindable, bindingMode, autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as EventosNominas from '../../eventos/eventos-nominas';
import { EnumVistas } from '../../enumeradores/enum-vistas';

@autoinject
export class ModNominas {
  
  VistasNominas: string;
  VistasModelosNominas: string;
  tituloNominas: string = 'Nomina';
  migas: string[] = ["Nomina"];

  //Subscripciones
  subscribeCambiarVistasNominas: any;

  constructor(private ea: EventAggregator) {
    this.cambiarVistaNominas(EnumVistas.vistaListaNominas);
  }

  attached() {
    var self = this;
    this.subscribeCambiarVistasNominas = this.ea.subscribe(EventosNominas.CambiarVistasNominas, msg => {
      self.cambiarVistaNominas(msg.vista);
    });
  }

  detached() {
    this.subscribeCambiarVistasNominas.dispose();
  }

  cambiarVistaNominas(vista: EnumVistas)
  {
    switch(vista)
    {
      case EnumVistas.vistaListaNominas:
        this.migas= ["Nomina","Consulta"];
        this.VistasNominas = vista["vista"];
        this.VistasModelosNominas = vista["modelo"];
        break;
    }
  }
}
