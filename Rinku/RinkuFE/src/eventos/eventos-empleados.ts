import { EnumVistas } from '../enumeradores/enum-vistas';
import { ConfiguracionTabla } from '../controles/ctrl-tabla';

export class CambiarVistasEmpleados { constructor(public vista: EnumVistas) { } }
export class EnviarListaPacientes { constructor(public configuracion: ConfiguracionTabla) { } }
export class EditarEmpleado { constructor(public empleado) { } }