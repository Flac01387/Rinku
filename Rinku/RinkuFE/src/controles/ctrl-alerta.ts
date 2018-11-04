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
        var alerta: string = '';
        
        alerta += (icono != null) ? '<i class="material-icons icon-'+icono.color+'">'+icono.icono+'</i> ' : '';
        alerta += mensaje;

        M.toast({html: alerta});
    }
}