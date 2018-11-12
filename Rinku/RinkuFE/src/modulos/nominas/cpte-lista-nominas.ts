import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as EventosControles from '../../eventos/eventos-controles';
import { Icono } from '../../controles/icono';
import { CtrlAlerta } from '../../controles/ctrl-alerta';
import { ConfiguracionFecha } from '../../controles/ctrl-fecha';
import { ConfiguracionBoton } from '../../controles/ctrl-boton';
import { ConfiguracionTabla, Encabezados, Columnas, EnumTipoColumnas } from '../../controles/ctrl-tabla';
import { ApiNominas } from '../../servicios/web-api/api-nominas';
import { EnumIconos } from 'enumeradores/enum-iconos';
import { EnumColores } from 'enumeradores/enum-colores';
import { EnumPosiciones } from 'enumeradores/enum-posiciones';
import { EnumRespuestaAPI } from '../../enumeradores/enum-respuesta-api';
import { EnumMensajes } from 'enumeradores/enum-mensajes';

@autoinject
export class CpteListaNominas
{
    configFecha: ConfiguracionFecha;
    configBotonBuscar: ConfiguracionBoton;
    configTablaNomina: ConfiguracionTabla;

    //Subscripciones
    subscribeClickBoton: any;

    constructor(private ea: EventAggregator, private peticionNominas: ApiNominas)
    {
        this.inicializarControles();
        this.consultarNomina();
    }

    attached() 
    {
        this.subscribeClickBoton = this.ea.subscribe(EventosControles.ClickBoton, msg =>
        {
            var self = this;
        
            switch(msg.funcion)
            {
                case 'buscar':
                    self.consultarNomina();
                    break;
            }
        });
    }

    detached()
    {
        this.subscribeClickBoton.dispose();
    }

    consultarNomina()
    {
        var self = this;

        this.configTablaNomina = new ConfiguracionTabla();
    
        this.peticionNominas.consultarNomina(
            self.configFecha.Valor
        )
        .then(respuesta => {
            if (respuesta.Codigo == EnumRespuestaAPI.Aceptado)
            {
                if(respuesta.Respuesta[0].Id == -1)
                {
                    new CtrlAlerta(respuesta.Respuesta[0].Nombre);
                }
                else{
                    self.mostrarListaNomina(respuesta.Respuesta);
                }
            }
            else
                new CtrlAlerta(respuesta.Mensaje);
        })
        .catch(error => {
            new CtrlAlerta(EnumMensajes.ErrorAPI);
        });
    }

    mostrarListaNomina(listaNomina)
    {
        try
        {
            var nomina = [];
        
            for(var i in listaNomina)
            {
                nomina.push({
                    "EmpleadoID": new Columnas(listaNomina[i].EmpleadoID, EnumTipoColumnas.Texto),
                    "Nombre": new Columnas(listaNomina[i].Nombre, EnumTipoColumnas.Texto),
                    "ApellidoPaterno": new Columnas(listaNomina[i].ApellidoPaterno, EnumTipoColumnas.Texto),
                    "ApellidoMaterno": new Columnas(listaNomina[i].ApellidoMaterno, EnumTipoColumnas.Texto),
                    "SueldoBase": new Columnas(listaNomina[i].SueldoBase, EnumTipoColumnas.Moneda),
                    "TotalBruto": new Columnas(listaNomina[i].TotalBruto, EnumTipoColumnas.Moneda),
                    "TotalNeto": new Columnas(listaNomina[i].TotalNeto, EnumTipoColumnas.Moneda)
                   
                });
            }
            this.configTablaNomina = {
                Encabezados: [
                    new Encabezados("EmpleadoID", "ID"),
                    new Encabezados("Nombre", "Nombre"),
                    new Encabezados("ApellidoPaterno", "Apellido Paterno"),
                    new Encabezados("ApellidoMaterno", "Apellido Materno"),
                    new Encabezados("SueldoBase", "Sueldo Base"),
                    new Encabezados("TotalBruto", "Total Bruto"),
                    new Encabezados("TotalNeto", "Total Neto")
                ],
                Clases: '',
                ID: '',
                JsonDatos: nomina,
                Nombre: ''
            };
        }
        catch(e){
        new CtrlAlerta("Error al pintar la tabla de movimientos");
        }
    }

    inicializarControles()
    {
        
        this.configFecha = {
            ID: '',
            Nombre: '',
            Icono: true,
            Label: 'Fecha',
            Obligatorio: false,
            SoloLectura: false,
            Deshabilitado: false,
            Valor: new Date(),
            Clases: '',
            FechaMin: new Date(new Date().setMonth(new Date().getMonth()-12)),
            FechaMax: new Date()
        };
  
        this.configBotonBuscar = {
            ID: '',
            Icono: new Icono(EnumIconos.Buscar, EnumColores.SinColor, EnumPosiciones.izquierda),
            Nombre: '',
            Texto: 'Buscar',
            Deshabilitado: false,
            Mostrar: true,
            Funcion: 'buscar'
        };
    }
}