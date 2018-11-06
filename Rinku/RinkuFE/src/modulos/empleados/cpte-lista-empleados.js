var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../../eventos/eventos-empleados", "../../controles/icono", "enumeradores/enum-iconos", "enumeradores/enum-colores", "enumeradores/enum-posiciones"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, eventosEmpleados, icono_1, enum_iconos_1, enum_colores_1, enum_posiciones_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CpteListaEmpleados = (function () {
        function CpteListaEmpleados(ea) {
            this.ea = ea;
            this.inicializarControles();
        }
        CpteListaEmpleados.prototype.attached = function () {
            var self = this;
            this.subscribeEnviarListaPacientes = this.ea.subscribe(eventosEmpleados.EnviarListaPacientes, function (msg) {
                self.configTablaEmpleados = msg.configuracion;
            });
        };
        CpteListaEmpleados.prototype.detached = function () {
            this.subscribeEnviarListaPacientes.dispose();
        };
        CpteListaEmpleados.prototype.inicializarControles = function () {
            this.configBotonAceptar = {
                ID: '',
                Icono: new icono_1.Icono(enum_iconos_1.EnumIconos.Guardar, enum_colores_1.EnumColores.SinColor, enum_posiciones_1.EnumPosiciones.izquierda),
                Nombre: '',
                Texto: 'Aceptar',
                Deshabilitado: false,
                Mostrar: false,
                Funcion: 'aceptar',
                Padre: this
            };
        };
        CpteListaEmpleados = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator])
        ], CpteListaEmpleados);
        return CpteListaEmpleados;
    }());
    exports.CpteListaEmpleados = CpteListaEmpleados;
});
//# sourceMappingURL=cpte-lista-empleados.js.map