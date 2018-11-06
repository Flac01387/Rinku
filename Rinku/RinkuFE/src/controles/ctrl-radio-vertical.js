var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OpcionRadioVertical = (function () {
        function OpcionRadioVertical() {
            this.ID = '';
            this.Deshabilitado = false;
            this.Nombre = '';
            this.Valor = null;
        }
        return OpcionRadioVertical;
    }());
    exports.OpcionRadioVertical = OpcionRadioVertical;
    var ConfiguracionRadioVertical = (function () {
        function ConfiguracionRadioVertical() {
            this.Nombre = '';
            this.Label = '';
            this.Obligatorio = false;
            this.Opciones = [];
            this.Grupo = '';
            this.Seleccionado = new OpcionRadioVertical();
        }
        return ConfiguracionRadioVertical;
    }());
    exports.ConfiguracionRadioVertical = ConfiguracionRadioVertical;
    var CtrlRadioVertical = (function () {
        function CtrlRadioVertical() {
            this.configRadio = new ConfiguracionRadioVertical();
        }
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", ConfiguracionRadioVertical)
        ], CtrlRadioVertical.prototype, "configRadio", void 0);
        CtrlRadioVertical = __decorate([
            aurelia_framework_1.autoinject
        ], CtrlRadioVertical);
        return CtrlRadioVertical;
    }());
    exports.CtrlRadioVertical = CtrlRadioVertical;
});
//# sourceMappingURL=ctrl-radio-vertical.js.map