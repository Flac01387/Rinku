import { bindable, bindingMode, autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { EnumVistas } from '../../enumeradores/enum-vistas';

@autoinject
export class ModNominas {
  
  VistasEmpleados: string;
  VistasModelosEmpleados: string;
  tituloEmpleados: string = 'Nominas';
  migas: string[] = ["Nominas"];

  //Subscripciones
  subscribeCambiarVistasNominas: any;

  constructor(private ea: EventAggregator) {
    //this.cambiarVistaEmpleados(EnumVistas.vistaFiltrosEmpleados);
  }

  attached() {
    var self = this;
    /*this.subscribeCambiarVistasNominas = this.ea.subscribe(eventosNominas.CambiarVistasEmpleados, msg => {
      self.cambiarVistaEmpleados(msg.vista);
    });*/
  }

  detached() {
    this.subscribeCambiarVistasNominas.dispose();
  }

  cambiarVistaNominas(vista: EnumVistas)
  {
    switch(vista)
    {
      /*case EnumVistas.vistaFiltrosEmpleados:
        this.migas= ["Nominas","Consulta"];
        this.VistasEmpleados = EnumVistas.vistaFiltrosEmpleados["vista"];
        this.VistasModelosEmpleados = EnumVistas.vistaFiltrosEmpleados["modelo"];
        break;*/
    }
  }
}
