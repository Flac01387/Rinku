import { bindable, bindingMode, autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as eventosEmpleados from '../../eventos/eventos-empleados';
import { EnumVistas } from '../../enumeradores/enum-vistas';

@autoinject
export class ModEmpleados {
  
  VistasEmpleados: string;
  VistasModelosEmpleados: string;
  tituloEmpleados: string = 'Empleados';
  migas: string[] = ["Empleados"];

  //Subscripciones
  subscribeCambiarVistasEmpleados: any;

  constructor(private ea: EventAggregator) {
    this.cambiarVistaEmpleados(EnumVistas.vistaFiltrosEmpleados);
  }

  attached() {
    var self = this;
    this.subscribeCambiarVistasEmpleados = this.ea.subscribe(eventosEmpleados.CambiarVistasEmpleados, msg => {
      self.cambiarVistaEmpleados(msg.vista);
    });
  }

  detached() {
    this.subscribeCambiarVistasEmpleados.dispose();
  }

  cambiarVistaEmpleados(vista: EnumVistas)
  {
    switch(vista)
    {
      case EnumVistas.vistaFiltrosEmpleados:
        this.migas= ["Empleados","Buscar"];
        this.VistasEmpleados = vista["vista"];
        this.VistasModelosEmpleados = vista["modelo"];
        break;
      case EnumVistas.vistaListaEmpleados:
        this.migas= ["Empleados","Lista Empleados"];
        this.VistasEmpleados = vista["vista"];
        this.VistasModelosEmpleados = vista["modelo"];
        break;
      case EnumVistas.vistaEditarEmpleados:
        this.migas= ["Empleados","Editar Empleado"];
        this.VistasEmpleados = vista["vista"];
        this.VistasModelosEmpleados = vista["modelo"];
        break;
      case EnumVistas.vistaNuevosEmpleados:
        this.migas= ["Empleados","Registrar Empleado"];
        this.VistasEmpleados = vista["vista"];
        this.VistasModelosEmpleados = vista["modelo"];
        break;
    }
  }
}
