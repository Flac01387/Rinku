var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "./enumeradores/enum-vistas"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, enum_vistas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App(ea) {
            this.ea = ea;
            this.migas = [];
            this.pantallaPrincipal();
        }
        App.prototype.attached = function () {
        };
        App.prototype.pantallaPrincipal = function () {
            this.Vistas = enum_vistas_1.EnumVistas.vistaEmpleados["vista"];
            this.VistasModelos = enum_vistas_1.EnumVistas.vistaEmpleados["modelo"];
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



define('text!app.html',[],function(){return "<template><require from=\"materialize-css/dist/css/materialize.css\"></require><div class=\"ren\"><div class=\"col c12\"><compose view.bind=\"Vistas\" view-model.bind=\"VistasModelos\"></compose></div></div></template>";});
define('controles/ctrl-alerta',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CtrlAlerta = (function () {
        function CtrlAlerta(mensaje) {
            M.toast({ html: mensaje });
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
define('controles/ctrl-boton',["require", "exports", "aurelia-framework", "./icono"], function (require, exports, aurelia_framework_1, icono_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfiguracionBoton = (function () {
        function ConfiguracionBoton() {
            this.ID = '';
            this.Icono = new icono_1.Icono();
            this.Nombre = '';
            this.Texto = '';
            this.Deshabilitado = false;
            this.Funcion = '';
            this.Padre = null;
        }
        return ConfiguracionBoton;
    }());
    exports.ConfiguracionBoton = ConfiguracionBoton;
    var CtrlBoton = (function () {
        function CtrlBoton() {
            this.configBoton = new ConfiguracionBoton();
        }
        CtrlBoton.prototype.bind = function (ctx) {
            this.configBoton.Funcion = ctx[this.configBoton.Funcion];
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", ConfiguracionBoton)
        ], CtrlBoton.prototype, "configBoton", void 0);
        CtrlBoton = __decorate([
            aurelia_framework_1.autoinject
        ], CtrlBoton);
        return CtrlBoton;
    }());
    exports.CtrlBoton = CtrlBoton;
});



define('text!controles/ctrl-boton.html',[],function(){return "<template><div class=\"ren\"><div class=\"col c12\"><a class=\"waves-effect waves-light btn\" click.delegate=\"configBoton.Funcion()\"><i if.bind=\"configBoton.Icono.nombre != ''\" class=\"material-icons ${configBoton.Icono.posicion}\">${configBoton.Icono.nombre}</i> ${configBoton.Texto} </a></div></div></template>";});
define('text!controles/ctrl-checkbox.html',[],function(){return "<div class=\"ren\"><div class=\"col c12\"><label><input type=\"checkbox\"> <span>Obternerlo</span></label></div></div>";});
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
            this.TextoDefault = null;
            this.ValorDefault = null;
            this.Valor = null;
        }
        return ConfiguracionCombo;
    }());
    exports.ConfiguracionCombo = ConfiguracionCombo;
    var CtrlCombo = (function () {
        function CtrlCombo() {
            this.configCombo = new ConfiguracionCombo();
        }
        CtrlCombo.prototype.attached = function () {
            this.configCombo.ValorDefault = 1;
            this.configCombo.TextoDefault = 'Quitarlos del attached';
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



define('text!controles/ctrl-combo.html',[],function(){return "<template><div class=\"ren\"><div class=\"col c12\"><div class=\"input-field col s12\"><select value.bind=\"configCombo.Seleccionado\"><option if.bind=\"configCombo.ValorDefault != null\" model.bind=\"configCombo.ValorDefault\" selected=\"selected\">${configCombo.TextoDefualt}</option><option repeat.for=\"item of configCombo.JsonDatos\" model.bind=\"item\">${item.Nombre}</option></select> <label>${configCombo.Label}</label></div></div></div></template>";});
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



define('text!controles/ctrl-input.html',[],function(){return "<template><div class=\"ren\"><div class=\"col c12\"><div class=\"input-field\"><input placeholder=\"\" id=\"\" type=\"text\" class=\"${configInput.Clases}\" value.bind=\"configInput.Valor\"> <label for=\"\">${configInput.Label}</label></div></div></div></template>";});
define('text!controles/ctrl-menu.html',[],function(){return "https://materializecss.com/sidenav.html";});
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



define('text!controles/ctrl-migas.html',[],function(){return "<template><div class=\"ren\"><div class=\"col c12\"><nav><div class=\"nav-wrapper\"><div class=\"col c12\"><a href=\"#!\" repeat.for=\"miga of migas\" class=\"breadcrumb\">${miga}</a></div></div></nav></div></div></template>";});
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



define('text!controles/ctrl-radio-horizontal.html',[],function(){return "<template><div class=\"ren\"><div class=\"col c12\"><label repeat.for=\"radio of configRadio.Opciones\"><input class=\"with-gap\" type=\"radio\" name=\"${configRadio.Grupo}\" id=\"\" model.bind=\"radio\" checked.bind=\"configRadio.Seleccionado\"> <span>${radio.Nombre}</span></label></div></div><p></p></template>";});
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



define('text!controles/ctrl-radio-vertical.html',[],function(){return "<template><div class=\"ren\"><div class=\"col c12\"><p repeat.for=\"radio of configRadio.Opciones\"><label><input class=\"with-gap\" type=\"radio\" name=\"${configRadio.Grupo}\" id=\"\" model.bind=\"radio\" checked.bind=\"configRadio.Seleccionado\"> <span>${radio.Nombre}</span></label></p></div></div></template>";});
define('text!controles/ctrl-tabla.html',[],function(){return "<div class=\"ren\"><div class=\"col c12\"><table><thead><tr><th>repetir</th></tr></thead><tbody><tr><td>Repetir tr</td></tr></tbody></table></div></div>recibir un arreglo de encabezados y otro de opciones";});
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



define('text!controles/ctrl-titulo.html',[],function(){return "<template><div class=\"ren\"><div class=\"col c12 center-align\"> ${titulo} </div></div></template>";});
define('controles/icono',["require", "exports", "../enumeradores/enum-posiciones"], function (require, exports, enum_posiciones_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Icono = (function () {
        function Icono(nombre, posicion) {
            if (nombre === void 0) { nombre = ''; }
            if (posicion === void 0) { posicion = enum_posiciones_1.EnumPosiciones.default; }
            this.nombre = '';
            this.posicion = enum_posiciones_1.EnumPosiciones.default;
            this.nombre = nombre;
            this.posicion = posicion;
        }
        return Icono;
    }());
    exports.Icono = Icono;
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



define('enumeradores/enum-vistas',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EnumVistas;
    (function (EnumVistas) {
        EnumVistas[EnumVistas["vistaNinguna"] = { vista: '', modelo: '' }] = "vistaNinguna";
        EnumVistas[EnumVistas["vistaEmpleados"] = { vista: 'modulos/empleados/mod-empleados.html', modelo: 'modulos/empleados/mod-empleados' }] = "vistaEmpleados";
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
            empleados: 'http://localhost:55758/api/empleados/'
        }
    };
});



define('main',["require", "exports", "aurelia-framework", "./environment", "materialize-css"], function (require, exports, aurelia_framework_1, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources')
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
define('modulos/empleados/cpte-filtros-empleados',["require", "exports", "aurelia-framework", "../../controles/ctrl-alerta", "../../controles/icono", "../../servicios/web-api/api-puestos", "../../servicios/web-api/api-empleados", "../../enumeradores/enum-respuesta-api", "enumeradores/enum-posiciones", "enumeradores/enum-mensajes"], function (require, exports, aurelia_framework_1, ctrl_alerta_1, icono_1, api_puestos_1, api_empleados_1, enum_respuesta_api_1, enum_posiciones_1, enum_mensajes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CpteFiltrosEmpleados = (function () {
        function CpteFiltrosEmpleados(peticionPuestos, peticionEmpleados) {
            this.peticionPuestos = peticionPuestos;
            this.peticionEmpleados = peticionEmpleados;
            this.Padre = null;
            this.inicializarControles();
            this.consultarPuestos();
            this.consultarTiposEmpleados();
        }
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
        CpteFiltrosEmpleados.prototype.cancelar = function () {
            console.log(this.configRadioTiposEmpleados);
        };
        CpteFiltrosEmpleados.prototype.aceptar = function () {
            var self = this.Padre;
            self.peticionEmpleados.nuevoEmpleado(self.configInputNombre.Valor, self.configInputPaterno.Valor, self.configInputMaterno.Valor, self.configComboPuestos.Seleccionado, self.configRadioTiposEmpleados.Seleccionado.Valor)
                .then(function (respuesta) {
                if (respuesta.Codigo == enum_respuesta_api_1.EnumRespuestaAPI.Aceptado) {
                    self.inicializarControles();
                }
                else
                    new ctrl_alerta_1.CtrlAlerta(respuesta.Mensaje);
            })
                .catch(function (error) {
                new ctrl_alerta_1.CtrlAlerta(enum_mensajes_1.EnumMensajes.ErrorAPI);
            });
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
            this.configBotonAceptar = {
                ID: '',
                Icono: new icono_1.Icono('save', enum_posiciones_1.EnumPosiciones.izquierda),
                Nombre: '',
                Texto: 'Aceptar',
                Deshabilitado: false,
                Funcion: 'aceptar',
                Padre: this
            };
            this.configBotonCancelar = {
                ID: '',
                Icono: new icono_1.Icono(),
                Nombre: '',
                Texto: 'Cancelar',
                Deshabilitado: false,
                Funcion: 'cancelar',
                Padre: this
            };
        };
        CpteFiltrosEmpleados = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [api_puestos_1.ApiPuestos, api_empleados_1.ApiEmpleados])
        ], CpteFiltrosEmpleados);
        return CpteFiltrosEmpleados;
    }());
    exports.CpteFiltrosEmpleados = CpteFiltrosEmpleados;
});



define('text!modulos/empleados/cpte-filtros-empleados.html',[],function(){return "<template><div class=\"row\"><div class=\"col s12 m6\"><ctrl-input config-input.bind=\"configInputNumero\"></ctrl-input></div></div><div class=\"row\"><div class=\"col s12 m4\"><ctrl-input config-input.bind=\"configInputNombre\"></ctrl-input></div><div class=\"col s12 m4\"><ctrl-input config-input.bind=\"configInputPaterno\"></ctrl-input></div><div class=\"col s12 m4\"><ctrl-input config-input.bind=\"configInputMaterno\"></ctrl-input></div></div><div class=\"row\"><div class=\"col s12 m6\"><ctrl-combo config-combo.bind=\"configComboPuestos\"></ctrl-combo></div><div class=\"col s12 m6\"><ctrl-radio-vertical config-radio.bind=\"configRadioTiposEmpleados\"></ctrl-radio-vertical></div></div><div class=\"row\"><div class=\"col s12 offset-m10 m1\"><ctrl-boton config-boton.bind=\"configBotonCancelar\"></ctrl-boton></div><div class=\"col s12 m1\"><ctrl-boton config-boton.bind=\"configBotonAceptar\"></ctrl-boton></div></div></template>";});
define('text!modulos/empleados/cpte-lista-empleados.html',[],function(){return "<div class=\"ren\"><div class=\"col c12\">Llamar ctrl-tabla</div></div>";});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('modulos/empleados/mod-empleados',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ModEmpleados = (function () {
        function ModEmpleados() {
            this.tituloEmpleados = 'Empleados';
            this.migas = ["Empleados", "Buscar"];
        }
        ModEmpleados = __decorate([
            aurelia_framework_1.autoinject
        ], ModEmpleados);
        return ModEmpleados;
    }());
    exports.ModEmpleados = ModEmpleados;
});



define('text!modulos/empleados/mod-empleados.html',[],function(){return "<template><require from=\"../../controles/ctrl-titulo\"></require><require from=\"../../controles/ctrl-migas\"></require><require from=\"../../modulos/empleados/cpte-filtros-empleados\"></require><div class=\"ren\"><div class=\"col c12\"><ctrl-migas migas.bind=\"migas\"></ctrl-migas></div></div><div class=\"ren\"><div class=\"col c12\"><ctrl-titulo titulo.bind=\"tituloEmpleados\"></ctrl-titulo></div></div><div class=\"ren\"><div class=\"col c12\"></div><cpte-filtros-empleados></cpte-filtros-empleados></div></template>";});
define('modulos/menu/menu-principal',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MenuPrincipal = (function () {
        function MenuPrincipal() {
            this.message = 'Hello World!';
        }
        return MenuPrincipal;
    }());
    exports.MenuPrincipal = MenuPrincipal;
});



define('text!modulos/menu/menu-principal.html',[],function(){return "<template><nav></nav><ul id=\"slide-out\" class=\"sidenav\"><li><div class=\"user-view\"><div class=\"background\"><img src=\"images/office.jpg\"></div><a href=\"#user\"><img class=\"circle\" src=\"images/yuna.jpg\"></a><a href=\"#name\"><span class=\"white-text name\">John Doe</span></a> <a href=\"#email\"><span class=\"white-text email\">jdandturk@gmail.com</span></a></div></li><li><a href=\"#!\"><i class=\"material-icons\">cloud</i>First Link With Icon</a></li><li><a href=\"#!\">Second Link</a></li><li><div class=\"divider\"></div></li><li><a class=\"subheader\">Subheader</a></li><li><a class=\"waves-effect\" href=\"#!\">Third Link With Waves</a></li></ul><a href=\"#\" data-target=\"slide-out\" class=\"sidenav-trigger\"><i class=\"material-icons\">menu</i></a></template>";});
define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources([
            "../controles/ctrl-input",
            "../controles/ctrl-radio-vertical",
            "../controles/ctrl-combo",
            "../controles/ctrl-boton"
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
            return this.apiBase["format"]("consultar");
        };
        ;
        ApiEmpleadosMetodos.prototype.nuevoEmpleado = function () {
            return this.apiBase["format"]('nuevo');
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
                _this.api.get(_this.apis.consultarTiposEmpleados())
                    .then(function (respuesta) {
                    return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
                })
                    .catch(function (error) {
                    return result(self.procesarRespuesta.ProcesarError(error, resultado));
                });
            });
        };
        ApiEmpleados.prototype.nuevoEmpleado = function (Nombre, ApellidoPaterno, ApellidoMaterno, PuestoID, TipoEmpleadoID) {
            var _this = this;
            var empleado = {
                "Nombre": Nombre,
                "ApellidoPaterno": ApellidoPaterno,
                "ApellidoMaterno": ApellidoMaterno,
                "TipoEmpleadoID": TipoEmpleadoID,
                "PuestoID": PuestoID
            };
            var self = this;
            var resultado = [];
            return new Promise(function (result) {
                console.log(_this.apis.nuevoEmpleado());
                _this.api.post(_this.apis.nuevoEmpleado(), empleado)
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