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
    var ConfiguracionInput = (function () {
        function ConfiguracionInput() {
            this.ID = '';
            this.Icono = false;
            this.Nombre = '';
            this.Label = '';
            this.Placeholder = '';
            this.SoloLectura = false;
            this.Deshabilitado = false;
            this.Obligatorio = false;
            this.Valor = null;
            this.Clases = '';
        }
        return ConfiguracionInput;
    }());
    exports.ConfiguracionInput = ConfiguracionInput;
    var CtrlInput = (function () {
        function CtrlInput() {
        }
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", ConfiguracionInput)
        ], CtrlInput.prototype, "configInput", void 0);
        CtrlInput = __decorate([
            aurelia_framework_1.autoinject
        ], CtrlInput);
        return CtrlInput;
    }());
    exports.CtrlInput = CtrlInput;
});
//# sourceMappingURL=ctrl-input.js.map