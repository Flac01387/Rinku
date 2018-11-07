var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../../eventos/eventos-empleados", "../../eventos/eventos-controles", "../../controles/ctrl-alerta", "../../controles/icono", "../../servicios/web-api/api-empleados", "enumeradores/enum-iconos", "enumeradores/enum-colores", "enumeradores/enum-posiciones", "../../enumeradores/enum-respuesta-api", "enumeradores/enum-mensajes", "enumeradores/enum-vistas"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, eventosEmpleados, EventosControles, ctrl_alerta_1, icono_1, api_empleados_1, enum_iconos_1, enum_colores_1, enum_posiciones_1, enum_respuesta_api_1, enum_mensajes_1, enum_vistas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CpteListaEmpleados = (function () {
        function CpteListaEmpleados(ea, peticionEmpleados) {
            this.ea = ea;
            this.peticionEmpleados = peticionEmpleados;
            this.inicializarControles();
        }
        CpteListaEmpleados.prototype.attached = function () {
            var _this = this;
            var self = this;
            this.subscribeEnviarListaPacientes = this.ea.subscribe(eventosEmpleados.EnviarListaPacientes, function (msg) {
                self.configTablaEmpleados = msg.configuracion;
            });
            this.subscribeModalClickAceptar = this.ea.subscribe(EventosControles.ModalClickAceptar, function (msg) {
                _this.eliminarEmpleado();
            });
            this.subscribeClickAccion = this.ea.subscribe(EventosControles.ClickAccion, function (msg) {
                switch (msg.opc) {
                    case 'EliminarEmpleado':
                        self.empleado = msg.objeto;
                        self.confirmarEliminarEmpleado();
                        break;
                }
            });
        };
        CpteListaEmpleados.prototype.detached = function () {
            this.subscribeEnviarListaPacientes.dispose();
            this.subscribeClickAccion.dispose();
            this.subscribeModalClickAceptar.dispose();
        };
        CpteListaEmpleados.prototype.confirmarEliminarEmpleado = function () {
            this.ea.publish(new EventosControles.MostrarModal());
        };
        CpteListaEmpleados.prototype.eliminarEmpleado = function () {
            var self = this;
            self.peticionEmpleados.eliminarEmpleado(this.empleado.ID.Valor)
                .then(function (respuesta) {
                if (respuesta.Codigo == enum_respuesta_api_1.EnumRespuestaAPI.Aceptado) {
                    self.regresarFiltrosEmpleados();
                }
                else
                    new ctrl_alerta_1.CtrlAlerta(respuesta.Mensaje);
            })
                .catch(function (error) {
                new ctrl_alerta_1.CtrlAlerta(enum_mensajes_1.EnumMensajes.ErrorAPI);
            });
        };
        CpteListaEmpleados.prototype.regresarFiltrosEmpleados = function () {
            this.ea.publish(new eventosEmpleados.CambiarVistasEmpleados(enum_vistas_1.EnumVistas.vistaFiltrosEmpleados));
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
            this.configAlertaEmpleados = {
                id: 'modalEliminarEmpleado',
                titulo: 'Empleados',
                mensaje: '¿Desea eliminar al empleado?'
            };
        };
        CpteListaEmpleados = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator, api_empleados_1.ApiEmpleados])
        ], CpteListaEmpleados);
        return CpteListaEmpleados;
    }());
    exports.CpteListaEmpleados = CpteListaEmpleados;
});
//# sourceMappingURL=cpte-lista-empleados.js.map