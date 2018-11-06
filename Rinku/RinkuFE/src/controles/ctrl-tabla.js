var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
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
//# sourceMappingURL=ctrl-tabla.js.map