import { autoinject, bindable, bindingMode  } from 'aurelia-framework';

export class ConfiguracionFecha {
    ID: string = '';
    Icono: boolean = true;
    Nombre: string = '';
    Label: string = '';
    SoloLectura: boolean = false;
    Deshabilitado: boolean = false;
    Obligatorio: boolean = false;
    Valor: Date = new Date();
    Clases: string = '';
    FechaMin: any = null;
    FechaMax: any = null;
}

@autoinject
export class CtrlFecha {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) configFecha: ConfiguracionFecha;

    attached() {

        var elems = document.querySelector('.datepicker');
        var instance = M.Datepicker.init(elems);
        instance.options.minDate = new Date(this.configFecha.FechaMin);
        instance.options.maxDate = new Date(this.configFecha.FechaMax);
        instance.setDate();
    }
}
