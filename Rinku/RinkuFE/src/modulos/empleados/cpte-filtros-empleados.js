var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../../eventos/eventos-empleados", "../../eventos/eventos-controles", "../../controles/ctrl-alerta", "../../controles/icono", "../../servicios/web-api/api-puestos", "../../servicios/web-api/api-empleados", "../../enumeradores/enum-respuesta-api", "enumeradores/enum-posiciones", "enumeradores/enum-mensajes", "enumeradores/enum-iconos", "enumeradores/enum-colores", "enumeradores/enum-vistas"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, eventosEmpleados, EventosControles, ctrl_alerta_1, icono_1, api_puestos_1, api_empleados_1, enum_respuesta_api_1, enum_posiciones_1, enum_mensajes_1, enum_iconos_1, enum_colores_1, enum_vistas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CpteFiltrosEmpleados = (function () {
        function CpteFiltrosEmpleados(ea, peticionPuestos, peticionEmpleados) {
            this.ea = ea;
            this.peticionPuestos = peticionPuestos;
            this.peticionEmpleados = peticionEmpleados;
            this.Padre = null;
            this.inicializarControles();
        }
        CpteFiltrosEmpleados.prototype.attached = function () {
            var _this = this;
            var self = this;
            this.subscribeEditarEmpleado = this.ea.subscribe(eventosEmpleados.EditarEmpleado, function (msg) {
                self.inicializarControles();
                self.editarEmpleado(msg.empleadoID);
            });
            this.subscribeClickAccion = this.ea.subscribe(EventosControles.ClickAccion, function (msg) {
                switch (msg.opc) {
                    case 'EditarEmpleado':
                        self.editarEmpleado(msg.objeto);
                        break;
                }
            });
            this.subscribeClickBoton = this.ea.subscribe(EventosControles.ClickBoton, function (msg) {
                var self = _this;
                switch (msg.funcion) {
                    case 'buscar':
                        self.buscar();
                        break;
                    case 'actualizar':
                        self.actualizar();
                        break;
                    case 'cancelar':
                        self.inicializarControles();
                        break;
                }
            });
        };
        CpteFiltrosEmpleados.prototype.detached = function () {
            this.subscribeClickBoton.dispose();
            this.subscribeEditarEmpleado.dispose();
            this.subscribeClickAccion.dispose();
        };
        CpteFiltrosEmpleados.prototype.consultarPuestos = function () {
            var self = this;
            this.peticionPuestos.consultarPuestos()
                .then(function (respuesta) {
                if (respuesta.Codigo == enum_respuesta_api_1.EnumRespuestaAPI.Aceptado) {
                    for (var i in respuesta.Respuesta)
                        respuesta.Respuesta[i].Valor = respuesta.Respuesta[i].ID;
                    self.configComboPuestos.JsonDatos = respuesta.Respuesta;
                    setTimeout(function () {
                        var element = document.querySelector("div.input-field select");
                        M.FormSelect.init(element);
                    }, 100);
                }
                else
                    new ctrl_alerta_1.CtrlAlerta(respuesta.Mensaje);
            })
                .catch(function (error) {
                console.log(enum_mensajes_1.EnumMensajes.ErrorAPI);
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
                console.log(enum_mensajes_1.EnumMensajes.ErrorAPI);
                new ctrl_alerta_1.CtrlAlerta(enum_mensajes_1.EnumMensajes.ErrorAPI);
            });
        };
        CpteFiltrosEmpleados.prototype.mostrarListaEmpleados = function (empleados) {
            var _this = this;
            try {
                this.ea.publish(new eventosEmpleados.CambiarVistasEmpleados(enum_vistas_1.EnumVistas.vistaListaEmpleados));
                setTimeout(function () {
                    _this.ea.publish(new eventosEmpleados.EnviarListaEmpleados(empleados));
                }, 100);
            }
            catch (e) {
                new ctrl_alerta_1.CtrlAlerta("Error al pintar la tabla de empleados");
            }
        };
        CpteFiltrosEmpleados.prototype.buscar = function () {
            var self = this;
            self.peticionEmpleados.consultarEmpleados(self.configInputNumero.Valor, self.configInputNombre.Valor, self.configInputPaterno.Valor, self.configInputMaterno.Valor, self.configComboPuestos.Seleccionado, self.configRadioTiposEmpleados.Seleccionado == null ? 0 : self.configRadioTiposEmpleados.Seleccionado.Valor, true)
                .then(function (respuesta) {
                if (respuesta.Codigo == enum_respuesta_api_1.EnumRespuestaAPI.Aceptado) {
                    self.mostrarListaEmpleados(respuesta.Respuesta);
                }
                else
                    new ctrl_alerta_1.CtrlAlerta(respuesta.Mensaje);
            })
                .catch(function (error) {
                console.log(enum_mensajes_1.EnumMensajes.ErrorAPI);
                new ctrl_alerta_1.CtrlAlerta(enum_mensajes_1.EnumMensajes.ErrorAPI);
            });
        };
        CpteFiltrosEmpleados.prototype.actualizar = function () {
            var self = this;
            self.peticionEmpleados.actualizarEmpleado(self.configInputNumero.Valor, self.configInputNombre.Valor, self.configInputPaterno.Valor, self.configInputMaterno.Valor, self.configComboPuestos.Seleccionado, self.configRadioTiposEmpleados.Seleccionado.Valor, true)
                .then(function (respuesta) {
                if (respuesta.Codigo == enum_respuesta_api_1.EnumRespuestaAPI.Aceptado) {
                    new ctrl_alerta_1.CtrlAlerta("Empleado actualizado correctamente");
                }
                else
                    new ctrl_alerta_1.CtrlAlerta(respuesta.Mensaje, new icono_1.Icono(enum_iconos_1.EnumIconos.Advertencia, enum_colores_1.EnumColores.Amarillo));
            })
                .catch(function (error) {
                console.log(enum_mensajes_1.EnumMensajes.ErrorAPI);
                new ctrl_alerta_1.CtrlAlerta(enum_mensajes_1.EnumMensajes.ErrorAPI);
            });
        };
        CpteFiltrosEmpleados.prototype.aceptar = function () {
            var self = this;
            self.peticionEmpleados.nuevoEmpleado(self.configInputNombre.Valor, self.configInputPaterno.Valor, self.configInputMaterno.Valor, self.configComboPuestos.Seleccionado, self.configRadioTiposEmpleados.Seleccionado.Valor)
                .then(function (respuesta) {
                if (respuesta.Codigo == enum_respuesta_api_1.EnumRespuestaAPI.Aceptado) {
                    new ctrl_alerta_1.CtrlAlerta("Empleado registrado correctamente");
                    self.inicializarControles();
                }
                else
                    new ctrl_alerta_1.CtrlAlerta(respuesta.Mensaje, new icono_1.Icono(enum_iconos_1.EnumIconos.Advertencia, enum_colores_1.EnumColores.Amarillo));
            })
                .catch(function (error) {
                console.log(enum_mensajes_1.EnumMensajes.ErrorAPI);
                new ctrl_alerta_1.CtrlAlerta(enum_mensajes_1.EnumMensajes.ErrorAPI);
            });
        };
        CpteFiltrosEmpleados.prototype.editarEmpleado = function (empleado) {
            var self = this;
            this.configInputNumero.Valor = empleado;
            this.peticionEmpleados.consultarEmpleados(this.configInputNumero.Valor, "", "", "", -1, -1, true)
                .then(function (respuesta) {
                if (respuesta.Codigo == enum_respuesta_api_1.EnumRespuestaAPI.Aceptado) {
                    self.llenarFormulario(respuesta.Respuesta[0]);
                }
                else
                    new ctrl_alerta_1.CtrlAlerta(respuesta.Mensaje);
            })
                .catch(function (error) {
                console.log(enum_mensajes_1.EnumMensajes.ErrorAPI);
                new ctrl_alerta_1.CtrlAlerta(enum_mensajes_1.EnumMensajes.ErrorAPI);
            });
        };
        CpteFiltrosEmpleados.prototype.llenarFormulario = function (empleado) {
            try {
                this.configInputNumero.Deshabilitado = true;
                this.configInputNombre.Valor = empleado.Nombre;
                this.configInputPaterno.Valor = empleado.ApellidoPaterno;
                this.configInputMaterno.Valor = empleado.ApellidoMaterno;
                this.configBotonActualizar.Mostrar = true;
                this.configBotonCancelar.Mostrar = true;
                this.configBotonBuscar.Mostrar = false;
                this.configComboPuestos.Seleccionado;
                var element = document.querySelector("div.input-field select");
                console.log(element);
                var combo = element;
                for (var i = 0; i < combo.length; i++) {
                    if (element[i].value == empleado.PuestoID)
                        combo.selectedIndex = i;
                }
                var elements = document.getElementsByName(this.configRadioTiposEmpleados.Grupo);
                for (var i = 0; i < elements.length; i++) {
                    var x = elements[i];
                    if (x.value == empleado.PuestoID)
                        x.checked = true;
                }
            }
            catch (error) {
                console.log(error);
            }
        };
        CpteFiltrosEmpleados.prototype.inicializarControles = function () {
            this.consultarPuestos();
            this.consultarTiposEmpleados();
            this.configInputNumero = {
                ID: '',
                Nombre: '',
                Icono: false,
                Label: 'Número de empleado',
                Obligatorio: false,
                Placeholder: '',
                SoloLectura: false,
                Deshabilitado: false,
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
                Nombre: 'comboPuestos',
                Icono: false,
                Label: 'Puesto',
                Obligatorio: false,
                SoloLectura: false,
                Deshabilitado: false,
                JsonDatos: [],
                UrlDatos: '',
                TextoDefault: 'Seleccione un puesto',
                ValorDefault: -1,
                Valor: null,
                Seleccionado: null
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
                Funcion: 'buscar'
            };
            this.configBotonCancelar = {
                ID: '',
                Icono: new icono_1.Icono(),
                Nombre: '',
                Texto: 'Cancelar',
                Deshabilitado: false,
                Mostrar: false,
                Funcion: 'cancelar'
            };
            this.configBotonActualizar = {
                ID: '',
                Icono: new icono_1.Icono(),
                Nombre: '',
                Texto: 'Actualizar',
                Deshabilitado: false,
                Mostrar: false,
                Funcion: 'actualizar'
            };
            this.configBotonRegistrar = {
                ID: '',
                Icono: new icono_1.Icono(),
                Nombre: '',
                Texto: 'Registrar',
                Deshabilitado: false,
                Mostrar: false,
                Funcion: 'registrar'
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