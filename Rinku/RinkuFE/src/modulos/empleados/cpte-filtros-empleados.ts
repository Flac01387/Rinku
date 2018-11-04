import { bindable, bindingMode, autoinject } from 'aurelia-framework';
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
  configBotonAceptar: ConfiguracionBoton;
  configBotonCancelar: ConfiguracionBoton;

  constructor(private peticionPuestos: ApiPuestos, private peticionEmpleados: ApiEmpleados)
  {
    this.inicializarControles();
    this.consultarPuestos();
    this.consultarTiposEmpleados();
  }

  consultarPuestos() {

    var self = this;

    this.peticionPuestos.consultarPuestos()
      .then(respuesta => {
        if (respuesta.Codigo == EnumRespuestaAPI.Aceptado) {
          self.configComboPuestos.JsonDatos = respuesta.Respuesta;
        }
        else
        new CtrlAlerta(respuesta.Mensaje);
      })
      .catch(error => {
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
        new CtrlAlerta(EnumMensajes.ErrorAPI);
      });
  }

  cancelar(){
    console.log(this.configRadioTiposEmpleados);
  }

  aceptar(){
    
    var self = this.Padre;

    self.peticionEmpleados.nuevoEmpleado(
      self.configInputNombre.Valor, 
      self.configInputPaterno.Valor,
      self.configInputMaterno.Valor,
      self.configComboPuestos.Seleccionado,
      self.configRadioTiposEmpleados.Seleccionado.Valor
    )
    .then(respuesta => {
      if (respuesta.Codigo == EnumRespuestaAPI.Aceptado) {
        //self.configRadioTiposEmpleados.Opciones = respuesta.Respuesta;
        self.inicializarControles();
      }
      else
        new CtrlAlerta(respuesta.Mensaje);
    })
    .catch(error => {
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
      Deshabilitado: true,
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
      Nombre: '',
      Icono: false,
      Label: 'Puesto',
      Obligatorio: false,
      SoloLectura: false,
      Deshabilitado: false,
      JsonDatos: [],
      UrlDatos: '',
      TextoDefault: 'Seleccione un puesto',
      ValorDefault: -1,
      Valor: -1
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
  
    this.configBotonAceptar = {
      ID: '',
      Icono: new Icono(EnumIconos.Guardar, EnumColores.SinColor, EnumPosiciones.izquierda),
      Nombre: '',
      Texto: 'Aceptar',
      Deshabilitado: false,
      Funcion: 'aceptar',
      Padre: this
    };
  
    this.configBotonCancelar = {
      ID: '',
      Icono: new Icono(),
      Nombre: '',
      Texto: 'Cancelar',
      Deshabilitado: false,
      Funcion: 'cancelar',
      Padre: this
    };
  }
}
