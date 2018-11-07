define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EnumVistas;
    (function (EnumVistas) {
        EnumVistas[EnumVistas["vistaNinguna"] = { vista: '', modelo: '' }] = "vistaNinguna";
        EnumVistas[EnumVistas["vistaEmpleados"] = { vista: 'modulos/empleados/mod-empleados.html', modelo: 'modulos/empleados/mod-empleados' }] = "vistaEmpleados";
        EnumVistas[EnumVistas["vistaFiltrosEmpleados"] = { vista: 'modulos/empleados/cpte-filtros-empleados.html', modelo: 'modulos/empleados/cpte-filtros-empleados' }] = "vistaFiltrosEmpleados";
        EnumVistas[EnumVistas["vistaEditarEmpleados"] = { vista: 'modulos/empleados/cpte-filtros-empleados.html', modelo: 'modulos/empleados/cpte-filtros-empleados' }] = "vistaEditarEmpleados";
        EnumVistas[EnumVistas["vistaListaEmpleados"] = { vista: 'modulos/empleados/cpte-lista-empleados.html', modelo: 'modulos/empleados/cpte-lista-empleados' }] = "vistaListaEmpleados";
    })(EnumVistas = exports.EnumVistas || (exports.EnumVistas = {}));
});
//# sourceMappingURL=enum-vistas.js.map