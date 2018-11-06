define(["require", "exports", "../enumeradores/enum-posiciones", "../enumeradores/enum-iconos", "../enumeradores/enum-colores"], function (require, exports, enum_posiciones_1, enum_iconos_1, enum_colores_1) {
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
//# sourceMappingURL=icono.js.map