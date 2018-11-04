import { PLATFORM, Aurelia } from "aurelia-framework";
import environment from './environment';
import "materialize-css";

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin('aurelia-validation')
		.plugin(PLATFORM.moduleName("aurelia-validation"))
    .plugin(PLATFORM.moduleName('aurelia-materialize-bridge'), b => b.useAll());

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  return aurelia.start().then(() => aurelia.setRoot());
}
