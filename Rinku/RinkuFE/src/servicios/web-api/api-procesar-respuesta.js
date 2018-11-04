define(["require", "exports"], function (require, exports) {
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
//# sourceMappingURL=api-procesar-respuesta.js.map