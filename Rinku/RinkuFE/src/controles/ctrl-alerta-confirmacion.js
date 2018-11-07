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
    var ConfiguracionAlertaConfirmacion = (function () {
        function ConfiguracionAlertaConfirmacion() {
            this.id = 'default';
            this.titulo = '';
            this.mensaje = '';
        }
        return ConfiguracionAlertaConfirmacion;
    }());
    exports.ConfiguracionAlertaConfirmacion = ConfiguracionAlertaConfirmacion;
    var CtrlAlertaConfirmacion = (function () {
        function CtrlAlertaConfirmacion(ea) {
            this.ea = ea;
        }
        CtrlAlertaConfirmacion.prototype.attached = function () {
            var self = this;
            var element = document.getElementById(this.configAlertaConfirmacion.id);
            this.modal = M.Modal.init(element);
            this.subscribeMostrarModal = this.ea.subscribe(EventosControles.MostrarModal, function (msg) {
                self.modal.open();
            });
        };
        CtrlAlertaConfirmacion.prototype.clickAceptar = function () {
            this.ea.publish(new EventosControles.ModalClickAceptar());
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", ConfiguracionAlertaConfirmacion)
        ], CtrlAlertaConfirmacion.prototype, "configAlertaConfirmacion", void 0);
        CtrlAlertaConfirmacion = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator])
        ], CtrlAlertaConfirmacion);
        return CtrlAlertaConfirmacion;
    }());
    exports.CtrlAlertaConfirmacion = CtrlAlertaConfirmacion;
});
//# sourceMappingURL=ctrl-alerta-confirmacion.js.map