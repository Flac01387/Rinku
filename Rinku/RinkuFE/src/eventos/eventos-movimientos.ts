import { EnumVistas } from '../enumeradores/enum-vistas';

export class CambiarVistasMovimientos { constructor(public vista: EnumVistas) { } }
export class RegistrarMovimiento { constructor(public empleado: any) { } }
export class EnviarListaMovimientos { constructor(public movimientos: any) { } }