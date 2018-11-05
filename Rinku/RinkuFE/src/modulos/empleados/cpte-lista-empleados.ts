import { bindable, bindingMode, autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as eventosEmpleados from '../../eventos/eventos-empleados';
import { ConfiguracionBoton } from '../../controles/ctrl-boton';
import { ConfiguracionTabla, Encabezados, Columnas, EnumTipoColumnas } from '../../controles/ctrl-tabla';
import { Icono, EnumTamanosIconos } from '../../controles/icono';
import { EnumIconos } from 'enumeradores/enum-iconos';
import { EnumColores } from 'enumeradores/enum-colores';
import { EnumPosiciones } from 'enumeradores/enum-posiciones';

@autoinject
export class CpteListaEmpleados
{
    configBotonAceptar: ConfiguracionBoton;
    configTablaEmpleados: ConfiguracionTabla;

    //Subscripciones
    subscribeEnviarListaPacientes: any;

    constructor(private ea: EventAggregator)
    {
        this.inicializarControles();
    }

    attached() {
        var self = this;
        this.subscribeEnviarListaPacientes = this.ea.subscribe(eventosEmpleados.EnviarListaPacientes, msg => {
            self.configTablaEmpleados = msg.configuracion;
        });
    }

    detached() {
        this.subscribeEnviarListaPacientes.dispose();
    }

    inicializarControles()
    {
        this.configBotonAceptar = {
            ID: '',
            Icono: new Icono(EnumIconos.Guardar, EnumColores.SinColor, EnumPosiciones.izquierda),
            Nombre: '',
            Texto: 'Aceptar',
            Deshabilitado: false,
            Mostrar: false,
            Funcion: 'aceptar',
            Padre: this
        };
    }
}