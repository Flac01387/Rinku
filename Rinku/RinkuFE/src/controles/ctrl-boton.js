var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./icono"], function (require, exports, aurelia_framework_1, icono_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfiguracionBoton = (function () {
        function ConfiguracionBoton() {
            this.ID = '';
            this.Icono = new icono_1.Icono();
            this.Nombre = '';
            this.Texto = '';
            this.Deshabilitado = false;
            this.Mostrar = true;
            this.Funcion = '';
            this.Padre = null;
        }
        return ConfiguracionBoton;
    }());
    exports.ConfiguracionBoton = ConfiguracionBoton;
    var CtrlBoton = (function () {
        function CtrlBoton() {
            this.configBoton = new ConfiguracionBoton();
        }
        CtrlBoton.prototype.bind = function (ctx) {
            this.configBoton.Funcion = ctx[this.configBoton.Funcion];
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", ConfiguracionBoton)
        ], CtrlBoton.prototype, "configBoton", void 0);
        CtrlBoton = __decorate([
            aurelia_framework_1.autoinject
        ], CtrlBoton);
        return CtrlBoton;
    }());
    exports.CtrlBoton = CtrlBoton;
});
//# sourceMappingURL=ctrl-boton.js.map