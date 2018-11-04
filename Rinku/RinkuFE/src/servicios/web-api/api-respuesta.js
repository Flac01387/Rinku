define(["require", "exports", "../../enumeradores/enum-respuesta-api"], function (require, exports, enum_respuesta_api_1) {
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
//# sourceMappingURL=api-respuesta.js.map