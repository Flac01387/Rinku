import { autoinject, bindable, bindingMode  } from 'aurelia-framework';

export class Encabezados{
    Llave: string = '';
    Texto: string = '';

    constructor(Llave: string = '', Texto: string = '')
    {
        this.Llave = Llave;
        this.Texto = Texto;
    }
}

export class ConfiguracionTabla {
  ID: string = '';
  Nombre: string = '';
  Clases: string = '';
  Encabezados: Encabezados[] = [];
  JsonDatos: any[] = [];
}

@autoinject
export class CtrlTabla {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) configTabla: ConfiguracionTabla;
}

export class KeysValueConverter {
    toView(obj) {
        return Reflect.ownKeys(obj);
    }
}