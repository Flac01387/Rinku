var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../../eventos/eventos-empleados", "../../eventos/eventos-controles", "../../controles/ctrl-tabla", "../../controles/ctrl-menu-flotante-horizontal", "../../controles/ctrl-alerta", "../../controles/icono", "../../servicios/web-api/api-puestos", "../../servicios/web-api/api-empleados", "../../enumeradores/enum-respuesta-api", "enumeradores/enum-posiciones", "enumeradores/enum-mensajes", "enumeradores/enum-iconos", "enumeradores/enum-colores", "enumeradores/enum-vistas"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, eventosEmpleados, EventosControles, ctrl_tabla_1, ctrl_menu_flotante_horizontal_1, ctrl_alerta_1, icono_1, api_puestos_1, api_empleados_1, enum_respuesta_api_1, enum_posiciones_1, enum_mensajes_1, enum_iconos_1, enum_colores_1, enum_vistas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CpteFiltrosEmpleados = (function () {
        function CpteFiltrosEmpleados(ea, peticionPuestos, peticionEmpleados) {
            this.ea = ea;
            this.peticionPuestos = peticionPuestos;
            this.peticionEmpleados = peticionEmpleados;
            this.Padre = null;
            this.inicializarControles();
            this.consultarPuestos();
            this.consultarTiposEmpleados();
        }
        CpteFiltrosEmpleados.prototype.attached = function () {
            var self = this;
            this.subscribeEditarEmpleado = this.ea.subscribe(eventosEmpleados.EditarEmpleado, function (msg) {
                self.editarEmpleado(msg.empleado);
            });
            this.subscribeClickAccion = this.ea.subscribe(EventosControles.ClickAccion, function (msg) {
                switch (msg.opc) {
                    case 'EditarEmpleado':
                        self.editarEmpleado(msg.objeto);
                        break;
                }
            });
        };
        CpteFiltrosEmpleados.prototype.detached = function () {
            this.subscribeEditarEmpleado.dispose();
            this.subscribeClickAccion.dispose();
        };
        CpteFiltrosEmpleados.prototype.consultarPuestos = function () {
            var self = this;
            this.peticionPuestos.consultarPuestos()
                .then(function (respuesta) {
                if (respuesta.Codigo == enum_respuesta_api_1.EnumRespuestaAPI.Aceptado) {
                    self.configComboPuestos.JsonDatos = respuesta.Respuesta;
                }
                else
                    new ctrl_alerta_1.CtrlAlerta(respuesta.Mensaje);
            })
                .catch(function (error) {
                new ctrl_alerta_1.CtrlAlerta(enum_mensajes_1.EnumMensajes.ErrorAPI);
            });
        };
        CpteFiltrosEmpleados.prototype.consultarTiposEmpleados = function () {
            var self = this;
            this.peticionEmpleados.consultarTiposEmpleados()
                .then(function (respuesta) {
                if (respuesta.Codigo == enum_respuesta_api_1.EnumRespuestaAPI.Aceptado) {
                    for (var i in respuesta.Respuesta) {
                        respuesta.Respuesta[i].Valor = respuesta.Respuesta[i].ID;
                        respuesta.Respuesta[i].ID = 'tipoEmp-' + respuesta.Respuesta[i].ID;
                    }
                    self.configRadioTiposEmpleados.Opciones = respuesta.Respuesta;
                }
                else
                    new ctrl_alerta_1.CtrlAlerta(respuesta.Mensaje);
            })
                .catch(function (error) {
                new ctrl_alerta_1.CtrlAlerta(enum_mensajes_1.EnumMensajes.ErrorAPI);
            });
        };
        CpteFiltrosEmpleados.prototype.mostrarEmpleados = function (empleados) {
            var _this = this;
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
                var configTablaEmpleados = {
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
                this.ea.publish(new eventosEmpleados.CambiarVistasEmpleados(enum_vistas_1.EnumVistas.vistaListaEmpleados));
                setTimeout(function () {
                    _this.ea.publish(new eventosEmpleados.EnviarListaPacientes(configTablaEmpleados));
                }, 100);
            }
            catch (e) {
                new ctrl_alerta_1.CtrlAlerta("Error al pintar la tabla de empleados");
            }
        };
        CpteFiltrosEmpleados.prototype.cancelar = function () {
            console.log(this.configRadioTiposEmpleados);
        };
        CpteFiltrosEmpleados.prototype.buscar = function () {
            var self = this.Padre;
            self.peticionEmpleados.consultarEmpleados(self.configInputNumero.Valor, self.configInputNombre.Valor, self.configInputPaterno.Valor, self.configInputMaterno.Valor, self.configComboPuestos.Seleccionado, self.configRadioTiposEmpleados.Seleccionado == null ? 0 : self.configRadioTiposEmpleados.Seleccionado.Valor, true)
                .then(function (respuesta) {
                if (respuesta.Codigo == enum_respuesta_api_1.EnumRespuestaAPI.Aceptado) {
                    self.mostrarEmpleados(respuesta.Respuesta);
                }
                else
                    new ctrl_alerta_1.CtrlAlerta(respuesta.Mensaje);
            })
                .catch(function (error) {
                new ctrl_alerta_1.CtrlAlerta(enum_mensajes_1.EnumMensajes.ErrorAPI);
            });
        };
        CpteFiltrosEmpleados.prototype.aceptar = function () {
            var self = this.Padre;
            self.peticionEmpleados.nuevoEmpleado(self.configInputNombre.Valor, self.configInputPaterno.Valor, self.configInputMaterno.Valor, self.configComboPuestos.Seleccionado, self.configRadioTiposEmpleados.Seleccionado.Valor)
                .then(function (respuesta) {
                if (respuesta.Codigo == enum_respuesta_api_1.EnumRespuestaAPI.Aceptado) {
                    self.inicializarControles();
                }
                else
                    new ctrl_alerta_1.CtrlAlerta(respuesta.Mensaje, new icono_1.Icono(enum_iconos_1.EnumIconos.Advertencia, enum_colores_1.EnumColores.Amarillo));
            })
                .catch(function (error) {
                new ctrl_alerta_1.CtrlAlerta(enum_mensajes_1.EnumMensajes.ErrorAPI);
            });
        };
        CpteFiltrosEmpleados.prototype.editarEmpleado = function (empleado) {
            console.log('Editar: ', empleado);
        };
        CpteFiltrosEmpleados.prototype.inicializarControles = function () {
            this.configInputNumero = {
                ID: '',
                Nombre: '',
                Icono: false,
                Label: 'Número de empleado',
                Obligatorio: false,
                Placeholder: '',
                SoloLectura: false,
                Deshabilitado: true,
                Valor: '',
                Clases: ''
            };
            this.configInputNombre = {
                ID: '',
                Nombre: '',
                Icono: false,
                Label: 'Nombre',
                Obligatorio: true,
                Placeholder: '',
                SoloLectura: false,
                Deshabilitado: false,
                Valor: '',
                Clases: ''
            };
            this.configInputPaterno = {
                ID: '',
                Nombre: '',
                Icono: false,
                Label: 'Apellido paterno',
                Obligatorio: true,
                Placeholder: '',
                SoloLectura: false,
                Deshabilitado: false,
                Valor: '',
                Clases: ''
            };
            this.configInputMaterno = {
                ID: '',
                Nombre: '',
                Icono: false,
                Label: 'Apellido Materno',
                Obligatorio: true,
                Placeholder: '',
                SoloLectura: false,
                Deshabilitado: false,
                Valor: '',
                Clases: ''
            };
            this.configComboPuestos = {
                ID: '',
                Nombre: '',
                Icono: false,
                Label: 'Puesto',
                Obligatorio: false,
                SoloLectura: false,
                Deshabilitado: false,
                JsonDatos: [],
                UrlDatos: '',
                TextoDefault: 'Seleccione un puesto',
                ValorDefault: -1,
                Valor: -1
            };
            this.opcionesTiposEmpleados = [];
            this.configRadioTiposEmpleados = {
                Nombre: 'tipoEmpleado',
                Label: '',
                Grupo: 'tipo',
                Obligatorio: false,
                Opciones: this.opcionesTiposEmpleados,
                Seleccionado: null
            };
            this.configBotonBuscar = {
                ID: '',
                Icono: new icono_1.Icono(enum_iconos_1.EnumIconos.Buscar, enum_colores_1.EnumColores.SinColor, enum_posiciones_1.EnumPosiciones.izquierda),
                Nombre: '',
                Texto: 'Buscar',
                Deshabilitado: false,
                Mostrar: true,
                Funcion: 'buscar',
                Padre: this
            };
            this.configBotonCancelar = {
                ID: '',
                Icono: new icono_1.Icono(),
                Nombre: '',
                Texto: 'Cancelar',
                Deshabilitado: false,
                Mostrar: false,
                Funcion: 'cancelar',
                Padre: this
            };
        };
        CpteFiltrosEmpleados = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator, api_puestos_1.ApiPuestos, api_empleados_1.ApiEmpleados])
        ], CpteFiltrosEmpleados);
        return CpteFiltrosEmpleados;
    }());
    exports.CpteFiltrosEmpleados = CpteFiltrosEmpleados;
});
//# sourceMappingURL=cpte-filtros-empleados.js.map