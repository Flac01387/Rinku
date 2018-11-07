define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CtrlAlerta = (function () {
        function CtrlAlerta(mensaje, icono) {
            if (icono === void 0) { icono = null; }
            var alerta = '';
            alerta += (icono != null) ? '<i class="material-icons icon-' + icono.color + '">' + icono.icono + '</i> ' : '';
            alerta += mensaje;
            M.toast({ html: alerta });
        }
        return CtrlAlerta;
    }());
    exports.CtrlAlerta = CtrlAlerta;
});
//# sourceMappingURL=ctrl-alerta.js.map