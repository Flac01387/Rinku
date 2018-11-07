import { bindable, bindingMode, autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as eventosEmpleados from '../../eventos/eventos-empleados';
import * as EventosControles from '../../eventos/eventos-controles';
import { ConfiguracionInput } from '../../controles/ctrl-input';
import { ConfiguracionCombo } from '../../controles/ctrl-combo';
import { ConfiguracionRadioVertical, OpcionRadioVertical } from '../../controles/ctrl-radio-vertical';
import { ConfiguracionBoton } from '../../controles/ctrl-boton';
import { CtrlAlerta } from '../../controles/ctrl-alerta';
import { Icono } from '../../controles/icono';
import { ApiPuestos } from '../../servicios/web-api/api-puestos';
import { ApiEmpleados } from '../../servicios/web-api/api-empleados';
import { EnumRespuestaAPI } from '../../enumeradores/enum-respuesta-api';
import { EnumPosiciones } from 'enumeradores/enum-posiciones';
import { EnumMensajes } from 'enumeradores/enum-mensajes';
import { EnumIconos } from 'enumeradores/enum-iconos';
import { EnumColores } from 'enumeradores/enum-colores';
import { EnumVistas } from 'enumeradores/enum-vistas';

@autoinject
export class CpteFiltrosEmpleados {
  
  Padre: any = null;

  //Controles utilizados en la pantalla
  configInputNumero: ConfiguracionInput;
  configInputNombre: ConfiguracionInput;
  configInputPaterno: ConfiguracionInput;
  configInputMaterno: ConfiguracionInput;
  configComboPuestos: ConfiguracionCombo;
  opcionesTiposEmpleados: OpcionRadioVertical[];
  configRadioTiposEmpleados: ConfiguracionRadioVertical;
  configBotonBuscar: ConfiguracionBoton;
  configBotonCancelar: ConfiguracionBoton;
  configBotonActualizar: ConfiguracionBoton;
  configBotonRegistrar: ConfiguracionBoton;

  //Subscripciones
  subscribeClickBoton: any;
  subscribeEditarEmpleado: any;
  subscribeClickAccion: any;

  constructor(private ea: EventAggregator, private peticionPuestos: ApiPuestos, private peticionEmpleados: ApiEmpleados)
  {
    this.inicializarControles();
  }

  attached() 
  {
    var self = this;

    this.subscribeEditarEmpleado = this.ea.subscribe(eventosEmpleados.EditarEmpleado, msg => {
      self.inicializarControles();
      self.editarEmpleado(msg.empleadoID);
    });

    this.subscribeClickAccion = this.ea.subscribe(EventosControles.ClickAccion, msg => 
    {
      switch(msg.opc)
      {
        case 'EditarEmpleado':
          self.editarEmpleado(msg.objeto);
          break;
      }
    });

    this.subscribeClickBoton = this.ea.subscribe(EventosControles.ClickBoton, msg =>
    {
      var self = this;
    
      switch(msg.funcion)
      {
        case 'buscar':
          self.buscar();
          break;
        case 'actualizar':
          self.actualizar();
          break;
        case 'cancelar':
          self.inicializarControles();
          break;
      }
    });
  }

  detached() {
    this.subscribeClickBoton.dispose();
    this.subscribeEditarEmpleado.dispose();
    this.subscribeClickAccion.dispose();
  }

  consultarPuestos() {

    var self = this;

    this.peticionPuestos.consultarPuestos()
      .then(respuesta => {
        if (respuesta.Codigo == EnumRespuestaAPI.Aceptado) {

          for(var i in respuesta.Respuesta)
            respuesta.Respuesta[i].Valor = respuesta.Respuesta[i].ID;

          self.configComboPuestos.JsonDatos = respuesta.Respuesta;

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

  consultarTiposEmpleados() {

    var self = this;
    
    this.peticionEmpleados.consultarTiposEmpleados()
      .then(respuesta => {
        if (respuesta.Codigo == EnumRespuestaAPI.Aceptado) {
          for(var i in respuesta.Respuesta)
          {
            respuesta.Respuesta[i].Valor = respuesta.Respuesta[i].ID;
            respuesta.Respuesta[i].ID = 'tipoEmp-'+respuesta.Respuesta[i].ID;
          }
          self.configRadioTiposEmpleados.Opciones = respuesta.Respuesta;
        }
        else
        new CtrlAlerta(respuesta.Mensaje);
      })
      .catch(error => {
        console.log(EnumMensajes.ErrorAPI);
        new CtrlAlerta(EnumMensajes.ErrorAPI);
      });
  }
  
  mostrarListaEmpleados(empleados)
  {
    try
    {
      this.ea.publish(new eventosEmpleados.CambiarVistasEmpleados(EnumVistas.vistaListaEmpleados));

      setTimeout(() => {
        this.ea.publish(new eventosEmpleados.EnviarListaEmpleados(empleados));
      }, 100);
    }
    catch(e){
      new CtrlAlerta("Error al pintar la tabla de empleados");
    }
  }

  buscar()
  {
    var self = this;
    
    self.peticionEmpleados.consultarEmpleados(
      self.configInputNumero.Valor, 
      self.configInputNombre.Valor, 
      self.configInputPaterno.Valor,
      self.configInputMaterno.Valor,
      self.configComboPuestos.Seleccionado,
      self.configRadioTiposEmpleados.Seleccionado == null ? 0 : self.configRadioTiposEmpleados.Seleccionado.Valor,
      true
    )
      .then(respuesta => {
        if (respuesta.Codigo == EnumRespuestaAPI.Aceptado) 
        {
          self.mostrarListaEmpleados(respuesta.Respuesta);
        }
        else
        new CtrlAlerta(respuesta.Mensaje);
      })
      .catch(error => {
        console.log(EnumMensajes.ErrorAPI);
        new CtrlAlerta(EnumMensajes.ErrorAPI);
      });
  }

  actualizar()
  {
    var self = this;

    self.peticionEmpleados.nuevoEmpleado(
      self.configInputNombre.Valor, 
      self.configInputPaterno.Valor,
      self.configInputMaterno.Valor,
      self.configComboPuestos.Seleccionado,
      self.configRadioTiposEmpleados.Seleccionado.Valor
    )
    .then(respuesta => {
      if (respuesta.Codigo == EnumRespuestaAPI.Aceptado) {
        new CtrlAlerta("Empleado actualizado correctamente");
      }
      else
        new CtrlAlerta(respuesta.Mensaje, new Icono(EnumIconos.Advertencia, EnumColores.Amarillo));
    })
    .catch(error => {
      console.log(EnumMensajes.ErrorAPI);
      new CtrlAlerta(EnumMensajes.ErrorAPI);
    });
  }

  aceptar(){

    var self = this;

    self.peticionEmpleados.nuevoEmpleado(
      self.configInputNombre.Valor, 
      self.configInputPaterno.Valor,
      self.configInputMaterno.Valor,
      self.configComboPuestos.Seleccionado,
      self.configRadioTiposEmpleados.Seleccionado.Valor
    )
    .then(respuesta => {
      if (respuesta.Codigo == EnumRespuestaAPI.Aceptado) {
        new CtrlAlerta("Empleado registrado correctamente");
        self.inicializarControles();
      }
      else
        new CtrlAlerta(respuesta.Mensaje, new Icono(EnumIconos.Advertencia, EnumColores.Amarillo));
    })
    .catch(error => {
      console.log(EnumMensajes.ErrorAPI);
      new CtrlAlerta(EnumMensajes.ErrorAPI);
    });
  }

  editarEmpleado(empleado)
  {
      var self = this;

      this.configInputNumero.Valor = empleado;

      this.peticionEmpleados.consultarEmpleados(this.configInputNumero.Valor, "", "","",-1,-1,true)
      .then(respuesta =>
      {
        if (respuesta.Codigo == EnumRespuestaAPI.Aceptado) 
        {
          self.llenarFormulario(respuesta.Respuesta[0]);
        }
        else
        new CtrlAlerta(respuesta.Mensaje);
      })
      .catch(error => {
        console.log(EnumMensajes.ErrorAPI);
        new CtrlAlerta(EnumMensajes.ErrorAPI);
      });
  }

  llenarFormulario(empleado: any)
  {
    try
    {
      this.configInputNumero.Deshabilitado = true;
      this.configInputNombre.Valor = empleado.Nombre;
      this.configInputPaterno.Valor = empleado.ApellidoPaterno;
      this.configInputMaterno.Valor = empleado.ApellidoMaterno;
      this.configBotonActualizar.Mostrar = true;
      this.configBotonCancelar.Mostrar = true;
      this.configBotonBuscar.Mostrar = false;
      this.configComboPuestos.Seleccionado;

      //Seleccionar combo comboPuestos
      var element = document.querySelector("div.input-field select");
      console.log(element);
      
      var combo = element as HTMLSelectElement;

      for(var i = 0; i< combo.length; i++)
      {
        if(element[i].value == empleado.PuestoID)
          combo.selectedIndex = i;
      }

      //Seleccionar radio
      var elements = document.getElementsByName(this.configRadioTiposEmpleados.Grupo);
      for (var i=0; i<elements.length; i++)
      {
        var x = elements[i] as HTMLInputElement;
        if(x.value == empleado.PuestoID)
          x.checked = true;
      }
    }
    catch(error){
      console.log(error);
    }
  }

  inicializarControles()
  {
    this.consultarPuestos();
    this.consultarTiposEmpleados();

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
      Clases: ''
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
      Deshabilitado: false,
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
      Deshabilitado: false,
      Valor: '',
      Clases: ''
    };

    this.configComboPuestos = {
      ID: '',
      Nombre: 'comboPuestos',
      Icono: false,
      Label: 'Puesto',
      Obligatorio: false,
      SoloLectura: false,
      Deshabilitado: false,
      JsonDatos: [],
      UrlDatos: '',
      TextoDefault: 'Seleccione un puesto',
      ValorDefault: -1,
      Valor: null,
      Seleccionado: null
    };
  
    this.opcionesTiposEmpleados = [];
  
    this.configRadioTiposEmpleados = {
      Nombre: 'tipoEmpleado',
      Label: '',
      Grupo: 'tipo',
      Obligatorio: false,
      Opciones: this.opcionesTiposEmpleados,
      Seleccionado: null
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

    this.configBotonCancelar = {
      ID: '',
      Icono: new Icono(),
      Nombre: '',
      Texto: 'Cancelar',
      Deshabilitado: false,
      Mostrar: false,
      Funcion: 'cancelar'
    };
  
    this.configBotonActualizar = {
      ID: '',
      Icono: new Icono(),
      Nombre: '',
      Texto: 'Actualizar',
      Deshabilitado: false,
      Mostrar: false,
      Funcion: 'actualizar'
    };
  
    this.configBotonRegistrar = {
      ID: '',
      Icono: new Icono(),
      Nombre: '',
      Texto: 'Registrar',
      Deshabilitado: false,
      Mostrar: false,
      Funcion: 'registrar'
    };
  }
}
