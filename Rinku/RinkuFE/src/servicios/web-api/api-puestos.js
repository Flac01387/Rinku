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
    var ApiPuestosMetodos = (function () {
        function ApiPuestosMetodos(apiBase) {
            this.apiBase = apiBase;
            this.apiBase = this.apiBase + "{0}";
        }
        ;
        ApiPuestosMetodos.prototype.consultarPuestos = function () {
            return this.apiBase["format"]("consultar");
        };
        ;
        return ApiPuestosMetodos;
    }());
    var ApiPuestos = (function () {
        function ApiPuestos(api, procesarRespuesta) {
            this.api = api;
            this.procesarRespuesta = procesarRespuesta;
            this.apis = new ApiPuestosMetodos(environment_1.default.apiUrl.puestos);
        }
        ApiPuestos.prototype.consultarPuestos = function () {
            var _this = this;
            var self = this;
            var resultado = [];
            return new Promise(function (result) {
                _this.api.get(_this.apis.consultarPuestos())
                    .then(function (respuesta) {
                    console.log('respuesta puestos');
                    return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
                })
                    .catch(function (error) {
                    console.log('catch puestos');
                    return result(self.procesarRespuesta.ProcesarError(error, resultado));
                });
            });
        };
        ApiPuestos = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [api_solicitud_1.ApiSolicitud, api_procesar_respuesta_1.ApiProcesarRespuesta])
        ], ApiPuestos);
        return ApiPuestos;
    }());
    exports.ApiPuestos = ApiPuestos;
});
//# sourceMappingURL=api-puestos.js.map