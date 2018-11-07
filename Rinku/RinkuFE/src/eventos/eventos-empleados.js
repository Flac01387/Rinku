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
    var EnviarListaPacientes = (function () {
        function EnviarListaPacientes(configuracion) {
            this.configuracion = configuracion;
        }
        return EnviarListaPacientes;
    }());
    exports.EnviarListaPacientes = EnviarListaPacientes;
    var EditarEmpleado = (function () {
        function EditarEmpleado(empleado) {
            this.empleado = empleado;
        }
        return EditarEmpleado;
    }());
    exports.EditarEmpleado = EditarEmpleado;
});
//# sourceMappingURL=eventos-empleados.js.map