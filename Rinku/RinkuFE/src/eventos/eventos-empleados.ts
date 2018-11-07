import { EnumVistas } from '../enumeradores/enum-vistas';
import { ConfiguracionTabla } from '../controles/ctrl-tabla';

export class CambiarVistasEmpleados { constructor(public vista: EnumVistas) { } }
export class EnviarListaEmpleados { constructor(public configuracion: ConfiguracionTabla) { } }
export class EditarEmpleado { constructor(public empleadoID: number) { } }