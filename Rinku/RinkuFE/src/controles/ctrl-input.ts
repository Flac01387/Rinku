import { autoinject, bindable, bindingMode  } from 'aurelia-framework';

export enum EnumTipoInputs
{
  texto = "text",
  numerico= "number"
}

export class ConfiguracionInput {
    ID: string = '';
    Icono: boolean = false;
    Nombre: string = '';
    Label: string = '';
    Placeholder: string = '';
    SoloLectura: boolean = false;
    Deshabilitado: boolean = false;
    Obligatorio: boolean = false;
    Valor: any = null;
    Clases: string = '';
    Mostrar: boolean = true;
    Tipo: EnumTipoInputs = EnumTipoInputs.texto;
    MaxLength: number = 50;
}

@autoinject
export class CtrlInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) configInput: ConfiguracionInput;

  attached() {
    /*setTimeout(() => {
      var element = document.querySelector("input.input_text");
      element.characterCounter();
    }, 100);  */  
  }
}
