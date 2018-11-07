var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../../eventos/eventos-empleados", "../../eventos/eventos-controles", "../../controles/ctrl-tabla", "../../controles/ctrl-menu-flotante-horizontal", "../../controles/ctrl-alerta", "../../controles/icono", "../../servicios/web-api/api-empleados", "enumeradores/enum-iconos", "enumeradores/enum-colores", "enumeradores/enum-posiciones", "../../enumeradores/enum-respuesta-api", "enumeradores/enum-mensajes", "enumeradores/enum-vistas"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, eventosEmpleados, EventosControles, ctrl_tabla_1, ctrl_menu_flotante_horizontal_1, ctrl_alerta_1, icono_1, api_empleados_1, enum_iconos_1, enum_colores_1, enum_posiciones_1, enum_respuesta_api_1, enum_mensajes_1, enum_vistas_1) {
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
            this.subscribeEnviarListaPacientes = this.ea.subscribe(eventosEmpleados.EnviarListaEmpleados, function (msg) {
                self.mostrarEmpleados(msg.configuracion);
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
                    case 'EditarEmpleado':
                        self.empleado = msg.objeto;
                        self.editarEmpleado();
                        break;
                }
            });
            this.subscribeClickBoton = this.ea.subscribe(EventosControles.ClickBoton, function (msg) {
                var self = _this;
                switch (msg.funcion) {
                    case 'nuevoEmpleado':
                        self.regresarFiltrosEmpleados();
                        break;
                }
            });
        };
        CpteListaEmpleados.prototype.detached = function () {
            this.subscribeEnviarListaPacientes.dispose();
            this.subscribeClickAccion.dispose();
            this.subscribeModalClickAceptar.dispose();
            this.subscribeClickBoton.dispose();
        };
        CpteListaEmpleados.prototype.confirmarEliminarEmpleado = function () {
            this.ea.publish(new EventosControles.MostrarModal());
        };
        CpteListaEmpleados.prototype.mostrarEmpleados = function (empleados) {
            try {
                var empleado = [];
                var IconoPrincipal = new icono_1.Icono(enum_iconos_1.EnumIconos.Opciones, enum_colores_1.EnumColores.Azul, enum_posiciones_1.EnumPosiciones.centro, 'Opciones');
                var Opciones = [];
                Opciones.push(new ctrl_menu_flotante_horizontal_1.ConfiguracionOpcionMenuFlotanteHorizontal(new icono_1.Icono(enum_iconos_1.EnumIconos.Editar, enum_colores_1.EnumColores.Verde, enum_posiciones_1.EnumPosiciones.default, 'Editar'), 'EditarEmpleado'));
                Opciones.push(new ctrl_menu_flotante_horizontal_1.ConfiguracionOpcionMenuFlotanteHorizontal(new icono_1.Icono(enum_iconos_1.EnumIconos.Borrar, enum_colores_1.EnumColores.Rojo, enum_posiciones_1.EnumPosiciones.default, 'Eliminar'), 'EliminarEmpleado'));
                var acciones = new ctrl_menu_flotante_horizontal_1.ConfiguracionMenuFlotanteHorizontal(IconoPrincipal, Opciones);
                for (var i in empleados) {
                    empleado.push({
                        "ID": new ctrl_tabla_1.Columnas(empleados[i].ID, ctrl_tabla_1.EnumTipoColumnas.Entero),
                        "Nombre": new ctrl_tabla_1.Columnas(empleados[i].Nombre, ctrl_tabla_1.EnumTipoColumnas.Texto),
                        "ApellidoPaterno": new ctrl_tabla_1.Columnas(empleados[i].ApellidoPaterno, ctrl_tabla_1.EnumTipoColumnas.Texto),
                        "ApellidoMaterno": new ctrl_tabla_1.Columnas(empleados[i].ApellidoMaterno, ctrl_tabla_1.EnumTipoColumnas.Texto),
                        "Puesto": new ctrl_tabla_1.Columnas(empleados[i].Puesto, ctrl_tabla_1.EnumTipoColumnas.Texto),
                        "TipoEmpleado": new ctrl_tabla_1.Columnas(empleados[i].TipoEmpleado, ctrl_tabla_1.EnumTipoColumnas.Texto),
                        "Acciones": new ctrl_tabla_1.Columnas(acciones, ctrl_tabla_1.EnumTipoColumnas.Acciones)
                    });
                }
                this.configTablaEmpleados = {
                    Encabezados: [
                        new ctrl_tabla_1.Encabezados("ID", "ID"),
                        new ctrl_tabla_1.Encabezados("Nombre", "Nombre"),
                        new ctrl_tabla_1.Encabezados("ApellidoPaterno", "Apellido Paterno"),
                        new ctrl_tabla_1.Encabezados("ApellidoMaterno", "Apellido Materno"),
                        new ctrl_tabla_1.Encabezados("Puesto", "Puesto"),
                        new ctrl_tabla_1.Encabezados("TipoEmpleado", "Tipo Empleado"),
                        new ctrl_tabla_1.Encabezados("", "")
                    ],
                    Clases: '',
                    ID: '',
                    JsonDatos: empleado,
                    Nombre: ''
                };
            }
            catch (e) {
                new ctrl_alerta_1.CtrlAlerta("Error al pintar la tabla de empleados");
            }
        };
        CpteListaEmpleados.prototype.editarEmpleado = function () {
            var _this = this;
            var self = this;
            this.ea.publish(new eventosEmpleados.CambiarVistasEmpleados(enum_vistas_1.EnumVistas.vistaEditarEmpleados));
            setTimeout(function () {
                _this.ea.publish(new eventosEmpleados.EditarEmpleado(self.empleado.ID.Valor));
            }, 100);
        };
        CpteListaEmpleados.prototype.eliminarEmpleado = function () {
            var self = this;
            var empleado = {
                "ID": this.empleado.ID.Valor,
                "Nombre": "",
                "ApellidoPaterno": "",
                "ApellidoMaterno": "",
                "TipoEmpleadoID": 0,
                "PuestoID": 0,
                "Activo": true
            };
            self.peticionEmpleados.eliminarEmpleado(empleado)
                .then(function (respuesta) {
                if (respuesta.Codigo == enum_respuesta_api_1.EnumRespuestaAPI.Aceptado) {
                    new ctrl_alerta_1.CtrlAlerta("El empleado ha sido dado de baja");
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
            this.configBotonNuevoEmpleado = {
                ID: '',
                Icono: new icono_1.Icono(enum_iconos_1.EnumIconos.Guardar, enum_colores_1.EnumColores.SinColor, enum_posiciones_1.EnumPosiciones.izquierda),
                Nombre: '',
                Texto: 'Nuevo',
                Deshabilitado: false,
                Mostrar: true,
                Funcion: 'nuevoEmpleado'
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