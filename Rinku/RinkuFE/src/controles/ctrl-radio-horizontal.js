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
    var OpcionRadioHorizontal = (function () {
        function OpcionRadioHorizontal() {
            this.ID = '';
            this.Deshabilitado = false;
            this.Nombre = '';
            this.Valor = null;
        }
        return OpcionRadioHorizontal;
    }());
    exports.OpcionRadioHorizontal = OpcionRadioHorizontal;
    var ConfiguracionRadioHorizontal = (function () {
        function ConfiguracionRadioHorizontal() {
            this.Nombre = '';
            this.Label = '';
            this.Grupo = '';
            this.Obligatorio = false;
            this.Opciones = [];
            this.Seleccionado = new OpcionRadioHorizontal();
        }
        return ConfiguracionRadioHorizontal;
    }());
    exports.ConfiguracionRadioHorizontal = ConfiguracionRadioHorizontal;
    var CtrlRadioHorizontal = (function () {
        function CtrlRadioHorizontal() {
            this.configRadio = new ConfiguracionRadioHorizontal();
        }
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", ConfiguracionRadioHorizontal)
        ], CtrlRadioHorizontal.prototype, "configRadio", void 0);
        CtrlRadioHorizontal = __decorate([
            aurelia_framework_1.autoinject
        ], CtrlRadioHorizontal);
        return CtrlRadioHorizontal;
    }());
    exports.CtrlRadioHorizontal = CtrlRadioHorizontal;
});
//# sourceMappingURL=ctrl-radio-horizontal.js.map