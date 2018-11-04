import { bindable, bindingMode, autoinject } from 'aurelia-framework';

@autoinject
export class CtrlMigas {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) migas: string[];
}
