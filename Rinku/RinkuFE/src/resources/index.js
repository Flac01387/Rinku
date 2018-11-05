define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources([
            "../controles/ctrl-input",
            "../controles/ctrl-radio-vertical",
            "../controles/ctrl-combo",
            "../controles/ctrl-boton",
            "../controles/ctrl-tabla",
            "../controles/ctrl-menu-flotante-horizontal",
            "../controles/ctrl-migas",
            "../controles/ctrl-titulo"
        ]);
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map