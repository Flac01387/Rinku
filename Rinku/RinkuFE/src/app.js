var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "./enumeradores/enum-vistas", "materialize-css"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, enum_vistas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App(ea) {
            this.ea = ea;
            this.migas = [];
            this.pantallaPrincipal();
        }
        App.prototype.attached = function () {
        };
        App.prototype.pantallaPrincipal = function () {
            this.Vistas = enum_vistas_1.EnumVistas.vistaEmpleados["vista"];
            this.VistasModelos = enum_vistas_1.EnumVistas.vistaEmpleados["modelo"];
        };
        App = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator])
        ], App);
        return App;
    }());
    exports.App = App;
    String.prototype["format"] = function () {
        var base = this;
        for (var ndx = 0; ndx < arguments.length; ndx++) {
            var regexp = new RegExp("\\{" + ndx.toString() + "}", "gi");
            base = base.replace(regexp, arguments[ndx]);
        }
        return base;
    };
});
//# sourceMappingURL=app.js.map