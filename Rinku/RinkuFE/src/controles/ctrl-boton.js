var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../eventos/eventos-controles", "./icono"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, EventosControles, icono_1) {
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
        }
        return ConfiguracionBoton;
    }());
    exports.ConfiguracionBoton = ConfiguracionBoton;
    var CtrlBoton = (function () {
        function CtrlBoton(ea) {
            this.ea = ea;
            this.configBoton = new ConfiguracionBoton();
        }
        CtrlBoton.prototype.clickBoton = function () {
            this.ea.publish(new EventosControles.ClickBoton(this.configBoton.Funcion));
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", ConfiguracionBoton)
        ], CtrlBoton.prototype, "configBoton", void 0);
        CtrlBoton = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator])
        ], CtrlBoton);
        return CtrlBoton;
    }());
    exports.CtrlBoton = CtrlBoton;
});
//# sourceMappingURL=ctrl-boton.js.map