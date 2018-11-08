var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "./enumeradores/enum-vistas", "./controles/ctrl-menu", "./eventos/eventos-menu", "materialize-css"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, enum_vistas_1, ctrl_menu_1, EventosMenu) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App(ea) {
            this.ea = ea;
            this.configOpcionesMenu = [];
            this.configMenu = new ctrl_menu_1.ConfiguracionMenu();
            this.migas = [];
            this.inicializarControles();
        }
        App.prototype.attached = function () {
            var _this = this;
            var self = this;
            this.subscribeCambiarModulo = this.ea.subscribe(EventosMenu.CambiarModulo, function (msg) {
                switch (msg.modulo) {
                    case "empleados":
                        _this.cambiarModulo(enum_vistas_1.EnumVistas.vistaEmpleados);
                        break;
                    case "movimientos":
                        _this.cambiarModulo(enum_vistas_1.EnumVistas.vistaMovimientos);
                        break;
                }
            });
            this.cambiarModulo(enum_vistas_1.EnumVistas.vistaEmpleados);
        };
        App.prototype.detached = function () {
            this.subscribeCambiarModulo.dispose();
        };
        App.prototype.inicializarControles = function () {
            var configOpcionMenu = {
                Funcion: "empleados",
                Icono: null,
                Nombre: "Empleados"
            };
            this.configOpcionesMenu.push(configOpcionMenu);
            var configOpcionMenu = {
                Funcion: "movimientos",
                Icono: null,
                Nombre: "Movimientos"
            };
            this.configOpcionesMenu.push(configOpcionMenu);
            this.configMenu.ImagenFondo = "../imagenes/rinku-logo.jpg";
            this.configMenu.Opciones = this.configOpcionesMenu;
            this.configMenu.Titulo = "Rinku";
        };
        App.prototype.cambiarModulo = function (vista) {
            this.Vistas = vista["vista"];
            this.VistasModelos = vista["modelo"];
            var elems = document.querySelector('.sidenav');
            var instance = M.Sidenav.init(elems);
            instance.close();
        };
        App = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator])
        ], App);
        return App;
    }());
    exports.App = App;
    String.prototype["format"] = function () {
        var base = this;
        for (var ndx = 0; ndx < arguments.length; ndx++) {
            var regexp = new RegExp("\\{" + ndx.toString() + "}", "gi");
            base = base.replace(regexp, arguments[ndx]);
        }
        return base;
    };
});



define('text!app.html',[],function(){return "<template><require from=\"materialize-css/dist/css/materialize.css\"></require><require from=\"./controles/ctrl-menu\"></require><div class=\"row\"><div class=\"col s12\"><compose view.bind=\"Vistas\" view-model.bind=\"VistasModelos\"></compose></div></div><ctrl-menu config-menu.bind=\"configMenu\"></ctrl-menu></template>";});
define('controles/ctrl-alerta',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CtrlAlerta = (function () {
        function CtrlAlerta(mensaje, icono) {
            if (icono === void 0) { icono = null; }
            var alerta = '';
            alerta += (icono != null) ? '<i class="material-icons icon-' + icono.color + '">' + icono.icono + '</i> ' : '';
            alerta += mensaje;
            M.toast({ html: alerta });
        }
        return CtrlAlerta;
    }());
    exports.CtrlAlerta = CtrlAlerta;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('controles/ctrl-alerta-confirmacion',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../eventos/eventos-controles"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, EventosControles) {
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



define('text!controles/ctrl-alerta-confirmacion.html',[],function(){return "<template><div id=\"${configAlertaConfirmacion.id}\" class=\"modal\"><div class=\"modal-content\"><h4>${configAlertaConfirmacion.titulo}</h4><p>${configAlertaConfirmacion.mensaje}</p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a> <a href=\"#!\" class=\"modal-close waves-effect waves-green btn-flat\" click.delegate=\"clickAceptar()\">Aceptar</a></div></div></template>";});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('controles/ctrl-boton',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../eventos/eventos-controles", "./icono"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, EventosControles, icono_1) {
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



define('text!controles/ctrl-boton.html',[],function(){return "<template><div class=\"row\"><div class=\"col s12\"><a class=\"waves-effect waves-light btn\" if.bind=\"configBoton.Mostrar\" click.delegate=\"clickBoton()\"><i if.bind=\"configBoton.Icono.icono != ''\" class=\"material-icons ${configBoton.Icono.posicion}\">${configBoton.Icono.icono}</i> ${configBoton.Texto} </a></div></div></template>";});
define('text!controles/ctrl-checkbox.html',[],function(){return "<div class=\"row\"><div class=\"col s12\"><label><input type=\"checkbox\"> <span>Obternerlo</span></label></div></div>";});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('controles/ctrl-combo',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfiguracionCombo = (function () {
        function ConfiguracionCombo() {
            this.ID = '';
            this.Icono = false;
            this.Nombre = '';
            this.Label = '';
            this.SoloLectura = false;
            this.Deshabilitado = false;
            this.Obligatorio = false;
            this.UrlDatos = '';
            this.JsonDatos = [];
            this.TextoDefault = '';
            this.ValorDefault = null;
            this.Valor = null;
            this.Seleccionado = null;
        }
        return ConfiguracionCombo;
    }());
    exports.ConfiguracionCombo = ConfiguracionCombo;
    var CtrlCombo = (function () {
        function CtrlCombo() {
            this.configCombo = new ConfiguracionCombo();
        }
        CtrlCombo.prototype.attached = function () {
            var element = document.querySelector("div.input-field select");
            M.FormSelect.init(element);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", ConfiguracionCombo)
        ], CtrlCombo.prototype, "configCombo", void 0);
        CtrlCombo = __decorate([
            aurelia_framework_1.autoinject
        ], CtrlCombo);
        return CtrlCombo;
    }());
    exports.CtrlCombo = CtrlCombo;
});



define('text!controles/ctrl-combo.html',[],function(){return "<template><div class=\"row\"><div class=\"col s12\"><div class=\"input-field col s12\"><select name=\"${configCombo.Nombre}\" value.bind=\"configCombo.Seleccionado\"><option if.bind=\"configCombo.TextoDefault != ''\" model.bind=\"configCombo.ValorDefault\" selected=\"selected\">${configCombo.TextoDefault}</option><option repeat.for=\"item of configCombo.JsonDatos\" value=\"${item.Valor}\" model.bind=\"item\">${item.Nombre}</option></select> <label>${configCombo.Label}</label></div></div></div></template>";});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('controles/ctrl-fecha',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfiguracionFecha = (function () {
        function ConfiguracionFecha() {
            this.ID = '';
            this.Icono = true;
            this.Nombre = '';
            this.Label = '';
            this.SoloLectura = false;
            this.Deshabilitado = false;
            this.Obligatorio = false;
            this.Valor = new Date();
            this.Clases = '';
            this.FechaMin = null;
            this.FechaMax = null;
        }
        return ConfiguracionFecha;
    }());
    exports.ConfiguracionFecha = ConfiguracionFecha;
    var CtrlFecha = (function () {
        function CtrlFecha() {
        }
        CtrlFecha.prototype.attached = function () {
            var elems = document.querySelector('.datepicker');
            var instance = M.Datepicker.init(elems);
            instance.options.minDate = new Date(this.configFecha.FechaMin);
            instance.options.maxDate = new Date(this.configFecha.FechaMax);
            instance.setDate();
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", ConfiguracionFecha)
        ], CtrlFecha.prototype, "configFecha", void 0);
        CtrlFecha = __decorate([
            aurelia_framework_1.autoinject
        ], CtrlFecha);
        return CtrlFecha;
    }());
    exports.CtrlFecha = CtrlFecha;
});



define('text!controles/ctrl-fecha.html',[],function(){return "<template><div class=\"row\"><form class=\"col s12\"><div class=\"row\"><div class=\"input-field col s12\"><i class=\"material-icons prefix\" if.bind=\"configFecha.Icono\">calendar_today</i> <input type=\"text\" class=\"datepicker\"> <label for=\"icon_prefix2\">${configFecha.Label}</label></div></div></form></div></template>";});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('controles/ctrl-input',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfiguracionInput = (function () {
        function ConfiguracionInput() {
            this.ID = '';
            this.Icono = false;
            this.Nombre = '';
            this.Label = '';
            this.Placeholder = '';
            this.SoloLectura = false;
            this.Deshabilitado = false;
            this.Obligatorio = false;
            this.Valor = null;
            this.Clases = '';
        }
        return ConfiguracionInput;
    }());
    exports.ConfiguracionInput = ConfiguracionInput;
    var CtrlInput = (function () {
        function CtrlInput() {
        }
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", ConfiguracionInput)
        ], CtrlInput.prototype, "configInput", void 0);
        CtrlInput = __decorate([
            aurelia_framework_1.autoinject
        ], CtrlInput);
        return CtrlInput;
    }());
    exports.CtrlInput = CtrlInput;
});



define('text!controles/ctrl-input.html',[],function(){return "<template><div class=\"row\"><div class=\"col s12\"><div class=\"input-field\"><input disabled.bind=\"configInput.Deshabilitado\" type=\"text\" class=\"validate ${configInput.Clases}\" value.bind=\"configInput.Valor\"> <label for=\"\">${configInput.Label}</label></div></div></div></template>";});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('controles/ctrl-menu',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../eventos/eventos-menu"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, EventosMenu) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfiguracionOpcionesMenu = (function () {
        function ConfiguracionOpcionesMenu() {
            this.Funcion = "";
            this.Nombre = "";
            this.Icono = null;
        }
        return ConfiguracionOpcionesMenu;
    }());
    exports.ConfiguracionOpcionesMenu = ConfiguracionOpcionesMenu;
    var ConfiguracionMenu = (function () {
        function ConfiguracionMenu() {
            this.Titulo = "";
            this.ImagenFondo = "";
            this.Opciones = [];
        }
        return ConfiguracionMenu;
    }());
    exports.ConfiguracionMenu = ConfiguracionMenu;
    var CtrlMenu = (function () {
        function CtrlMenu(ea) {
            this.ea = ea;
            this.configMenu = new ConfiguracionMenu();
        }
        CtrlMenu.prototype.attached = function () {
            var elems = document.querySelector('.sidenav');
            var instance = M.Sidenav.init(elems);
            instance.open();
        };
        CtrlMenu.prototype.clickOpcion = function (opcion) {
            this.ea.publish(new EventosMenu.CambiarModulo(opcion));
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", ConfiguracionMenu)
        ], CtrlMenu.prototype, "configMenu", void 0);
        CtrlMenu = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator])
        ], CtrlMenu);
        return CtrlMenu;
    }());
    exports.CtrlMenu = CtrlMenu;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('controles/ctrl-menu-flotante-horizontal',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../eventos/eventos-controles"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, EventosControles) {
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



define('text!controles/ctrl-menu-flotante-horizontal.html',[],function(){return "<template><div class=\"row\"><div class=\"col s12\"><div style=\"position:relative;height:70px\"><div class=\"fixed-action-btn horizontal direction-top direction-left\" style=\"position:absolute;display:inline-block;right:24px\"><a class=\"btn-floating btn-large ${configMenuFlotanteHorizontal.IconoPrincipal.color}\"><i class=\"small material-icons\">${configMenuFlotanteHorizontal.IconoPrincipal.icono}</i></a><ul><li repeat.for=\"opc of configMenuFlotanteHorizontal.Opciones\"><a class=\"btn-floating ${opc.Icono.color}\" click.delegate=\"clickAccion(opc.Funcion)\" style=\"opacity:0;transform:scale(.4) translateY(0) translateX(40px)\"><i class=\"material-icons\">${opc.Icono.icono}</i></a></li></ul></div></div></div></div></template>";});
define('text!controles/ctrl-menu.html',[],function(){return "<template><div class=\"row\"><div class=\"col s12\"><ul id=\"slide-out\" class=\"sidenav\"><li><div class=\"user-view\" style=\"width:360px;height:160px\"><div class=\"background\" style=\"text-align:center\"><img src=\"${configMenu.ImagenFondo}\" height=\"160px;\"></div></div></li><li><div class=\"divider\"></div></li><li><a class=\"subheader\" style=\"text-align:center\">${configMenu.Titulo}</a></li><li><div class=\"divider\"></div></li><li><a class=\"waves-effect\" href=\"#!\" repeat.for=\"opcion of configMenu.Opciones\" click.delegate=\"clickOpcion(opcion.Funcion)\">${opcion.Nombre}</a></li><li><div class=\"divider\"></div></li></ul></div></div></template>";});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('controles/ctrl-migas',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CtrlMigas = (function () {
        function CtrlMigas() {
        }
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Array)
        ], CtrlMigas.prototype, "migas", void 0);
        CtrlMigas = __decorate([
            aurelia_framework_1.autoinject
        ], CtrlMigas);
        return CtrlMigas;
    }());
    exports.CtrlMigas = CtrlMigas;
});



define('text!controles/ctrl-migas.html',[],function(){return "<template><div class=\"row\"><div class=\"col s12\"><nav><div class=\"nav-wrapper\"><div class=\"col s12\"><span href=\"#\" data-target=\"slide-out\" class=\"left-align sidenav-trigger\"><i class=\"material-icons\">menu</i> </span><a href=\"#!\" repeat.for=\"miga of migas\" class=\"breadcrumb\">${miga}</a></div></div></nav></div></div></template>";});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('controles/ctrl-radio-horizontal',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OpcionRadioHorizontal = (function () {
        function OpcionRadioHorizontal() {
            this.ID = '';
            this.Deshabilitado = false;
            this.Nombre = '';
            this.Valor = null;
        }
        return OpcionRadioHorizontal;
    }());
    exports.OpcionRadioHorizontal = OpcionRadioHorizontal;
    var ConfiguracionRadioHorizontal = (function () {
        function ConfiguracionRadioHorizontal() {
            this.Nombre = '';
            this.Label = '';
            this.Grupo = '';
            this.Obligatorio = false;
            this.Opciones = [];
            this.Seleccionado = new OpcionRadioHorizontal();
        }
        return ConfiguracionRadioHorizontal;
    }());
    exports.ConfiguracionRadioHorizontal = ConfiguracionRadioHorizontal;
    var CtrlRadioHorizontal = (function () {
        function CtrlRadioHorizontal() {
            this.configRadio = new ConfiguracionRadioHorizontal();
        }
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", ConfiguracionRadioHorizontal)
        ], CtrlRadioHorizontal.prototype, "configRadio", void 0);
        CtrlRadioHorizontal = __decorate([
            aurelia_framework_1.autoinject
        ], CtrlRadioHorizontal);
        return CtrlRadioHorizontal;
    }());
    exports.CtrlRadioHorizontal = CtrlRadioHorizontal;
});



define('text!controles/ctrl-radio-horizontal.html',[],function(){return "<template><div class=\"row\"><div class=\"col s12\"><label repeat.for=\"radio of configRadio.Opciones\"><input class=\"with-gap\" type=\"radio\" name=\"${configRadio.Grupo}\" id=\"\" model.bind=\"radio\" checked.bind=\"configRadio.Seleccionado\"> <span>${radio.Nombre}</span></label></div></div><p></p></template>";});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('controles/ctrl-radio-vertical',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OpcionRadioVertical = (function () {
        function OpcionRadioVertical() {
            this.ID = '';
            this.Deshabilitado = false;
            this.Nombre = '';
            this.Valor = null;
        }
        return OpcionRadioVertical;
    }());
    exports.OpcionRadioVertical = OpcionRadioVertical;
    var ConfiguracionRadioVertical = (function () {
        function ConfiguracionRadioVertical() {
            this.Nombre = '';
            this.Label = '';
            this.Obligatorio = false;
            this.Opciones = [];
            this.Grupo = '';
            this.Seleccionado = new OpcionRadioVertical();
        }
        return ConfiguracionRadioVertical;
    }());
    exports.ConfiguracionRadioVertical = ConfiguracionRadioVertical;
    var CtrlRadioVertical = (function () {
        function CtrlRadioVertical() {
            this.configRadio = new ConfiguracionRadioVertical();
        }
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", ConfiguracionRadioVertical)
        ], CtrlRadioVertical.prototype, "configRadio", void 0);
        CtrlRadioVertical = __decorate([
            aurelia_framework_1.autoinject
        ], CtrlRadioVertical);
        return CtrlRadioVertical;
    }());
    exports.CtrlRadioVertical = CtrlRadioVertical;
});



define('text!controles/ctrl-radio-vertical.html',[],function(){return "<template><div class=\"row\"><div class=\"col s12\"><p repeat.for=\"radio of configRadio.Opciones\"><label><input class=\"with-gap\" value.bind=\"radio.Valor\" type=\"radio\" name=\"${configRadio.Grupo}\" model.bind=\"radio\" checked.bind=\"configRadio.Seleccionado\"> <span>${radio.Nombre}</span></label></p></div></div></template>";});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('controles/ctrl-tabla',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EnumTipoColumnas;
    (function (EnumTipoColumnas) {
        EnumTipoColumnas["Entero"] = "number";
        EnumTipoColumnas["Decimal"] = "decimal";
        EnumTipoColumnas["Texto"] = "string";
        EnumTipoColumnas["Fecha"] = "date";
        EnumTipoColumnas["Moneda"] = "money";
        EnumTipoColumnas["Checkbox"] = "checkbox";
        EnumTipoColumnas["Acciones"] = "actions";
    })(EnumTipoColumnas = exports.EnumTipoColumnas || (exports.EnumTipoColumnas = {}));
    var Columnas = (function () {
        function Columnas(Valor, Tipo) {
            if (Tipo === void 0) { Tipo = EnumTipoColumnas.Texto; }
            this.Valor = null;
            this.Tipo = null;
            this.Valor = Valor;
            this.Tipo = Tipo;
        }
        return Columnas;
    }());
    exports.Columnas = Columnas;
    var Encabezados = (function () {
        function Encabezados(Llave, Texto) {
            if (Llave === void 0) { Llave = ''; }
            if (Texto === void 0) { Texto = ''; }
            this.Llave = '';
            this.Texto = '';
            this.Llave = Llave;
            this.Texto = Texto;
        }
        return Encabezados;
    }());
    exports.Encabezados = Encabezados;
    var ConfiguracionTabla = (function () {
        function ConfiguracionTabla() {
            this.ID = '';
            this.Nombre = '';
            this.Clases = '';
            this.Encabezados = [];
            this.JsonDatos = [];
        }
        return ConfiguracionTabla;
    }());
    exports.ConfiguracionTabla = ConfiguracionTabla;
    var CtrlTabla = (function () {
        function CtrlTabla() {
        }
        CtrlTabla.prototype.formatearValor = function (valor, tipo) {
            switch (tipo) {
                case EnumTipoColumnas.Texto:
                case EnumTipoColumnas.Entero:
                    return valor;
                case EnumTipoColumnas.Acciones:
                    return;
                default:
                    return valor;
            }
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", ConfiguracionTabla)
        ], CtrlTabla.prototype, "configTabla", void 0);
        CtrlTabla = __decorate([
            aurelia_framework_1.autoinject
        ], CtrlTabla);
        return CtrlTabla;
    }());
    exports.CtrlTabla = CtrlTabla;
    var KeysValueConverter = (function () {
        function KeysValueConverter() {
        }
        KeysValueConverter.prototype.toView = function (obj) {
            return Reflect.ownKeys(obj);
        };
        return KeysValueConverter;
    }());
    exports.KeysValueConverter = KeysValueConverter;
});



define('text!controles/ctrl-tabla.html',[],function(){return "<template><div class=\"row\"><div class=\"col s12\"><table class=\"responsive-table\"><thead><tr><th repeat.for=\"encabezado of configTabla.Encabezados\">${encabezado.Texto}</th></tr></thead><tbody><tr repeat.for=\"renglon of configTabla.JsonDatos\"><td repeat.for=\"columna of renglon | keys\"><span if.bind=\"renglon[columna].Tipo == 'actions'\"><ctrl-menu-flotante-horizontal config-menu-flotante-horizontal.bind=\"renglon[columna].Valor\" informacion-renglon.bind=\"renglon\"></ctrl-menu-flotante-horizontal></span><span else> ${formatearValor(renglon[columna].Valor, renglon[columna].Tipo)} </span></td></tr></tbody></table></div></div></template>";});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('controles/ctrl-titulo',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CtrlTitulo = (function () {
        function CtrlTitulo() {
        }
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", String)
        ], CtrlTitulo.prototype, "titulo", void 0);
        CtrlTitulo = __decorate([
            aurelia_framework_1.autoinject
        ], CtrlTitulo);
        return CtrlTitulo;
    }());
    exports.CtrlTitulo = CtrlTitulo;
});



define('text!controles/ctrl-titulo.html',[],function(){return "<template><div class=\"row\"><div class=\"col s12 center-align\"><h3>${titulo}</h3></div></div></template>";});
define('controles/icono',["require", "exports", "../enumeradores/enum-posiciones", "../enumeradores/enum-iconos", "../enumeradores/enum-colores"], function (require, exports, enum_posiciones_1, enum_iconos_1, enum_colores_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EnumTamanosIconos;
    (function (EnumTamanosIconos) {
        EnumTamanosIconos["Chico"] = "small";
        EnumTamanosIconos["Mediano"] = "medium";
        EnumTamanosIconos["Grande"] = "big";
    })(EnumTamanosIconos = exports.EnumTamanosIconos || (exports.EnumTamanosIconos = {}));
    var Icono = (function () {
        function Icono(icono, color, posicion, titulo, tamano) {
            if (icono === void 0) { icono = enum_iconos_1.EnumIconos.SinIcono; }
            if (color === void 0) { color = enum_colores_1.EnumColores.SinColor; }
            if (posicion === void 0) { posicion = enum_posiciones_1.EnumPosiciones.default; }
            if (titulo === void 0) { titulo = ''; }
            if (tamano === void 0) { tamano = EnumTamanosIconos.Chico; }
            this.icono = enum_iconos_1.EnumIconos.SinIcono;
            this.color = enum_colores_1.EnumColores.SinColor;
            this.posicion = enum_posiciones_1.EnumPosiciones.default;
            this.titulo = '';
            this.tamano = EnumTamanosIconos.Chico;
            this.icono = icono;
            this.color = color;
            this.posicion = posicion;
            this.titulo = titulo;
            this.tamano = tamano;
        }
        return Icono;
    }());
    exports.Icono = Icono;
});



define('enumeradores/enum-colores',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EnumColores;
    (function (EnumColores) {
        EnumColores["SinColor"] = "";
        EnumColores["Rojo"] = "red";
        EnumColores["Azul"] = "blue";
        EnumColores["Amarillo"] = "yellow";
        EnumColores["Verde"] = "green";
    })(EnumColores = exports.EnumColores || (exports.EnumColores = {}));
});



define('enumeradores/enum-iconos',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EnumIconos;
    (function (EnumIconos) {
        EnumIconos["SinIcono"] = "";
        EnumIconos["Guardar"] = "save";
        EnumIconos["Error"] = "cancel";
        EnumIconos["Correcto"] = "check_circle";
        EnumIconos["Advertencia"] = "warning";
        EnumIconos["Informacion"] = "info";
        EnumIconos["Buscar"] = "search";
        EnumIconos["Opciones"] = "menu";
        EnumIconos["Editar"] = "mode_edit";
        EnumIconos["Borrar"] = "delete";
        EnumIconos["Actividades"] = "assignment";
    })(EnumIconos = exports.EnumIconos || (exports.EnumIconos = {}));
});



define('enumeradores/enum-mensajes',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EnumMensajes;
    (function (EnumMensajes) {
        EnumMensajes["ErrorAPI"] = "Error al consumir la API";
    })(EnumMensajes = exports.EnumMensajes || (exports.EnumMensajes = {}));
});



define('enumeradores/enum-posiciones',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EnumPosiciones;
    (function (EnumPosiciones) {
        EnumPosiciones["default"] = "";
        EnumPosiciones["arriba"] = "top";
        EnumPosiciones["abajo"] = "down";
        EnumPosiciones["izquierda"] = "left";
        EnumPosiciones["derecha"] = "right";
        EnumPosiciones["centro"] = "center";
    })(EnumPosiciones = exports.EnumPosiciones || (exports.EnumPosiciones = {}));
});



define('enumeradores/enum-respuesta-api',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EnumRespuestaAPI;
    (function (EnumRespuestaAPI) {
        EnumRespuestaAPI[EnumRespuestaAPI["Aceptado"] = 200] = "Aceptado";
        EnumRespuestaAPI[EnumRespuestaAPI["NoEncontrado"] = 404] = "NoEncontrado";
        EnumRespuestaAPI[EnumRespuestaAPI["ErrorInterno"] = 503] = "ErrorInterno";
        EnumRespuestaAPI[EnumRespuestaAPI["NoSeEncontraronDatos"] = 1001] = "NoSeEncontraronDatos";
        EnumRespuestaAPI[EnumRespuestaAPI["ValidacionReglaNegocio"] = 1002] = "ValidacionReglaNegocio";
    })(EnumRespuestaAPI = exports.EnumRespuestaAPI || (exports.EnumRespuestaAPI = {}));
});



define('enumeradores/enum-tipo-mensaje',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EnumTipoMensaje;
    (function (EnumTipoMensaje) {
        EnumTipoMensaje[EnumTipoMensaje["Alerta"] = 0] = "Alerta";
    })(EnumTipoMensaje = exports.EnumTipoMensaje || (exports.EnumTipoMensaje = {}));
});



define('enumeradores/enum-tipo-valores',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EnumTipoValores;
    (function (EnumTipoValores) {
        EnumTipoValores["Entero"] = "number";
        EnumTipoValores["Decimal"] = "decimal";
        EnumTipoValores["Texto"] = "string";
        EnumTipoValores["Fecha"] = "date";
    })(EnumTipoValores = exports.EnumTipoValores || (exports.EnumTipoValores = {}));
});



define('enumeradores/enum-vistas',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EnumVistas;
    (function (EnumVistas) {
        EnumVistas[EnumVistas["vistaNinguna"] = { vista: '', modelo: '' }] = "vistaNinguna";
        EnumVistas[EnumVistas["vistaEmpleados"] = { vista: 'modulos/empleados/mod-empleados.html', modelo: 'modulos/empleados/mod-empleados' }] = "vistaEmpleados";
        EnumVistas[EnumVistas["vistaFiltrosEmpleados"] = { vista: 'modulos/empleados/cpte-filtros-empleados.html', modelo: 'modulos/empleados/cpte-filtros-empleados' }] = "vistaFiltrosEmpleados";
        EnumVistas[EnumVistas["vistaNuevosEmpleados"] = { vista: 'modulos/empleados/cpte-filtros-empleados.html', modelo: 'modulos/empleados/cpte-filtros-empleados' }] = "vistaNuevosEmpleados";
        EnumVistas[EnumVistas["vistaEditarEmpleados"] = { vista: 'modulos/empleados/cpte-filtros-empleados.html', modelo: 'modulos/empleados/cpte-filtros-empleados' }] = "vistaEditarEmpleados";
        EnumVistas[EnumVistas["vistaListaEmpleados"] = { vista: 'modulos/empleados/cpte-lista-empleados.html', modelo: 'modulos/empleados/cpte-lista-empleados' }] = "vistaListaEmpleados";
        EnumVistas[EnumVistas["vistaNominas"] = { vista: 'modulos/nominas/mod-nominas.html', modelo: 'modulos/nominas/mod-nominas' }] = "vistaNominas";
        EnumVistas[EnumVistas["vistaMovimientos"] = { vista: 'modulos/movimientos/mod-movimientos.html', modelo: 'modulos/movimientos/mod-movimientos' }] = "vistaMovimientos";
        EnumVistas[EnumVistas["vistaRegistroMovimientos"] = { vista: 'modulos/movimientos/cpte-registro-movimientos.html', modelo: 'modulos/movimientos/cpte-registro-movimientos' }] = "vistaRegistroMovimientos";
    })(EnumVistas = exports.EnumVistas || (exports.EnumVistas = {}));
});



define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: false,
        testing: false,
        apiUrl: {
            puestos: 'http://localhost:55758/api/puestos/',
            empleados: 'http://localhost:55758/api/empleados/',
            jornadas: 'http://localhost:55758/api/jornadas/'
        }
    };
});



define('eventos/eventos-controles',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ClickAccion = (function () {
        function ClickAccion(opc, objeto) {
            this.opc = opc;
            this.objeto = objeto;
        }
        return ClickAccion;
    }());
    exports.ClickAccion = ClickAccion;
    var ClickBoton = (function () {
        function ClickBoton(funcion) {
            this.funcion = funcion;
        }
        return ClickBoton;
    }());
    exports.ClickBoton = ClickBoton;
    var MostrarModal = (function () {
        function MostrarModal() {
        }
        return MostrarModal;
    }());
    exports.MostrarModal = MostrarModal;
    var ModalClickAceptar = (function () {
        function ModalClickAceptar() {
        }
        return ModalClickAceptar;
    }());
    exports.ModalClickAceptar = ModalClickAceptar;
});



define('eventos/eventos-empleados',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CambiarVistasEmpleados = (function () {
        function CambiarVistasEmpleados(vista) {
            this.vista = vista;
        }
        return CambiarVistasEmpleados;
    }());
    exports.CambiarVistasEmpleados = CambiarVistasEmpleados;
    var EnviarListaEmpleados = (function () {
        function EnviarListaEmpleados(configuracion) {
            this.configuracion = configuracion;
        }
        return EnviarListaEmpleados;
    }());
    exports.EnviarListaEmpleados = EnviarListaEmpleados;
    var EditarEmpleado = (function () {
        function EditarEmpleado(empleadoID) {
            this.empleadoID = empleadoID;
        }
        return EditarEmpleado;
    }());
    exports.EditarEmpleado = EditarEmpleado;
    var RegistrarEmpleado = (function () {
        function RegistrarEmpleado() {
        }
        return RegistrarEmpleado;
    }());
    exports.RegistrarEmpleado = RegistrarEmpleado;
});



define('eventos/eventos-menu',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CambiarModulo = (function () {
        function CambiarModulo(modulo) {
            this.modulo = modulo;
        }
        return CambiarModulo;
    }());
    exports.CambiarModulo = CambiarModulo;
});



define('eventos/eventos-movimientos',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CambiarVistasMovimientos = (function () {
        function CambiarVistasMovimientos(vista) {
            this.vista = vista;
        }
        return CambiarVistasMovimientos;
    }());
    exports.CambiarVistasMovimientos = CambiarVistasMovimientos;
    var RegistrarMovimiento = (function () {
        function RegistrarMovimiento(empleado) {
            this.empleado = empleado;
        }
        return RegistrarMovimiento;
    }());
    exports.RegistrarMovimiento = RegistrarMovimiento;
});



define('main',["require", "exports", "aurelia-framework", "./environment", "materialize-css"], function (require, exports, aurelia_framework_1, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources')
            .plugin('aurelia-validation')
            .plugin(aurelia_framework_1.PLATFORM.moduleName("aurelia-validation"))
            .plugin(aurelia_framework_1.PLATFORM.moduleName('aurelia-materialize-bridge'), function (b) { return b.useAll(); });
        aurelia.use.developmentLogging(environment_1.default.debug ? 'debug' : 'warn');
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        return aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('modulos/empleados/cpte-filtros-empleados',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../../eventos/eventos-empleados", "../../eventos/eventos-controles", "../../controles/ctrl-alerta", "../../controles/icono", "../../servicios/web-api/api-puestos", "../../servicios/web-api/api-empleados", "../../servicios/web-api/api-jornadas", "../../enumeradores/enum-respuesta-api", "enumeradores/enum-posiciones", "enumeradores/enum-mensajes", "enumeradores/enum-iconos", "enumeradores/enum-colores", "enumeradores/enum-vistas"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, eventosEmpleados, EventosControles, ctrl_alerta_1, icono_1, api_puestos_1, api_empleados_1, api_jornadas_1, enum_respuesta_api_1, enum_posiciones_1, enum_mensajes_1, enum_iconos_1, enum_colores_1, enum_vistas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CpteFiltrosEmpleados = (function () {
        function CpteFiltrosEmpleados(ea, peticionPuestos, peticionEmpleados, peticionJornadas) {
            this.ea = ea;
            this.peticionPuestos = peticionPuestos;
            this.peticionEmpleados = peticionEmpleados;
            this.peticionJornadas = peticionJornadas;
            this.inicializarControles();
        }
        CpteFiltrosEmpleados.prototype.attached = function () {
            var _this = this;
            var self = this;
            this.subscribeEditarEmpleado = this.ea.subscribe(eventosEmpleados.EditarEmpleado, function (msg) {
                self.inicializarControles();
                self.editarEmpleado(msg.empleadoID);
            });
            this.subscribeRegistrarEmpleado = this.ea.subscribe(eventosEmpleados.RegistrarEmpleado, function (msg) {
                self.inicializarControles();
                self.registrarEmpleado();
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
                    case 'regresar':
                        self.inicializarControles();
                        break;
                    case 'registrar':
                        self.aceptar();
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
        CpteFiltrosEmpleados.prototype.consultarJornadas = function () {
            var self = this;
            this.peticionJornadas.consultarJornadas()
                .then(function (respuesta) {
                if (respuesta.Codigo == enum_respuesta_api_1.EnumRespuestaAPI.Aceptado) {
                    for (var i in respuesta.Respuesta) {
                        respuesta.Respuesta[i].Valor = respuesta.Respuesta[i].ID;
                        respuesta.Respuesta[i].ID = 'tipoJor-' + respuesta.Respuesta[i].ID;
                    }
                    self.configRadioJornadas.Opciones = respuesta.Respuesta;
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
            self.peticionEmpleados.consultarEmpleados(self.configInputNumero.Valor, self.configInputNombre.Valor, self.configInputPaterno.Valor, self.configInputMaterno.Valor, self.configComboPuestos.Seleccionado, self.configRadioTiposEmpleados.Seleccionado == null ? 0 : self.configRadioTiposEmpleados.Seleccionado.Valor, self.configRadioJornadas.Seleccionado == null ? 0 : self.configRadioJornadas.Seleccionado.Valor, true)
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
            self.peticionEmpleados.actualizarEmpleado(self.configInputNumero.Valor, self.configInputNombre.Valor, self.configInputPaterno.Valor, self.configInputMaterno.Valor, self.configComboPuestos.Seleccionado.Valor, self.configRadioTiposEmpleados.Seleccionado == null ? 0 : self.configRadioTiposEmpleados.Seleccionado.Valor, self.configRadioJornadas.Seleccionado == null ? 0 : self.configRadioTiposEmpleados.Seleccionado.Valor, true)
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
            self.peticionEmpleados.nuevoEmpleado(0, self.configInputNombre.Valor, self.configInputPaterno.Valor, self.configInputMaterno.Valor, self.configComboPuestos.Seleccionado.Valor, self.configRadioTiposEmpleados.Seleccionado == null ? 0 : self.configRadioTiposEmpleados.Seleccionado.Valor, self.configRadioJornadas.Seleccionado == null ? 0 : self.configRadioJornadas.Seleccionado.Valor, true)
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
            this.configInputNumero.Deshabilitado = true;
            this.configBotonRegresar.Mostrar = true;
            this.peticionEmpleados.consultarEmpleados(this.configInputNumero.Valor, "", "", "", -1, -1, -1, true)
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
        CpteFiltrosEmpleados.prototype.registrarEmpleado = function () {
            var self = this;
            this.configInputNumero.Deshabilitado = false;
            this.configBotonActualizar.Mostrar = false;
            this.configBotonRegistrar.Mostrar = true;
            this.configBotonBuscar.Mostrar = true;
        };
        CpteFiltrosEmpleados.prototype.llenarFormulario = function (empleado) {
            try {
                this.configInputNumero.Deshabilitado = true;
                this.configInputNombre.Valor = empleado.Nombre;
                this.configInputPaterno.Valor = empleado.ApellidoPaterno;
                this.configInputMaterno.Valor = empleado.ApellidoMaterno;
                this.configBotonActualizar.Mostrar = true;
                this.configBotonBuscar.Mostrar = false;
                this.configBotonRegistrar.Mostrar = false;
                this.configComboPuestos.Seleccionado;
                var element = document.querySelector("div.input-field select");
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
                setTimeout(function () { M.updateTextFields(); }, 100);
            }
            catch (error) {
                console.log(error);
            }
        };
        CpteFiltrosEmpleados.prototype.inicializarControles = function () {
            this.consultarPuestos();
            this.consultarTiposEmpleados();
            this.consultarJornadas();
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
            this.opcionesJornadas = [];
            this.configRadioJornadas = {
                Nombre: 'tipoEmpleado',
                Label: '',
                Grupo: 'tiposJornadas',
                Obligatorio: false,
                Opciones: this.opcionesJornadas,
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
                Mostrar: true,
                Funcion: 'registrar'
            };
            this.configBotonRegresar = {
                ID: '',
                Icono: new icono_1.Icono(),
                Nombre: '',
                Texto: 'Regresar',
                Deshabilitado: false,
                Mostrar: false,
                Funcion: 'regresar'
            };
        };
        CpteFiltrosEmpleados = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator, api_puestos_1.ApiPuestos, api_empleados_1.ApiEmpleados, api_jornadas_1.ApiJornadas])
        ], CpteFiltrosEmpleados);
        return CpteFiltrosEmpleados;
    }());
    exports.CpteFiltrosEmpleados = CpteFiltrosEmpleados;
});



define('text!modulos/empleados/cpte-filtros-empleados.html',[],function(){return "<template><div class=\"row\"><div class=\"col s12 m6\"><ctrl-input config-input.bind=\"configInputNumero\"></ctrl-input></div><div if.bind=\"configBotonRegistrar.Mostrar\" class=\"col s12 offset-m3 m1\"><ctrl-boton config-boton.bind=\"configBotonRegistrar\"></ctrl-boton></div><div if.bind=\"configBotonRegresar.Mostrar\" class=\"col s6 offset-m3 m1\"><ctrl-boton config-boton.bind=\"configBotonRegresar\"></ctrl-boton></div><div if.bind=\"configBotonBuscar.Mostrar\" class=\"col s12 m2\"><ctrl-boton config-boton.bind=\"configBotonBuscar\"></ctrl-boton></div><div if.bind=\"configBotonActualizar.Mostrar\" class=\"col s12 m2\"><ctrl-boton config-boton.bind=\"configBotonActualizar\"></ctrl-boton></div></div><div class=\"row\"><div class=\"col s12 m4\"><ctrl-input config-input.bind=\"configInputNombre\"></ctrl-input></div><div class=\"col s12 m4\"><ctrl-input config-input.bind=\"configInputPaterno\"></ctrl-input></div><div class=\"col s12 m4\"><ctrl-input config-input.bind=\"configInputMaterno\"></ctrl-input></div></div><div class=\"row\"><div class=\"col s12 m6\"><ctrl-combo config-combo.bind=\"configComboPuestos\"></ctrl-combo></div><div class=\"col s12 m3\"><ctrl-radio-vertical config-radio.bind=\"configRadioTiposEmpleados\"></ctrl-radio-vertical></div><div class=\"col s12 m3\"><ctrl-radio-vertical config-radio.bind=\"configRadioJornadas\"></ctrl-radio-vertical></div></div></template>";});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('modulos/empleados/cpte-lista-empleados',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../../eventos/eventos-empleados", "../../eventos/eventos-controles", "../../eventos/eventos-movimientos", "../../eventos/eventos-menu", "../../controles/ctrl-tabla", "../../controles/ctrl-menu-flotante-horizontal", "../../controles/ctrl-alerta", "../../controles/icono", "../../servicios/web-api/api-empleados", "enumeradores/enum-iconos", "enumeradores/enum-colores", "enumeradores/enum-posiciones", "../../enumeradores/enum-respuesta-api", "enumeradores/enum-mensajes", "enumeradores/enum-vistas"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, eventosEmpleados, EventosControles, EventosMovimientos, EventosMenu, ctrl_tabla_1, ctrl_menu_flotante_horizontal_1, ctrl_alerta_1, icono_1, api_empleados_1, enum_iconos_1, enum_colores_1, enum_posiciones_1, enum_respuesta_api_1, enum_mensajes_1, enum_vistas_1) {
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
                    case 'registrarMovimiento':
                        self.empleado = msg.objeto;
                        self.registrarMovimiento();
                        break;
                }
            });
            this.subscribeClickBoton = this.ea.subscribe(EventosControles.ClickBoton, function (msg) {
                var self = _this;
                switch (msg.funcion) {
                    case 'nuevoEmpleado':
                        self.registrarEmpleado();
                        break;
                    case 'regresar':
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
                Opciones.push(new ctrl_menu_flotante_horizontal_1.ConfiguracionOpcionMenuFlotanteHorizontal(new icono_1.Icono(enum_iconos_1.EnumIconos.Actividades, enum_colores_1.EnumColores.Amarillo, enum_posiciones_1.EnumPosiciones.default, 'Registrar Movimiento'), 'registrarMovimiento'));
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
            var self = this;
            this.ea.publish(new eventosEmpleados.CambiarVistasEmpleados(enum_vistas_1.EnumVistas.vistaEditarEmpleados));
            setTimeout(function () {
                self.ea.publish(new eventosEmpleados.EditarEmpleado(self.empleado.ID.Valor));
            }, 100);
        };
        CpteListaEmpleados.prototype.registrarMovimiento = function () {
            var self = this;
            this.ea.publish(new EventosMenu.CambiarModulo('movimientos'));
            setTimeout(function () {
                self.ea.publish(new EventosMovimientos.RegistrarMovimiento(self.empleado));
            }, 100);
        };
        CpteListaEmpleados.prototype.eliminarEmpleado = function () {
            var self = this;
            var empleado = {
                "ID": this.empleado.ID.Valor,
                "Nombre": "",
                "ApellidoPaterno": "",
                "ApellidoMaterno": "",
                "EmpleadoTipoID": 0,
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
        CpteListaEmpleados.prototype.registrarEmpleado = function () {
            var self = this;
            this.ea.publish(new eventosEmpleados.CambiarVistasEmpleados(enum_vistas_1.EnumVistas.vistaNuevosEmpleados));
            setTimeout(function () {
                self.ea.publish(new eventosEmpleados.RegistrarEmpleado());
            }, 100);
        };
        CpteListaEmpleados.prototype.regresarFiltrosEmpleados = function () {
            this.ea.publish(new eventosEmpleados.CambiarVistasEmpleados(enum_vistas_1.EnumVistas.vistaFiltrosEmpleados));
        };
        CpteListaEmpleados.prototype.inicializarControles = function () {
            this.configBotonRegresar = {
                ID: '',
                Icono: new icono_1.Icono(),
                Nombre: '',
                Texto: 'Regresar',
                Deshabilitado: false,
                Mostrar: true,
                Funcion: 'regresar'
            };
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



define('text!modulos/empleados/cpte-lista-empleados.html',[],function(){return "<template><div class=\"row\"><div class=\"col s6 offset-m9 m1\"><ctrl-boton config-boton.bind=\"configBotonRegresar\"></ctrl-boton></div><div class=\"col s6 m2\"><ctrl-boton config-boton.bind=\"configBotonNuevoEmpleado\"></ctrl-boton></div></div><div class=\"row\"><div class=\"col s12\"><ctrl-tabla config-tabla.bind=\"configTablaEmpleados\"></ctrl-tabla></div></div><ctrl-alerta-confirmacion config-alerta-confirmacion.bind=\"configAlertaEmpleados\"></ctrl-alerta-confirmacion></template>";});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('modulos/empleados/mod-empleados',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../../eventos/eventos-empleados", "../../enumeradores/enum-vistas"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, eventosEmpleados, enum_vistas_1) {
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
            this.subscribeCambiarVistasEmpleados = this.ea.subscribe(eventosEmpleados.CambiarVistasEmpleados, function (msg) {
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
                case enum_vistas_1.EnumVistas.vistaEditarEmpleados:
                    this.migas = ["Empleados", "Editar Empleado"];
                    this.VistasEmpleados = enum_vistas_1.EnumVistas.vistaEditarEmpleados["vista"];
                    this.VistasModelosEmpleados = enum_vistas_1.EnumVistas.vistaEditarEmpleados["modelo"];
                    break;
                case enum_vistas_1.EnumVistas.vistaNuevosEmpleados:
                    this.migas = ["Empleados", "Registrar Empleado"];
                    this.VistasEmpleados = enum_vistas_1.EnumVistas.vistaNuevosEmpleados["vista"];
                    this.VistasModelosEmpleados = enum_vistas_1.EnumVistas.vistaNuevosEmpleados["modelo"];
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



define('text!modulos/empleados/mod-empleados.html',[],function(){return "<template><div class=\"row\"><div class=\"col s12\"><ctrl-migas migas.bind=\"migas\"></ctrl-migas></div></div><div class=\"row\"><div class=\"col s12\"><ctrl-titulo titulo.bind=\"tituloEmpleados\"></ctrl-titulo></div></div><div class=\"row\"><div class=\"col s12\"></div><compose view.bind=\"VistasEmpleados\" view-model.bind=\"VistasModelosEmpleados\"></compose></div></template>";});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('modulos/movimientos/cpte-registro-movimientos',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../../eventos/eventos-controles", "../../eventos/eventos-movimientos", "../../controles/icono", "../../servicios/web-api/api-movimientos"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, EventosControles, EventosMovimientos, icono_1, api_movimientos_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CpteRegistroMovimientos = (function () {
        function CpteRegistroMovimientos(ea, peticionMovimientos) {
            this.ea = ea;
            this.peticionMovimientos = peticionMovimientos;
            this.inicializarControles();
        }
        CpteRegistroMovimientos.prototype.attached = function () {
            var _this = this;
            var self = this;
            this.subscribeRegistrarMovimiento = this.ea.subscribe(EventosMovimientos.RegistrarMovimiento, function (msg) {
                self.llenarFomulario(msg.empleado);
            });
            this.subscribeClickBoton = this.ea.subscribe(EventosControles.ClickBoton, function (msg) {
                var self = _this;
                switch (msg.funcion) {
                    case 'registrar':
                        self.registrarMovimiento();
                        break;
                }
            });
        };
        CpteRegistroMovimientos.prototype.detached = function () {
            this.subscribeRegistrarMovimiento.dispose();
            this.subscribeClickBoton.dispose();
        };
        CpteRegistroMovimientos.prototype.llenarFomulario = function (empleado) {
            this.configInputNumero.Valor = empleado.ID.Valor;
            this.configInputNombre.Valor = empleado.Nombre.Valor;
            this.configInputPaterno.Valor = empleado.ApellidoPaterno.Valor;
            this.configInputMaterno.Valor = empleado.ApellidoMaterno.Valor;
            this.configInputPuesto.Valor = empleado.Puesto.Valor;
            this.configInputTipo.Valor = empleado.TipoEmpleado.Valor;
            setTimeout(function () { M.updateTextFields(); }, 100);
        };
        CpteRegistroMovimientos.prototype.registrarMovimiento = function () {
            var self = this;
            this.configInputNumero.Valor;
        };
        CpteRegistroMovimientos.prototype.inicializarControles = function () {
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
            var hoy = new Date();
            this.configFechaRegistro = {
                ID: '',
                Nombre: '',
                Icono: true,
                Label: 'Fecha movimiento',
                Obligatorio: false,
                SoloLectura: false,
                Deshabilitado: false,
                Valor: hoy,
                Clases: '',
                FechaMin: hoy.setMonth(hoy.getFullYear() - 1),
                FechaMax: hoy
            };
            this.configInputNombre = {
                ID: '',
                Nombre: '',
                Icono: false,
                Label: 'Nombre',
                Obligatorio: true,
                Placeholder: '',
                SoloLectura: false,
                Deshabilitado: true,
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
                Deshabilitado: true,
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
                Deshabilitado: true,
                Valor: '',
                Clases: ''
            };
            this.configInputPuesto = {
                ID: '',
                Nombre: '',
                Icono: false,
                Label: 'Rol',
                Obligatorio: true,
                Placeholder: '',
                SoloLectura: false,
                Deshabilitado: true,
                Valor: '',
                Clases: ''
            };
            this.configInputTipo = {
                ID: '',
                Nombre: '',
                Icono: false,
                Label: 'Tipo',
                Obligatorio: true,
                Placeholder: '',
                SoloLectura: false,
                Deshabilitado: true,
                Valor: '',
                Clases: ''
            };
            this.configInputCantidadEntregas = {
                ID: '',
                Nombre: '',
                Icono: false,
                Label: 'Cantidad de entregas',
                Obligatorio: true,
                Placeholder: '',
                SoloLectura: false,
                Deshabilitado: false,
                Valor: '',
                Clases: ''
            };
            this.configInputCubrioPuesto = {
                ID: '',
                Nombre: '',
                Icono: false,
                Label: 'Cubrio puesto',
                Obligatorio: true,
                Placeholder: '',
                SoloLectura: false,
                Deshabilitado: false,
                Valor: '',
                Clases: ''
            };
            this.configBotonRegistrar = {
                ID: '',
                Icono: new icono_1.Icono(),
                Nombre: '',
                Texto: 'Registrar',
                Deshabilitado: false,
                Mostrar: true,
                Funcion: 'registrar'
            };
        };
        CpteRegistroMovimientos = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator, api_movimientos_1.ApiMovimientos])
        ], CpteRegistroMovimientos);
        return CpteRegistroMovimientos;
    }());
    exports.CpteRegistroMovimientos = CpteRegistroMovimientos;
});



define('text!modulos/movimientos/cpte-registro-movimientos.html',[],function(){return "<template><div class=\"row\"><div class=\"col s12 m6\"><ctrl-input config-input.bind=\"configInputNumero\"></ctrl-input></div><div class=\"col s12 m2\"><ctrl-fecha config-fecha.bind=\"configFechaRegistro\"></ctrl-fecha></div><div class=\"col s12 offset-m2 m1\"><ctrl-boton config-boton.bind=\"configBotonRegistrar\"></ctrl-boton></div></div><div class=\"row\"><div class=\"col s12 m4\"><ctrl-input config-input.bind=\"configInputNombre\"></ctrl-input></div><div class=\"col s12 m4\"><ctrl-input config-input.bind=\"configInputPaterno\"></ctrl-input></div><div class=\"col s12 m4\"><ctrl-input config-input.bind=\"configInputMaterno\"></ctrl-input></div></div><div class=\"row\"><div class=\"col s12 m3\"><ctrl-input config-input.bind=\"configInputPuesto\"></ctrl-input></div><div class=\"col s12 m3\"><ctrl-input config-input.bind=\"configInputTipo\"></ctrl-input></div><div class=\"col s12 m3\"><ctrl-input config-input.bind=\"configInputCantidadEntregas\"></ctrl-input></div><div class=\"col s12 m3\"><ctrl-input config-input.bind=\"configInputCubrioPuesto\"></ctrl-input></div></div></template>";});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('modulos/movimientos/mod-movimientos',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "../../eventos/eventos-movimientos", "../../enumeradores/enum-vistas"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, EventosMovimientos, enum_vistas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ModMovimientos = (function () {
        function ModMovimientos(ea) {
            this.ea = ea;
            this.tituloMovimientos = 'Movimientos';
            this.migas = ["Movimientos"];
            this.cambiarVistaMovimientos(enum_vistas_1.EnumVistas.vistaRegistroMovimientos);
        }
        ModMovimientos.prototype.attached = function () {
            var self = this;
            this.subscribeCambiarVistasMovimientos = this.ea.subscribe(EventosMovimientos.CambiarVistasMovimientos, function (msg) {
                self.cambiarVistaMovimientos(msg.vista);
            });
        };
        ModMovimientos.prototype.detached = function () {
            this.subscribeCambiarVistasMovimientos.dispose();
        };
        ModMovimientos.prototype.cambiarVistaMovimientos = function (vista) {
            switch (vista) {
                case enum_vistas_1.EnumVistas.vistaRegistroMovimientos:
                    this.migas = ["Movimientos", "Registro Movimientos"];
                    this.VistasMovimientos = vista["vista"];
                    this.VistasModelosMovimientos = vista["modelo"];
                    break;
            }
        };
        ModMovimientos = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator])
        ], ModMovimientos);
        return ModMovimientos;
    }());
    exports.ModMovimientos = ModMovimientos;
});



define('text!modulos/movimientos/mod-movimientos.html',[],function(){return "<template><div class=\"row\"><div class=\"col s12\"><ctrl-migas migas.bind=\"migas\"></ctrl-migas></div></div><div class=\"row\"><div class=\"col s12\"><ctrl-titulo titulo.bind=\"tituloMovimientos\"></ctrl-titulo></div></div><div class=\"row\"><div class=\"col s12\"></div><compose view.bind=\"VistasMovimientos\" view-model.bind=\"VistasModelosMovimientos\"></compose></div></template>";});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('modulos/nominas/mod-nominas',["require", "exports", "aurelia-framework", "aurelia-event-aggregator"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ModNominas = (function () {
        function ModNominas(ea) {
            this.ea = ea;
            this.tituloEmpleados = 'Nominas';
            this.migas = ["Nominas"];
        }
        ModNominas.prototype.attached = function () {
            var self = this;
        };
        ModNominas.prototype.detached = function () {
            this.subscribeCambiarVistasNominas.dispose();
        };
        ModNominas.prototype.cambiarVistaNominas = function (vista) {
            switch (vista) {
            }
        };
        ModNominas = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator])
        ], ModNominas);
        return ModNominas;
    }());
    exports.ModNominas = ModNominas;
});



define('text!modulos/nominas/mod-nominas.html',[],function(){return "<template><div class=\"row\"><div class=\"col s12\"><ctrl-migas migas.bind=\"migas\"></ctrl-migas></div></div><div class=\"row\"><div class=\"col s12\"><ctrl-titulo titulo.bind=\"tituloNominas\"></ctrl-titulo></div></div><div class=\"row\"><div class=\"col s12\"></div><compose view.bind=\"VistasNominas\" view-model.bind=\"VistasModelosNominas\"></compose></div></template>";});
define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources([
            "../controles/ctrl-input",
            "../controles/ctrl-radio-vertical",
            "../controles/ctrl-combo",
            "../controles/ctrl-boton",
            "../controles/ctrl-tabla",
            "../controles/ctrl-menu-flotante-horizontal",
            "../controles/ctrl-migas",
            "../controles/ctrl-titulo",
            "../controles/ctrl-alerta-confirmacion",
            "../controles/ctrl-fecha"
        ]);
    }
    exports.configure = configure;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('servicios/web-api/api-empleados',["require", "exports", "aurelia-framework", "../../environment", "./api-solicitud", "./api-procesar-respuesta"], function (require, exports, aurelia_framework_1, environment_1, api_solicitud_1, api_procesar_respuesta_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ApiEmpleadosMetodos = (function () {
        function ApiEmpleadosMetodos(apiBase) {
            this.apiBase = apiBase;
            this.apiBase = this.apiBase + "{0}";
        }
        ;
        ApiEmpleadosMetodos.prototype.consultarTiposEmpleados = function () {
            return this.apiBase["format"]("consultar/tipos");
        };
        ;
        ApiEmpleadosMetodos.prototype.consultarEmpleados = function () {
            return this.apiBase["format"]("consultar");
        };
        ;
        ApiEmpleadosMetodos.prototype.nuevoEmpleado = function () {
            return this.apiBase["format"]("nuevo");
        };
        ApiEmpleadosMetodos.prototype.actualizarEmpleado = function () {
            return this.apiBase["format"]("actualizar");
        };
        ApiEmpleadosMetodos.prototype.eliminarEmpleado = function () {
            return this.apiBase["format"]("eliminar");
        };
        return ApiEmpleadosMetodos;
    }());
    var ApiEmpleados = (function () {
        function ApiEmpleados(api, procesarRespuesta) {
            this.api = api;
            this.procesarRespuesta = procesarRespuesta;
            this.apis = new ApiEmpleadosMetodos(environment_1.default.apiUrl.empleados);
        }
        ApiEmpleados.prototype.consultarTiposEmpleados = function () {
            var _this = this;
            var self = this;
            var resultado = [];
            return new Promise(function (result) {
                _this.api.get(self.apis.consultarTiposEmpleados())
                    .then(function (respuesta) {
                    return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
                })
                    .catch(function (error) {
                    return result(self.procesarRespuesta.ProcesarError(error, resultado));
                });
            });
        };
        ApiEmpleados.prototype.consultarEmpleados = function (ID, Nombre, ApellidoPaterno, ApellidoMaterno, PuestoID, EmpleadoTipoID, JornadaID, Activo) {
            var _this = this;
            var filtros = {
                "ID": ID,
                "Nombre": Nombre,
                "ApellidoPaterno": ApellidoPaterno,
                "ApellidoMaterno": ApellidoMaterno,
                "EmpleadoTipoID": EmpleadoTipoID,
                "PuestoID": PuestoID,
                "JornadaID": JornadaID,
                "Activo": Activo
            };
            var self = this;
            var resultado = [];
            return new Promise(function (result) {
                _this.api.post(self.apis.consultarEmpleados(), filtros)
                    .then(function (respuesta) {
                    return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
                })
                    .catch(function (error) {
                    return result(self.procesarRespuesta.ProcesarError(error, resultado));
                });
            });
        };
        ApiEmpleados.prototype.actualizarEmpleado = function (ID, Nombre, ApellidoPaterno, ApellidoMaterno, PuestoID, EmpleadoTipoID, JornadaID, Activo) {
            var _this = this;
            var empleado = {
                "ID": ID,
                "Nombre": Nombre,
                "ApellidoPaterno": ApellidoPaterno,
                "ApellidoMaterno": ApellidoMaterno,
                "EmpleadoTipoID": EmpleadoTipoID,
                "PuestoID": PuestoID,
                "JornadaID": JornadaID,
                "Activo": Activo
            };
            var self = this;
            var resultado = [];
            return new Promise(function (result) {
                _this.api.post(self.apis.actualizarEmpleado(), empleado)
                    .then(function (respuesta) {
                    return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
                })
                    .catch(function (error) {
                    return result(self.procesarRespuesta.ProcesarError(error, resultado));
                });
            });
        };
        ApiEmpleados.prototype.nuevoEmpleado = function (ID, Nombre, ApellidoPaterno, ApellidoMaterno, PuestoID, EmpleadoTipoID, JornadaID, Activo) {
            var _this = this;
            var empleado = {
                "ID": ID,
                "Nombre": Nombre,
                "ApellidoPaterno": ApellidoPaterno,
                "ApellidoMaterno": ApellidoMaterno,
                "EmpleadoTipoID": EmpleadoTipoID,
                "PuestoID": PuestoID,
                "JornadaID": JornadaID,
                "Activo": Activo
            };
            var self = this;
            var resultado = [];
            return new Promise(function (result) {
                _this.api.post(self.apis.nuevoEmpleado(), empleado)
                    .then(function (respuesta) {
                    return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
                })
                    .catch(function (error) {
                    return result(self.procesarRespuesta.ProcesarError(error, resultado));
                });
            });
        };
        ApiEmpleados.prototype.eliminarEmpleado = function (empleado) {
            var _this = this;
            var self = this;
            var resultado = [];
            return new Promise(function (result) {
                _this.api.post(self.apis.eliminarEmpleado(), empleado)
                    .then(function (respuesta) {
                    return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
                })
                    .catch(function (error) {
                    return result(self.procesarRespuesta.ProcesarError(error, resultado));
                });
            });
        };
        ApiEmpleados = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [api_solicitud_1.ApiSolicitud, api_procesar_respuesta_1.ApiProcesarRespuesta])
        ], ApiEmpleados);
        return ApiEmpleados;
    }());
    exports.ApiEmpleados = ApiEmpleados;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('servicios/web-api/api-jornadas',["require", "exports", "aurelia-framework", "../../environment", "./api-solicitud", "./api-procesar-respuesta"], function (require, exports, aurelia_framework_1, environment_1, api_solicitud_1, api_procesar_respuesta_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ApiJornadasMetodos = (function () {
        function ApiJornadasMetodos(apiBase) {
            this.apiBase = apiBase;
            this.apiBase = this.apiBase + "{0}";
        }
        ;
        ApiJornadasMetodos.prototype.consultarJornadas = function () {
            return this.apiBase["format"]("consultar");
        };
        ;
        return ApiJornadasMetodos;
    }());
    var ApiJornadas = (function () {
        function ApiJornadas(api, procesarRespuesta) {
            this.api = api;
            this.procesarRespuesta = procesarRespuesta;
            this.apis = new ApiJornadasMetodos(environment_1.default.apiUrl.jornadas);
        }
        ApiJornadas.prototype.consultarJornadas = function () {
            var _this = this;
            var self = this;
            var resultado = [];
            return new Promise(function (result) {
                _this.api.get(self.apis.consultarJornadas())
                    .then(function (respuesta) {
                    return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
                })
                    .catch(function (error) {
                    return result(self.procesarRespuesta.ProcesarError(error, resultado));
                });
            });
        };
        ApiJornadas = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [api_solicitud_1.ApiSolicitud, api_procesar_respuesta_1.ApiProcesarRespuesta])
        ], ApiJornadas);
        return ApiJornadas;
    }());
    exports.ApiJornadas = ApiJornadas;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('servicios/web-api/api-movimientos',["require", "exports", "aurelia-framework", "../../environment", "./api-solicitud", "./api-procesar-respuesta"], function (require, exports, aurelia_framework_1, environment_1, api_solicitud_1, api_procesar_respuesta_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ApiMovimientosMetodos = (function () {
        function ApiMovimientosMetodos(apiBase) {
            this.apiBase = apiBase;
            this.apiBase = this.apiBase + "{0}";
        }
        ;
        ApiMovimientosMetodos.prototype.registrarMovimiento = function () {
            return this.apiBase["format"]("registrar");
        };
        ;
        return ApiMovimientosMetodos;
    }());
    var ApiMovimientos = (function () {
        function ApiMovimientos(api, procesarRespuesta) {
            this.api = api;
            this.procesarRespuesta = procesarRespuesta;
            this.apis = new ApiMovimientosMetodos(environment_1.default.apiUrl.empleados);
        }
        ApiMovimientos.prototype.registrarMovimiento = function (ID) {
            var _this = this;
            var movimiento = {
                "ID": ID,
            };
            var self = this;
            var resultado = [];
            return new Promise(function (result) {
                _this.api.post(self.apis.registrarMovimiento(), movimiento)
                    .then(function (respuesta) {
                    return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
                })
                    .catch(function (error) {
                    return result(self.procesarRespuesta.ProcesarError(error, resultado));
                });
            });
        };
        ApiMovimientos = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [api_solicitud_1.ApiSolicitud, api_procesar_respuesta_1.ApiProcesarRespuesta])
        ], ApiMovimientos);
        return ApiMovimientos;
    }());
    exports.ApiMovimientos = ApiMovimientos;
});



define('servicios/web-api/api-procesar-respuesta',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ApiProcesarRespuesta = (function () {
        function ApiProcesarRespuesta() {
        }
        ApiProcesarRespuesta.prototype.ProcesarResultado = function (respuesta, resultado) {
            if (respuesta.Codigo == 200) {
                if (respuesta.Respuesta == null || respuesta.Respuesta.length == 0) {
                    respuesta.Respuesta = this.NoHayDatos('No hay datos registrados.');
                    resultado = respuesta;
                }
                else
                    resultado = respuesta;
            }
            else if (respuesta.Codigo == 503) {
                respuesta.Respuesta = this.NoHayDatos('Ocurrió algo inesperado.');
                resultado = respuesta;
            }
            else {
                resultado = respuesta;
            }
            return resultado;
        };
        ApiProcesarRespuesta.prototype.ProcesarError = function (error, resultado) {
            error.Respuesta = this.NoHayDatos('Ocurrió algo inesperado.');
            resultado = error;
        };
        ApiProcesarRespuesta.prototype.NoHayDatos = function (mensaje) {
            var listaVacia = [];
            var SinDatos = { Id: -1, Nombre: mensaje };
            listaVacia.push(SinDatos);
            return listaVacia;
        };
        return ApiProcesarRespuesta;
    }());
    exports.ApiProcesarRespuesta = ApiProcesarRespuesta;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('servicios/web-api/api-puestos',["require", "exports", "aurelia-framework", "../../environment", "./api-solicitud", "./api-procesar-respuesta"], function (require, exports, aurelia_framework_1, environment_1, api_solicitud_1, api_procesar_respuesta_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ApiPuestosMetodos = (function () {
        function ApiPuestosMetodos(apiBase) {
            this.apiBase = apiBase;
            this.apiBase = this.apiBase + "{0}";
        }
        ;
        ApiPuestosMetodos.prototype.consultarPuestos = function () {
            return this.apiBase["format"]("consultar");
        };
        ;
        return ApiPuestosMetodos;
    }());
    var ApiPuestos = (function () {
        function ApiPuestos(api, procesarRespuesta) {
            this.api = api;
            this.procesarRespuesta = procesarRespuesta;
            this.apis = new ApiPuestosMetodos(environment_1.default.apiUrl.puestos);
        }
        ApiPuestos.prototype.consultarPuestos = function () {
            var _this = this;
            var self = this;
            var resultado = [];
            return new Promise(function (result) {
                _this.api.get(_this.apis.consultarPuestos())
                    .then(function (respuesta) {
                    return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
                })
                    .catch(function (error) {
                    return result(self.procesarRespuesta.ProcesarError(error, resultado));
                });
            });
        };
        ApiPuestos = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [api_solicitud_1.ApiSolicitud, api_procesar_respuesta_1.ApiProcesarRespuesta])
        ], ApiPuestos);
        return ApiPuestos;
    }());
    exports.ApiPuestos = ApiPuestos;
});



define('servicios/web-api/api-respuesta',["require", "exports", "../../enumeradores/enum-respuesta-api"], function (require, exports, enum_respuesta_api_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ApiRespuesta = (function () {
        function ApiRespuesta() {
        }
        ApiRespuesta.prototype.ProcesarRespuesta = function (respuesta) {
            var resultado;
            switch (respuesta.Codigo) {
                case enum_respuesta_api_1.EnumRespuestaAPI.Aceptado: {
                    if (respuesta.Respuesta == null || respuesta.Respuesta.length == 0)
                        resultado = { Respuesta: null, Codigo: respuesta.Codigo, Mensaje: 'No hay datos registrados.' };
                    else
                        resultado = respuesta;
                    break;
                }
                case enum_respuesta_api_1.EnumRespuestaAPI.NoEncontrado: {
                    resultado = { Respuesta: null, Codigo: respuesta.Codigo, Mensaje: 'La página solicitada no ha sido encontrada.' };
                    break;
                }
                case enum_respuesta_api_1.EnumRespuestaAPI.ErrorInterno: {
                    resultado = { Respuesta: null, Codigo: respuesta.Codigo, Mensaje: 'Ocurrió algo inesperado.' };
                    break;
                }
                case enum_respuesta_api_1.EnumRespuestaAPI.NoSeEncontraronDatos: {
                    resultado = { Respuesta: null, Codigo: respuesta.Codigo, Mensaje: respuesta.Mensaje };
                    break;
                }
                case enum_respuesta_api_1.EnumRespuestaAPI.ValidacionReglaNegocio: {
                    resultado = { Respuesta: null, Codigo: respuesta.Codigo, Mensaje: respuesta.Mensaje };
                    break;
                }
                default: {
                    resultado = { Respuesta: null, Codigo: enum_respuesta_api_1.EnumRespuestaAPI.NoSeEncontraronDatos, Mensaje: "La api no está configurada" };
                    break;
                }
            }
            return resultado;
        };
        return ApiRespuesta;
    }());
    exports.ApiRespuesta = ApiRespuesta;
});



var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('servicios/web-api/api-solicitud',["require", "exports", "aurelia-fetch-client"], function (require, exports, aurelia_fetch_client_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ApiSolicitud = (function (_super) {
        __extends(ApiSolicitud, _super);
        function ApiSolicitud() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ApiSolicitud.prototype.get = function (url) {
            var self = this;
            return new Promise(function (res, err) {
                self.fetch(url)
                    .then(function (respuesta) { return respuesta.json(); })
                    .then(function (respuesta) { return res(respuesta); })
                    .catch(function (error) { return err(error); });
            });
        };
        ApiSolicitud.prototype.post = function (url, objeto) {
            var self = this;
            return new Promise(function (res, err) {
                var init = {};
                init.method = "post";
                init.body = aurelia_fetch_client_1.json(objeto);
                self.fetch(url, init)
                    .then(function (respuesta) { return respuesta.json(); })
                    .then(function (respuesta) { return res(respuesta); })
                    .catch(function (error) { return err(error); });
            });
        };
        return ApiSolicitud;
    }(aurelia_fetch_client_1.HttpClient));
    exports.ApiSolicitud = ApiSolicitud;
});



define('resources',['resources/index'],function(m){return m;});
//# sourceMappingURL=app-bundle.js.map