import { Icono } from './icono';

export class ConfiguracionAlerta
{
    Icono: Icono = new Icono();
    Mensaje: string = '';
}

export class CtrlAlerta
{
    constructor(mensaje: string, icono: Icono = null)
    {
        var alert: string = '';
        
        alert += (icono != null) ? '<i class="material-icons">'+icono.icono+'</i> ' : '';
        alert += mensaje;

        M.toast({html: mensaje});
    }
}