import { autoinject, bindable, bindingMode  } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as EventosControles from '../../eventos/eventos-controles';
import * as EventosMovimientos from '../../eventos/eventos-movimientos';
import { ConfiguracionBoton } from '../../controles/ctrl-boton';
import { ConfiguracionTabla, Encabezados, Columnas, EnumTipoColumnas } from '../../controles/ctrl-tabla';
import { CtrlAlerta } from '../../controles/ctrl-alerta';
import { Icono } from '../../controles/icono';
import { ApiMovimientos } from '../../servicios/web-api/api-movimientos';
import { EnumVistas } from 'enumeradores/enum-vistas';

@autoinject
export class CpteListaMovimientos
{    
    configBotonRegresar: ConfiguracionBoton;
    configTablaMovimientos: ConfiguracionTabla;

    //Subscripciones
    subscribeEnviarListaMovimientos: any;
    subscribeClickBoton: any;

    constructor(private ea: EventAggregator, private peticionMovimientos: ApiMovimientos)
    {
        this.inicializarControles();
    }

    attached() {
        var self = this;

        this.subscribeEnviarListaMovimientos = this.ea.subscribe(EventosMovimientos.EnviarListaMovimientos, msg => {
            self.mostrarMovimientos(msg.movimientos);
        });

        this.subscribeClickBoton = this.ea.subscribe(EventosControles.ClickBoton, msg =>
        {
          var self = this;
        
          switch(msg.funcion)
          {
            case 'regresar':
              self.regresar();
              break;
          }
        });
    }

    detached() {
        this.subscribeEnviarListaMovimientos.dispose();
    }

    /*consultarMovimientos(movimientos)
    {
        var self = this;

        self.peticionMovimientos.consultarMovimientos(movimientos.EmpleadoID, movimientos.Fecha)
        .then(respuesta => {
            if (respuesta.Codigo == EnumRespuestaAPI.Aceptado) {
                self.mostrarMovimientos(respuesta.Respuesta);
            }
            else
                new CtrlAlerta(respuesta.Mensaje, new Icono(EnumIconos.Advertencia, EnumColores.Amarillo));
        })
        .catch(error => {
            console.log(EnumMensajes.ErrorAPI);
            new CtrlAlerta(EnumMensajes.ErrorAPI);
        });
    }*/
    
    regresar()
    {
        this.ea.publish(new EventosMovimientos.CambiarVistasMovimientos(EnumVistas.vistaFiltrosMovimientos));
    }

    mostrarMovimientos(movimientos: any)
    {
        try
        {
            var movimiento = [];
        
            for(var i in movimientos)
            {
                movimiento.push({
                    "Nombre": new Columnas(movimientos[i].Nombre, EnumTipoColumnas.Texto),
                    "ApellidoPaterno": new Columnas(movimientos[i].ApellidoPaterno, EnumTipoColumnas.Texto),
                    "ApellidoMaterno": new Columnas(movimientos[i].ApellidoMaterno, EnumTipoColumnas.Texto),
                    "Actividad": new Columnas(movimientos[i].Actividad, EnumTipoColumnas.Texto),
                    "Cantidad": new Columnas(movimientos[i].Cantidad, EnumTipoColumnas.Texto),
                    "Monto": new Columnas(movimientos[i].Monto, EnumTipoColumnas.Moneda),
                    "Total": new Columnas(movimientos[i].Total, EnumTipoColumnas.Moneda),
                    "FechaMovimiento": new Columnas(movimientos[i].Fecha, EnumTipoColumnas.Fecha)
                });
            }
            this.configTablaMovimientos = {
                Encabezados: [
                    new Encabezados("Nombre", "Nombre"),
                    new Encabezados("ApellidoPaterno", "Apellido Paterno"),
                    new Encabezados("ApellidoMaterno", "Apellido Materno"),
                    new Encabezados("Actividad", "Actividad"),
                    new Encabezados("Cantidad", "Cantidad"),
                    new Encabezados("Monto", "Monto"),
                    new Encabezados("Total", "Total"), 
                    new Encabezados("FechaMovimiento","Fecha Movimiento")
                ],
                Clases: '',
                ID: '',
                JsonDatos: movimiento,
                Nombre: ''
            };
        }
        catch(e){
            new CtrlAlerta("Error al pintar la tabla de movimientos");
        }
    }

    inicializarControles()
    {
        this.configBotonRegresar = {
            ID: '',
            Icono: new Icono(),
            Nombre: '',
            Texto: 'Regresar',
            Deshabilitado: false,
            Mostrar: true,
            Funcion: 'regresar'
        };
    }
}