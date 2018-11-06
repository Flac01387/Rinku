import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    "../controles/ctrl-input",
    "../controles/ctrl-radio-vertical",
    "../controles/ctrl-combo",
    "../controles/ctrl-boton",
    "../controles/ctrl-tabla",
    "../controles/ctrl-menu-flotante-horizontal",
    "../controles/ctrl-migas",
    "../controles/ctrl-titulo",
    "../controles/ctrl-alerta-confirmacion"
  ]);
}
