var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../eventos/eventos-controles"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, EventosControles) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfiguracionOpcionMenuFlotanteHorizontal = (function () {
        function ConfiguracionOpcionMenuFlotanteHorizontal(Icono, Funcion) {
            this.Icono = null;
            this.Funcion = '';
            this.Icono = Icono;
            this.Funcion = Funcion;
        }
        return ConfiguracionOpcionMenuFlotanteHorizontal;
    }());
    exports.ConfiguracionOpcionMenuFlotanteHorizontal = ConfiguracionOpcionMenuFlotanteHorizontal;
    var ConfiguracionMenuFlotanteHorizontal = (function () {
        function ConfiguracionMenuFlotanteHorizontal(IconoPrincipal, Opciones) {
            this.IconoPrincipal = null;
            this.Opciones = [];
            this.IconoPrincipal = IconoPrincipal;
            this.Opciones = Opciones;
        }
        return ConfiguracionMenuFlotanteHorizontal;
    }());
    exports.ConfiguracionMenuFlotanteHorizontal = ConfiguracionMenuFlotanteHorizontal;
    var CtrlMenuFlotanteHorizontal = (function () {
        function CtrlMenuFlotanteHorizontal(ea) {
            this.ea = ea;
        }
        CtrlMenuFlotanteHorizontal.prototype.attached = function () {
            var elems = document.querySelectorAll('div.fixed-action-btn.horizontal');
            M.FloatingActionButton.init(elems, {
                direction: 'left'
            });
        };
        CtrlMenuFlotanteHorizontal.prototype.clickAccion = function (opc) {
            this.ea.publish(new EventosControles.ClickAccion(opc, this.informacionRenglon));
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", ConfiguracionMenuFlotanteHorizontal)
        ], CtrlMenuFlotanteHorizontal.prototype, "configMenuFlotanteHorizontal", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], CtrlMenuFlotanteHorizontal.prototype, "informacionRenglon", void 0);
        CtrlMenuFlotanteHorizontal = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator])
        ], CtrlMenuFlotanteHorizontal);
        return CtrlMenuFlotanteHorizontal;
    }());
    exports.CtrlMenuFlotanteHorizontal = CtrlMenuFlotanteHorizontal;
});
//# sourceMappingURL=ctrl-menu-flotante-horizontal.js.map