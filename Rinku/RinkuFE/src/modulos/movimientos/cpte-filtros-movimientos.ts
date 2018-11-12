import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as EventosEmpleados from '../../eventos/eventos-empleados';
import * as EventosControles from '../../eventos/eventos-controles';
import * as EventosMovimientos from '../../eventos/eventos-movimientos';
import * as EventosMenu from '../../eventos/eventos-menu';
import { Icono } from '../../controles/icono';
import { CtrlAlerta } from '../../controles/ctrl-alerta';
import { ConfiguracionInput, EnumTipoInputs } from '../../controles/ctrl-input';
import { ConfiguracionBoton } from '../../controles/ctrl-boton';
import { ConfiguracionFecha } from '../../controles/ctrl-fecha';
import { ConfiguracionCombo } from '../../controles/ctrl-combo';
import { EnumRespuestaAPI } from '../../enumeradores/enum-respuesta-api';
import { EnumMensajes } from 'enumeradores/enum-mensajes';
import { EnumIconos } from 'enumeradores/enum-iconos';
import { EnumColores } from 'enumeradores/enum-colores';
import { EnumPosiciones } from 'enumeradores/enum-posiciones';
import { EnumVistas } from 'enumeradores/enum-vistas';
import { ApiMovimientos } from '../../servicios/web-api/api-movimientos';
import { ApiPuestos } from '../../servicios/web-api/api-puestos';

@autoinject
export class CpteFiltrosMovimientos
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
    configComboCubrirPuesto: ConfiguracionCombo;
    configBotonRegistrar: ConfiguracionBoton;
    configBotonBuscar: ConfiguracionBoton;
    configBotonRegresar: ConfiguracionBoton;
    configBotonNuevo: ConfiguracionBoton;
    configBotonGuardar: ConfiguracionBoton;

    //Subscripciones
    subscribeRegistrarMovimiento: any;
    subscribeClickBoton: any;

    constructor(private ea: EventAggregator, private peticionMovimientos: ApiMovimientos, private peticionPuestos: ApiPuestos)
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
                    self.registrar();
                    break;
                case 'guardar':
                    self.guardar();
                    break;
                case 'buscar':
                    self.buscar();
                    break;
                case 'regresar':
                    self.regresar();
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
        this.configInputTipo.Valor = empleado.EmpleadoTipo.Valor;
        this.configInputNumero.Deshabilitado = true;
        this.configInputNombre.Deshabilitado = true;
        this.configInputPaterno.Deshabilitado = true;
        this.configInputMaterno.Deshabilitado = true;
        this.configInputPuesto.Deshabilitado = true;
        this.configInputTipo.Deshabilitado = true;
        this.configInputCantidadEntregas.Mostrar = true;
        this.configInputPuesto.Mostrar = true;
        this.configInputTipo.Mostrar = true;
        this.configComboCubrirPuesto.Mostrar = true;
        this.configBotonRegistrar.Mostrar = false;
        this.configBotonBuscar.Mostrar = false;
        this.configBotonNuevo.Mostrar = false;
        this.configBotonRegresar.Mostrar = true;
        this.configBotonGuardar.Mostrar = true;

        this.puestosCubrir(this.configInputNumero.Valor);

        setTimeout(()=>{M.updateTextFields();},100)
    }

    regresar()
    {
        this.ea.publish(new EventosMovimientos.CambiarVistasMovimientos(EnumVistas.vistaFiltrosMovimientos));
    }

    registrar()
    {
        this.ea.publish(new EventosMenu.CambiarModulo('empleados'));

        setTimeout(() => {
            this.ea.publish(new EventosEmpleados.CambiarVistasEmpleados(EnumVistas.vistaFiltrosEmpleados));
        }, 100);
    }

    buscar()
    {
        var self = this;
    
        this.peticionMovimientos.consultarMovimientos(
            this.configInputNumero.Valor, 
            new Date(this.configFechaRegistro.Valor), 
            this.configInputNombre.Valor,
            this.configInputPaterno.Valor,
            this.configInputMaterno.Valor
        )
        .then(respuesta => {
            if (respuesta.Codigo == EnumRespuestaAPI.Aceptado)
            {
                if(respuesta.Respuesta[0].Id == -1)
                {
                    new CtrlAlerta(respuesta.Respuesta[0].Nombre);
                }
                else{
                    self.mostrarListaMovimientos(respuesta.Respuesta);
                }
            }
            else
                new CtrlAlerta(respuesta.Mensaje);
        })
        .catch(error => {
            new CtrlAlerta(EnumMensajes.ErrorAPI);
        });
    }

    guardar()
    {
        var self = this;
    
        this.peticionMovimientos.registrarMovimiento(
            this.configInputNumero.Valor, 
            new Date(this.configFechaRegistro.Valor), 
            this.configInputCantidadEntregas.Valor == "" ? 0 : this.configInputCantidadEntregas.Valor, 
            this.configComboCubrirPuesto.Seleccionado.Valor,
        )
        .then(respuesta => {
            if (respuesta.Codigo == EnumRespuestaAPI.Aceptado)
            {
                new CtrlAlerta("Se registró correctamente el movimiento");
                this.buscar();
            }
            else
                new CtrlAlerta(respuesta.Mensaje);
        })
        .catch(error => {
            console.log(EnumMensajes.ErrorAPI);
            new CtrlAlerta(EnumMensajes.ErrorAPI);
        });
    }
  
    mostrarListaMovimientos(movimientos: any)
    {
        this.ea.publish(new EventosMovimientos.CambiarVistasMovimientos(EnumVistas.vistaListaMovimientos));

        setTimeout(() => {
            this.ea.publish(new EventosMovimientos.EnviarListaMovimientos(movimientos));
        }, 100);
    }

    puestosCubrir(empleadoID: number)
    {
        var self = this;
        this.peticionPuestos.consultarPuestosCubrir(empleadoID)
        .then(respuesta => {
            if (respuesta.Codigo == EnumRespuestaAPI.Aceptado)
            {
                for(var i in respuesta.Respuesta)
                    respuesta.Respuesta[i].Valor = respuesta.Respuesta[i].ID;
                self.configComboCubrirPuesto.Label = "Cubrió puesto";
                self.configComboCubrirPuesto.TextoDefault = "Seleccione puesto cubierto";
                self.configComboCubrirPuesto.ValorDefault = -1;
                self.configComboCubrirPuesto.Deshabilitado = respuesta.Respuesta.length > 0 ? false : true;
                self.configComboCubrirPuesto.JsonDatos = respuesta.Respuesta;
                
                setTimeout(() => {
                    var element = document.querySelector("div.input-field select");
                    M.FormSelect.init(element);
                }, 100);
            }
            else
                new CtrlAlerta(respuesta.Mensaje);
        })
        .catch(error => {
            console.log(EnumMensajes.ErrorAPI);
            new CtrlAlerta(EnumMensajes.ErrorAPI);
        });
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
            Deshabilitado: false,
            Valor: '',
            Clases: '',
            Mostrar: true,
            Tipo: EnumTipoInputs.numerico,
            MaxLength: 8
        };
        
        this.configFechaRegistro = {
            ID: '',
            Nombre: '',
            Icono: true,
            Label: 'Fecha movimiento',
            Obligatorio: false,
            SoloLectura: false,
            Deshabilitado: false,
            Valor: new Date(),
            Clases: '',
            FechaMin: new Date(new Date().setMonth(new Date().getMonth()-12)),
            FechaMax: new Date()
        };

        this.configInputNombre = {
            ID: '',
            Nombre: '',
            Icono: false,
            Label: 'Nombre',
            Obligatorio: true,
            Placeholder: '',
            SoloLectura: false,
            Deshabilitado: false,
            Valor: '',
            Clases: '',
            Mostrar: true,
            Tipo: EnumTipoInputs.texto,
            MaxLength: 100
        };
        
        this.configInputPaterno = {
            ID: '',
            Nombre: '',
            Icono: false,
            Label: 'Apellido paterno',
            Obligatorio: true,
            Placeholder: '',
            SoloLectura: false,
            Deshabilitado: false,
            Valor: '',
            Clases: '',
            Mostrar: true,
            Tipo: EnumTipoInputs.texto,
            MaxLength: 100
        };

        this.configInputMaterno = {
            ID: '',
            Nombre: '',
            Icono: false,
            Label: 'Apellido Materno',
            Obligatorio: true,
            Placeholder: '',
            SoloLectura: false,
            Deshabilitado: false,
            Valor: '',
            Clases: '',
            Mostrar: true,
            Tipo: EnumTipoInputs.texto,
            MaxLength: 100
        };

        this.configInputPuesto = {
            ID: '',
            Nombre: '',
            Icono: false,
            Label: 'Puesto',
            Obligatorio: true,
            Placeholder: '',
            SoloLectura: false,
            Deshabilitado: false,
            Valor: '',
            Clases: '',
            Mostrar: false,
            Tipo: EnumTipoInputs.texto,
            MaxLength: 100
        };

        this.configInputTipo = {
            ID: '',
            Nombre: '',
            Icono: false,
            Label: 'Tipo',
            Obligatorio: true,
            Placeholder: '',
            SoloLectura: false,
            Deshabilitado: false,
            Valor: '',
            Clases: '',
            Mostrar: false,
            Tipo: EnumTipoInputs.texto,
            MaxLength: 100
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
            Clases: '',
            Mostrar: false,
            Tipo: EnumTipoInputs.texto,
            MaxLength: 100
        };

        this.configComboCubrirPuesto = {
            ID: '',
            Nombre: 'comboCubrirPuestos',
            Icono: false,
            Label: 'Puesto',
            Obligatorio: false,
            SoloLectura: false,
            Deshabilitado: false,
            JsonDatos: [],
            UrlDatos: '',
            TextoDefault: 'Cubrió puesto',
            ValorDefault: -1,
            Valor: null,
            Seleccionado: null,
            Mostrar: false
        };
  
        this.configBotonRegistrar = {
            ID: '',
            Icono:  new Icono(),
            Nombre: '',
            Texto: 'Registrar',
            Deshabilitado: false,
            Mostrar: true,
            Funcion: 'registrar'
        };
  
        this.configBotonRegresar = {
            ID: '',
            Icono: new Icono(),
            Nombre: '',
            Texto: 'Regresar',
            Deshabilitado: false,
            Mostrar: false,
            Funcion: 'regresar'
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
  
        this.configBotonNuevo = {
            ID: '',
            Icono: new Icono(),
            Nombre: '',
            Texto: 'Nuevo',
            Deshabilitado: false,
            Mostrar: false,
            Funcion: 'nuevo'
        };
  
        this.configBotonGuardar = {
            ID: '',
            Icono: new Icono(),
            Nombre: '',
            Texto: 'Guardar',
            Deshabilitado: false,
            Mostrar: false,
            Funcion: 'guardar'
        };
    }
}