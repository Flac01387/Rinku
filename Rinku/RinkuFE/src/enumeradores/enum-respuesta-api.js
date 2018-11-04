define(["require", "exports"], function (require, exports) {
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
//# sourceMappingURL=enum-respuesta-api.js.map