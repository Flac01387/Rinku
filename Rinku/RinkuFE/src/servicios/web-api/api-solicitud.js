var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "aurelia-fetch-client"], function (require, exports, aurelia_fetch_client_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ApiSolicitud = (function (_super) {
        __extends(ApiSolicitud, _super);
        function ApiSolicitud() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ApiSolicitud.prototype.get = function (url) {
            var self = this;
            return new Promise(function (res, err) {
                self.fetch(url)
                    .then(function (respuesta) { return respuesta.json(); })
                    .then(function (respuesta) { return res(respuesta); })
                    .catch(function (error) { return err(error); });
            });
        };
        ApiSolicitud.prototype.post = function (url, objeto) {
            var self = this;
            return new Promise(function (res, err) {
                var init = {};
                init.method = "post";
                init.body = aurelia_fetch_client_1.json(objeto);
                self.fetch(url, init)
                    .then(function (respuesta) { return respuesta.json(); })
                    .then(function (respuesta) { return res(respuesta); })
                    .catch(function (error) { return err(error); });
            });
        };
        return ApiSolicitud;
    }(aurelia_fetch_client_1.HttpClient));
    exports.ApiSolicitud = ApiSolicitud;
});
//# sourceMappingURL=api-solicitud.js.map