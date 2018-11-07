define(["require", "exports"], function (require, exports) {
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
});
//# sourceMappingURL=eventos-empleados.js.map