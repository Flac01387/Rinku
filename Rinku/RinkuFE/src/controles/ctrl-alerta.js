define(["require", "exports", "./icono"], function (require, exports, icono_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfiguracionAlerta = (function () {
        function ConfiguracionAlerta() {
            this.Icono = new icono_1.Icono();
            this.Mensaje = '';
        }
        return ConfiguracionAlerta;
    }());
    exports.ConfiguracionAlerta = ConfiguracionAlerta;
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