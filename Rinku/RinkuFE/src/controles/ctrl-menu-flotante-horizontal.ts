import { autoinject, bindable, bindingMode  } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Icono } from './icono';
import * as EventosControles from '../eventos/eventos-controles';

export class ConfiguracionOpcionMenuFlotanteHorizontal
{
    Icono: Icono = null;
    Funcion: string = '';

    constructor(Icono: Icono, Funcion: string)
    {
        this.Icono = Icono;
        this.Funcion = Funcion;
    }
}

export class ConfiguracionMenuFlotanteHorizontal
{
    IconoPrincipal: Icono = null;
    Opciones: ConfiguracionOpcionMenuFlotanteHorizontal[] = [];

    constructor(IconoPrincipal: Icono, Opciones: ConfiguracionOpcionMenuFlotanteHorizontal[])
    {
        this.IconoPrincipal = IconoPrincipal;
        this.Opciones = Opciones;
    }
}

@autoinject
export class CtrlMenuFlotanteHorizontal {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) configMenuFlotanteHorizontal: ConfiguracionMenuFlotanteHorizontal;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) informacionRenglon: any;
  
    constructor(private ea: EventAggregator) { }

    attached() {
        var elems = document.querySelectorAll('div.fixed-action-btn.horizontal');  
        M.FloatingActionButton.init(elems, {
            direction: 'left'
        });
    }

    clickAccion(opc: any)
    {
        this.ea.publish(new EventosControles.ClickAccion(opc, this.informacionRenglon));
    }
}