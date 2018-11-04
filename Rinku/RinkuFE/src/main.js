define(["require", "exports", "aurelia-framework", "./environment", "materialize-css"], function (require, exports, aurelia_framework_1, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources')
            .plugin(aurelia_framework_1.PLATFORM.moduleName("aurelia-validation"))
            .plugin(aurelia_framework_1.PLATFORM.moduleName('aurelia-materialize-bridge'), function (b) { return b.useAll(); });
        aurelia.use.developmentLogging(environment_1.default.debug ? 'debug' : 'warn');
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        return aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});
//# sourceMappingURL=main.js.map