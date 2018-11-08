import { bindable, bindingMode, autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as EventosControles from '../../eventos/eventos-controles';
import * as EventosMovimientos from '../../eventos/eventos-movimientos';
import { Icono } from '../../controles/icono';
import { CtrlAlerta } from '../../controles/ctrl-alerta';
import { ConfiguracionInput } from '../../controles/ctrl-input';
import { ConfiguracionBoton } from '../../controles/ctrl-boton';
import { ConfiguracionFecha } from '../../controles/ctrl-fecha';
import { EnumRespuestaAPI } from '../../enumeradores/enum-respuesta-api';
import { EnumMensajes } from 'enumeradores/enum-mensajes';
import { ApiMovimientos } from '../../servicios/web-api/api-movimientos';

@autoinject
export class CpteRegistroMovimientos
{
    //Controles utilizados en la pantalla
    configInputNumero: ConfiguracionInput;
    configFechaRegistro: ConfiguracionFecha;
    configInputNombre: ConfiguracionInput;
    configInputPaterno: ConfiguracionInput;
    configInputMaterno: ConfiguracionInput;
    configInputPuesto: ConfiguracionInput;
    configInputTipo: ConfiguracionInput;
    configInputCantidadEntregas: ConfiguracionInput;
    configInputCubrioPuesto: ConfiguracionInput;
    configBotonRegistrar: ConfiguracionBoton;

    //Subscripciones
    subscribeRegistrarMovimiento: any;
    subscribeClickBoton: any;

    constructor(private ea: EventAggregator, private peticionMovimientos: ApiMovimientos)
    {
        this.inicializarControles();
    }

    attached()
    {
        var self = this;

        this.subscribeRegistrarMovimiento = this.ea.subscribe(EventosMovimientos.RegistrarMovimiento, msg => {
            self.llenarFomulario(msg.empleado);
        });

        this.subscribeClickBoton = this.ea.subscribe(EventosControles.ClickBoton, msg =>
        {
          var self = this;
        
          switch(msg.funcion)
          {
            case 'registrar':
              self.registrarMovimiento();
              break;
          }
        });
    }
    detached()
    {
        this.subscribeRegistrarMovimiento.dispose();
        this.subscribeClickBoton.dispose();
    }

    llenarFomulario(empleado: any)
    {
        this.configInputNumero.Valor = empleado.ID.Valor;
        this.configInputNombre.Valor = empleado.Nombre.Valor;
        this.configInputPaterno.Valor = empleado.ApellidoPaterno.Valor;
        this.configInputMaterno.Valor = empleado.ApellidoMaterno.Valor;
        this.configInputPuesto.Valor = empleado.Puesto.Valor;
        this.configInputTipo.Valor = empleado.TipoEmpleado.Valor;

        setTimeout(()=>{M.updateTextFields();},100)
    }

    registrarMovimiento()
    {
        var self = this;

        this.configInputNumero.Valor
    
        /*this.peticionMovimientos.registrarMovimiento()
        .then(respuesta => {
            if (respuesta.Codigo == EnumRespuestaAPI.Aceptado)
            {
                console.log(respuesta);
            }
            else
                new CtrlAlerta(respuesta.Mensaje);
        })
        .catch(error => {
            console.log(EnumMensajes.ErrorAPI);
            new CtrlAlerta(EnumMensajes.ErrorAPI);
        });*/
    }

    inicializarControles()
    {
        this.configInputNumero = {
            ID: '',
            Nombre: '',
            Icono: false,
            Label: 'Número de empleado',
            Obligatorio: false,
            Placeholder: '',
            SoloLectura: false,
            Deshabilitado: true,
            Valor: '',
            Clases: ''
        };

        var hoy = new Date();
        
        this.configFechaRegistro = {
            ID: '',
            Nombre: '',
            Icono: true,
            Label: 'Fecha movimiento',
            Obligatorio: false,
            SoloLectura: false,
            Deshabilitado: false,
            Valor: hoy,
            Clases: '',
            FechaMin: hoy.setMonth(hoy.getFullYear()-1),
            FechaMax: hoy
        };

        this.configInputNombre = {
            ID: '',
            Nombre: '',
            Icono: false,
            Label: 'Nombre',
            Obligatorio: true,
            Placeholder: '',
            SoloLectura: false,
            Deshabilitado: true,
            Valor: '',
            Clases: ''
        };
        
        this.configInputPaterno = {
            ID: '',
            Nombre: '',
            Icono: false,
            Label: 'Apellido paterno',
            Obligatorio: true,
            Placeholder: '',
            SoloLectura: false,
            Deshabilitado: true,
            Valor: '',
            Clases: ''
        };

        this.configInputMaterno = {
            ID: '',
            Nombre: '',
            Icono: false,
            Label: 'Apellido Materno',
            Obligatorio: true,
            Placeholder: '',
            SoloLectura: false,
            Deshabilitado: true,
            Valor: '',
            Clases: ''
        };

        this.configInputPuesto = {
            ID: '',
            Nombre: '',
            Icono: false,
            Label: 'Rol',
            Obligatorio: true,
            Placeholder: '',
            SoloLectura: false,
            Deshabilitado: true,
            Valor: '',
            Clases: ''
        };

        this.configInputTipo = {
            ID: '',
            Nombre: '',
            Icono: false,
            Label: 'Tipo',
            Obligatorio: true,
            Placeholder: '',
            SoloLectura: false,
            Deshabilitado: true,
            Valor: '',
            Clases: ''
        };

        this.configInputCantidadEntregas = {
            ID: '',
            Nombre: '',
            Icono: false,
            Label: 'Cantidad de entregas',
            Obligatorio: true,
            Placeholder: '',
            SoloLectura: false,
            Deshabilitado: false,
            Valor: '',
            Clases: ''
        };

        this.configInputCubrioPuesto = {
            ID: '',
            Nombre: '',
            Icono: false,
            Label: 'Cubrio puesto',
            Obligatorio: true,
            Placeholder: '',
            SoloLectura: false,
            Deshabilitado: false,
            Valor: '',
            Clases: ''
        };
  
        this.configBotonRegistrar = {
            ID: '',
            Icono: new Icono(),
            Nombre: '',
            Texto: 'Registrar',
            Deshabilitado: false,
            Mostrar: true,
            Funcion: 'registrar'
        };
    }
}