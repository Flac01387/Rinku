import { bindable, bindingMode, autoinject } from 'aurelia-framework';

@autoinject
export class CtrlTitulo {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) titulo: string;
}
