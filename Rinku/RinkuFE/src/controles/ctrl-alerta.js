define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CtrlAlerta = (function () {
        function CtrlAlerta(mensaje) {
            M.toast({ html: mensaje });
        }
        return CtrlAlerta;
    }());
    exports.CtrlAlerta = CtrlAlerta;
});
//# sourceMappingURL=ctrl-alerta.js.map