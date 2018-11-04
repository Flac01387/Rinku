define(["require", "exports", "../enumeradores/enum-posiciones"], function (require, exports, enum_posiciones_1) {
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
//# sourceMappingURL=icono.js.map