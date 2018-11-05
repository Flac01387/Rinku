import { EnumVistas } from '../enumeradores/enum-vistas';
import { ConfiguracionTabla } from '../controles/ctrl-tabla';

export class CambiarVistasPacientes { constructor(public vista: EnumVistas) { } }
export class EnviarListaPacientes { constructor(public configuracion: ConfiguracionTabla) { } }