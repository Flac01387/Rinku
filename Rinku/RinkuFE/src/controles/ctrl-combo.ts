import { autoinject, bindable, bindingMode } from 'aurelia-framework';

export class ConfiguracionCombo {
  ID: string = '';
  Icono: boolean = false;
  Nombre: string = '';
  Label: string = '';
  SoloLectura: boolean = false;
  Deshabilitado: boolean = false;
  Obligatorio: boolean = false;
  UrlDatos: string = '';
  JsonDatos: any[] = [];
  TextoDefault: string = null;
  ValorDefault: number = null;
  Valor: any = null;
}

@autoinject
export class CtrlCombo {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) configCombo: ConfiguracionCombo = new ConfiguracionCombo();

  attached()
  {
    this.configCombo.ValorDefault = 1;
    this.configCombo.TextoDefault = 'Quitarlos del attached';
    var element = document.querySelector("div.input-field select");
    M.FormSelect.init(element);
  }
}
