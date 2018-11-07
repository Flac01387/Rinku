var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../environment", "./api-solicitud", "./api-procesar-respuesta"], function (require, exports, aurelia_framework_1, environment_1, api_solicitud_1, api_procesar_respuesta_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ApiEmpleadosMetodos = (function () {
        function ApiEmpleadosMetodos(apiBase) {
            this.apiBase = apiBase;
            this.apiBase = this.apiBase + "{0}";
        }
        ;
        ApiEmpleadosMetodos.prototype.consultarTiposEmpleados = function () {
            return this.apiBase["format"]("consultar/tipos");
        };
        ;
        ApiEmpleadosMetodos.prototype.consultarEmpleados = function () {
            return this.apiBase["format"]("consultar");
        };
        ;
        ApiEmpleadosMetodos.prototype.nuevoEmpleado = function () {
            return this.apiBase["format"]("nuevo");
        };
        ApiEmpleadosMetodos.prototype.eliminarEmpleado = function () {
            return this.apiBase["format"]("eliminar");
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
        ApiEmpleados.prototype.consultarEmpleados = function (ID, Nombre, ApellidoPaterno, ApellidoMaterno, PuestoID, TipoEmpleadoID, Activo) {
            var _this = this;
            var filtros = {
                "ID": ID,
                "Nombre": Nombre,
                "ApellidoPaterno": ApellidoPaterno,
                "ApellidoMaterno": ApellidoMaterno,
                "TipoEmpleadoID": TipoEmpleadoID,
                "PuestoID": PuestoID,
                "Activo": Activo
            };
            var self = this;
            var resultado = [];
            return new Promise(function (result) {
                _this.api.post(_this.apis.consultarEmpleados(), filtros)
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
                _this.api.post(_this.apis.nuevoEmpleado(), empleado)
                    .then(function (respuesta) {
                    return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
                })
                    .catch(function (error) {
                    return result(self.procesarRespuesta.ProcesarError(error, resultado));
                });
            });
        };
        ApiEmpleados.prototype.eliminarEmpleado = function (ID) {
            var _this = this;
            var self = this;
            var resultado = [];
            return new Promise(function (result) {
                _this.api.post(_this.apis.eliminarEmpleado(), ID)
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
//# sourceMappingURL=api-empleados.js.map