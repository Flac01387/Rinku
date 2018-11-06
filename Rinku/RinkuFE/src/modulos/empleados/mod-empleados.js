var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../../eventos/eventos-empleados", "../../enumeradores/enum-vistas"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, eventosEmpleados, enum_vistas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ModEmpleados = (function () {
        function ModEmpleados(ea) {
            this.ea = ea;
            this.tituloEmpleados = 'Empleados';
            this.migas = ["Empleados"];
            this.cambiarVistaEmpleados(enum_vistas_1.EnumVistas.vistaFiltrosEmpleados);
        }
        ModEmpleados.prototype.attached = function () {
            var self = this;
            this.subscribeCambiarVistasEmpleados = this.ea.subscribe(eventosEmpleados.CambiarVistasPacientes, function (msg) {
                self.cambiarVistaEmpleados(msg.vista);
            });
        };
        ModEmpleados.prototype.detached = function () {
            this.subscribeCambiarVistasEmpleados.dispose();
        };
        ModEmpleados.prototype.cambiarVistaEmpleados = function (vista) {
            switch (vista) {
                case enum_vistas_1.EnumVistas.vistaFiltrosEmpleados:
                    this.migas = ["Empleados", "Buscar"];
                    this.VistasEmpleados = enum_vistas_1.EnumVistas.vistaFiltrosEmpleados["vista"];
                    this.VistasModelosEmpleados = enum_vistas_1.EnumVistas.vistaFiltrosEmpleados["modelo"];
                    break;
                case enum_vistas_1.EnumVistas.vistaListaEmpleados:
                    this.migas = ["Empleados", "Lista Empleados"];
                    this.VistasEmpleados = enum_vistas_1.EnumVistas.vistaListaEmpleados["vista"];
                    this.VistasModelosEmpleados = enum_vistas_1.EnumVistas.vistaListaEmpleados["modelo"];
                    break;
            }
        };
        ModEmpleados = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator])
        ], ModEmpleados);
        return ModEmpleados;
    }());
    exports.ModEmpleados = ModEmpleados;
});
//# sourceMappingURL=mod-empleados.js.map