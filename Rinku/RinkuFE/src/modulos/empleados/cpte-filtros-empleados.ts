import { bindable, bindingMode, autoinject } from 'aurelia-framework';
import { ValidationController } from 'aurelia-validation';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as eventosEmpleados from '../../eventos/eventos-empleados';
import * as EventosControles from '../../eventos/eventos-controles';
import { ConfiguracionInput, EnumTipoInputs } from '../../controles/ctrl-input';
import { ConfiguracionCombo } from '../../controles/ctrl-combo';
import { ConfiguracionRadioVertical, OpcionRadioVertical } from '../../controles/ctrl-radio-vertical';
import { ConfiguracionBoton } from '../../controles/ctrl-boton';
import { CtrlAlerta } from '../../controles/ctrl-alerta';
import { Icono } from '../../controles/icono';
import { ApiPuestos } from '../../servicios/web-api/api-puestos';
import { ApiEmpleados } from '../../servicios/web-api/api-empleados';
import { ApiJornadas } from '../../servicios/web-api/api-jornadas';
import { EnumRespuestaAPI } from '../../enumeradores/enum-respuesta-api';
import { EnumPosiciones } from 'enumeradores/enum-posiciones';
import { EnumMensajes } from 'enumeradores/enum-mensajes';
import { EnumIconos } from 'enumeradores/enum-iconos';
import { EnumColores } from 'enumeradores/enum-colores';
import { EnumVistas } from 'enumeradores/enum-vistas';

@autoinject
export class CpteFiltrosEmpleados 
{
  //Controles utilizados en la pantalla
  configInputNumero: ConfiguracionInput;
  configInputNombre: ConfiguracionInput;
  configInputPaterno: ConfiguracionInput;
  configInputMaterno: ConfiguracionInput;
  configComboPuestos: ConfiguracionCombo;
  opcionesTiposEmpleados: OpcionRadioVertical[];
  configRadioTiposEmpleados: ConfiguracionRadioVertical;
  opcionesJornadas: OpcionRadioVertical[];
  configRadioJornadas: ConfiguracionRadioVertical;
  configBotonBuscar: ConfiguracionBoton;
  configBotonActualizar: ConfiguracionBoton;
  configBotonRegistrar: ConfiguracionBoton;
  configBotonRegresar: ConfiguracionBoton;

  //Subscripciones
  subscribeClickBoton: any;
  subscribeEditarEmpleado: any;
  subscribeClickAccion: any;
  subscribeRegistrarEmpleado: any;

  constructor(private ea: EventAggregator, private peticionPuestos: ApiPuestos, private peticionEmpleados: ApiEmpleados, private peticionJornadas: ApiJornadas)
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

    this.subscribeRegistrarEmpleado = this.ea.subscribe(eventosEmpleados.RegistrarEmpleado, msg => {
      self.inicializarControles();
      self.registrarEmpleado();
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
        case 'regresar':
          self.inicializarControles();
          break;
        case 'registrar':
          self.aceptar();
          break;
      }
    });
  }

  detached() {
    this.subscribeClickBoton.dispose();
    this.subscribeEditarEmpleado.dispose();
    this.subscribeClickAccion.dispose();
  }

  consultarPuestos()
  {
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

  consultarJornadas() {

    var self = this;
    
    this.peticionJornadas.consultarJornadas()
      .then(respuesta => {
        if (respuesta.Codigo == EnumRespuestaAPI.Aceptado) {
          for(var i in respuesta.Respuesta)
          {
            respuesta.Respuesta[i].Valor = respuesta.Respuesta[i].ID;
            respuesta.Respuesta[i].ID = 'tipoJor-'+respuesta.Respuesta[i].ID;
          }
          self.configRadioJornadas.Opciones = respuesta.Respuesta;
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
      self.configComboPuestos.Seleccionado.Valor,
      self.configRadioTiposEmpleados.Seleccionado == null ? 0 : self.configRadioTiposEmpleados.Seleccionado.Valor,
      self.configRadioJornadas.Seleccionado == null ? 0 : self.configRadioJornadas.Seleccionado.Valor,
      true
    )
      .then(respuesta => {
        if (respuesta.Codigo == EnumRespuestaAPI.Aceptado) 
        {
          if(respuesta.Respuesta[0].Id == -1)
            new CtrlAlerta(EnumMensajes.SinDatos);
          else
            self.mostrarListaEmpleados(respuesta.Respuesta);
        }
        else
        new CtrlAlerta(respuesta.Mensaje);
      })
      .catch(error => {
        new CtrlAlerta(EnumMensajes.ErrorAPI);
      });
  }

  actualizar()
  {
    var self = this;

    self.peticionEmpleados.actualizarEmpleado(
      self.configInputNumero.Valor, 
      self.configInputNombre.Valor, 
      self.configInputPaterno.Valor,
      self.configInputMaterno.Valor,
      self.configComboPuestos.Seleccionado.Valor,
      self.configRadioTiposEmpleados.Seleccionado == null ? 0 : self.configRadioTiposEmpleados.Seleccionado.Valor,
      self.configRadioJornadas.Seleccionado == null ? 0 : self.configRadioJornadas.Seleccionado.Valor,
      true
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
      0,
      self.configInputNombre.Valor, 
      self.configInputPaterno.Valor,
      self.configInputMaterno.Valor,
      self.configComboPuestos.Seleccionado.Valor,
      self.configRadioTiposEmpleados.Seleccionado == null ? 0 : self.configRadioTiposEmpleados.Seleccionado.Valor,
      self.configRadioJornadas.Seleccionado == null ? 0 : self.configRadioJornadas.Seleccionado.Valor,
      true
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
      this.configInputNumero.Deshabilitado = true;
      this.configBotonRegresar.Mostrar = true;

      this.peticionEmpleados.consultarEmpleados(this.configInputNumero.Valor, "", "","",-1,-1,-1,true)
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

  registrarEmpleado()
  {
      var self = this;
      
      this.configInputNumero.Deshabilitado = false;
      this.configBotonActualizar.Mostrar = false;
      this.configBotonRegistrar.Mostrar = true;
      this.configBotonBuscar.Mostrar = true;
  }

  llenarFormulario(empleado: any)
  {
    try
    {
      var self = this;

      this.configInputNumero.Deshabilitado = true;
      this.configInputNombre.Valor = empleado.Nombre;
      this.configInputPaterno.Valor = empleado.ApellidoPaterno;
      this.configInputMaterno.Valor = empleado.ApellidoMaterno;
      this.configBotonActualizar.Mostrar = true;
      this.configBotonBuscar.Mostrar = false;
      this.configBotonRegistrar.Mostrar = false;
      this.configComboPuestos.Seleccionado = {"Valor": empleado.PuestoID};

      //Seleccionar combo comboPuestos
      setTimeout(()=>{ 
        var element = document.querySelector("div.input-field select");
        var combo = element as HTMLSelectElement;
        for(var i = 0; i< combo.length; i++)
        {
          if(element[i].value == empleado.PuestoID)
            combo.selectedIndex = i;
        }
      }, 100);

      var opcionSeleccionada = new OpcionRadioVertical();
      opcionSeleccionada.Valor = empleado.PuestoID;
      self.configRadioTiposEmpleados.Seleccionado = opcionSeleccionada;

      //Seleccionar radio
      setTimeout(()=>{ 
        var elements = document.getElementsByName(this.configRadioTiposEmpleados.Grupo);
        for (var i=0; i<elements.length; i++)
        {
          var x = elements[i] as HTMLInputElement;
          if(x.value == empleado.PuestoID)
            x.checked = true;
        }
      }, 150);

      var opcionSeleccionada2 = new OpcionRadioVertical();
      opcionSeleccionada2.Valor = empleado.JornadaID;
      self.configRadioJornadas.Seleccionado = opcionSeleccionada2;
      //Seleccionar radio
      setTimeout(()=>{ 
        var elements = document.getElementsByName(this.configRadioJornadas.Grupo);
        for (var i=0; i<elements.length; i++)
        {
          var x = elements[i] as HTMLInputElement;
          if(x.value == empleado.JornadaID)
            x.checked = true;
        }
      }, 200);

      setTimeout(()=>{ M.updateTextFields(); },250)
    }
    catch(error){
      console.log(error);
    }
  }

  inicializarControles()
  {
    this.consultarPuestos();
    this.consultarTiposEmpleados();
    this.consultarJornadas();
    
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
      Seleccionado: null,
      Mostrar: true
    };
  
    this.opcionesTiposEmpleados = [];
  
    this.configRadioTiposEmpleados = {
      Nombre: 'EmpleadoTipo',
      Label: '',
      Grupo: 'tipo',
      Obligatorio: false,
      Opciones: this.opcionesTiposEmpleados,
      Seleccionado: null
    };
  
    this.opcionesJornadas = [];
  
    this.configRadioJornadas = {
      Nombre: 'EmpleadoTipo',
      Label: '',
      Grupo: 'tiposJornadas',
      Obligatorio: false,
      Opciones: this.opcionesJornadas,
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
  }
}
