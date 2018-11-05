import { autoinject, bindable, bindingMode  } from 'aurelia-framework';
import { Icono } from './icono';

export class ConfiguracionMenuFlotanteHorizontal
{
    IconoPrincipal: Icono = null;
    Opciones: Icono[] = [];

    constructor(IconoPrincipal: Icono, Opciones: Icono[])
    {
        this.IconoPrincipal = IconoPrincipal;
        this.Opciones = Opciones;
    }
}

@autoinject
export class CtrlMenuFlotanteHorizontal {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) configMenuFlotanteHorizontal: ConfiguracionMenuFlotanteHorizontal;

  attached() {
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, {
            direction: 'left'
        });
    });
  }
}