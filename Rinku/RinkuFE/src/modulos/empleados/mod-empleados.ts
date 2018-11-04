import { bindable, bindingMode, autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class ModEmpleados {
  tituloEmpleados: string = 'Empleados';
  migas: string[] = ["Empleados","Buscar"];
}
