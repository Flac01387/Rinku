import { autoinject, bindable, bindingMode  } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as eventosEmpleados from '../../eventos/eventos-empleados';
import * as EventosControles from '../../eventos/eventos-controles';
import { ConfiguracionBoton } from '../../controles/ctrl-boton';
import { ConfiguracionTabla } from '../../controles/ctrl-tabla';
import { ConfiguracionAlertaConfirmacion } from '../../controles/ctrl-alerta-confirmacion';
import { CtrlAlerta } from '../../controles/ctrl-alerta';
import { Icono } from '../../controles/icono';
import { ApiEmpleados } from '../../servicios/web-api/api-empleados';
import { EnumIconos } from 'enumeradores/enum-iconos';
import { EnumColores } from 'enumeradores/enum-colores';
import { EnumPosiciones } from 'enumeradores/enum-posiciones';
import { EnumRespuestaAPI } from '../../enumeradores/enum-respuesta-api';
import { EnumMensajes } from 'enumeradores/enum-mensajes';
import { EnumVistas } from 'enumeradores/enum-vistas';

@autoinject
export class CpteListaEmpleados
{
    configBotonAceptar: ConfiguracionBoton;
    configTablaEmpleados: ConfiguracionTabla;
    configAlertaEmpleados: ConfiguracionAlertaConfirmacion;

    empleado: any;

    //Subscripciones
    subscribeEnviarListaPacientes: any;
    subscribeClickAccion: any;
    subscribeModalClickAceptar: any;

    constructor(private ea: EventAggregator, private peticionEmpleados: ApiEmpleados)
    {
        this.inicializarControles();
    }

    attached()
    {
        var self = this;

        this.subscribeEnviarListaPacientes = this.ea.subscribe(eventosEmpleados.EnviarListaPacientes, msg => {
            self.configTablaEmpleados = msg.configuracion;
        });

        this.subscribeModalClickAceptar = this.ea.subscribe(EventosControles.ModalClickAceptar, msg => {
            this.eliminarEmpleado();
        });

        this.subscribeClickAccion = this.ea.subscribe(EventosControles.ClickAccion, msg =>
        {
            switch(msg.opc)
            {
                case 'EliminarEmpleado':
                    self.empleado = msg.objeto;
                    self.confirmarEliminarEmpleado();
                    break;
            }
        });
    }

    detached() {
        this.subscribeEnviarListaPacientes.dispose();
        this.subscribeClickAccion.dispose();
        this.subscribeModalClickAceptar.dispose();
    }

    confirmarEliminarEmpleado()
    {
        this.ea.publish(new EventosControles.MostrarModal());
    }

    eliminarEmpleado()
    {
        var self = this;
        
        /*self.peticionEmpleados.eliminarEmpleado(this.empleado.ID)
        .then(respuesta => 
        {
            if (respuesta.Codigo == EnumRespuestaAPI.Aceptado) 
            {*/
                self.regresarFiltrosEmpleados();
           /* }
            else
                new CtrlAlerta(respuesta.Mensaje);
        })
        .catch(error => {
            new CtrlAlerta(EnumMensajes.ErrorAPI);
        });*/
    }

    regresarFiltrosEmpleados()
    {
        this.ea.publish(new eventosEmpleados.CambiarVistasEmpleados(EnumVistas.vistaFiltrosEmpleados));
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

        this.configAlertaEmpleados = {
            id: 'modalEliminarEmpleado', 
            titulo: 'Empleados',
            mensaje: '¿Desea eliminar al empleado?'
        };
    }
}