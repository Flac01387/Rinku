import { bindable, bindingMode, autoinject } from 'aurelia-framework';
import { ConfiguracionInput } from '../../controles/ctrl-input';
import { ConfiguracionCombo } from '../../controles/ctrl-combo';
import { ConfiguracionRadioVertical, OpcionRadioVertical } from '../../controles/ctrl-radio-vertical';
import { ConfiguracionBoton } from '../../controles/ctrl-boton';
import { ConfiguracionTabla, Encabezados, Columnas, EnumTipoColumnas } from '../../controles/ctrl-tabla';
import { ConfiguracionMenuFlotanteHorizontal } from '../../controles/ctrl-menu-flotante-horizontal';
import { CtrlAlerta } from '../../controles/ctrl-alerta';
import { Icono, EnumTamanosIconos } from '../../controles/icono';
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
  configBotonBuscar: ConfiguracionBoton;
  configBotonAceptar: ConfiguracionBoton;
  configBotonCancelar: ConfiguracionBoton;
  configTablaEmpleados: ConfiguracionTabla;

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

  mostrarEmpleados(empleados)
  {
    try
    {
      var empleado = [];
  
      var IconoPrincipal: Icono = new Icono(EnumIconos.Opciones, EnumColores.Azul, EnumPosiciones.centro, 'Opciones');
      var Opciones: Icono[] = [];
  
      Opciones.push(new Icono(EnumIconos.Opciones, EnumColores.Verde, EnumPosiciones.default, 'Editar'));
      Opciones.push(new Icono(EnumIconos.Opciones, EnumColores.Rojo, EnumPosiciones.default, 'Eliminar'));
  
      var acciones: ConfiguracionMenuFlotanteHorizontal = new ConfiguracionMenuFlotanteHorizontal(IconoPrincipal, Opciones) 
  
      for(var i in empleados)
      {
        empleado.push({
          "ID": new Columnas(empleados[i].ID, EnumTipoColumnas.Entero),
          "Nombre": new Columnas(empleados[i].Nombre, EnumTipoColumnas.Texto),
          "ApellidoPaterno": new Columnas(empleados[i].ApellidoPaterno, EnumTipoColumnas.Texto),
          "ApellidoMaterno": new Columnas(empleados[i].ApellidoMaterno, EnumTipoColumnas.Texto),
          "Puesto": new Columnas(empleados[i].Puesto, EnumTipoColumnas.Texto),
          "TipoEmpleado": new Columnas(empleados[i].TipoEmpleado, EnumTipoColumnas.Texto),
          "Acciones": new Columnas(acciones, EnumTipoColumnas.Acciones)
        });
      }
  
      this.configTablaEmpleados = {
        Encabezados: [
          new Encabezados("ID","ID"),
          new Encabezados("Nombre", "Nombre"),
          new Encabezados("ApellidoPaterno", "Apellido Paterno"),
          new Encabezados("ApellidoMaterno", "Apellido Materno"),
          new Encabezados("Puesto", "Puesto"), 
          new Encabezados("TipoEmpleado","Tipo Empleado"),
          new Encabezados("","")
        ],
        Clases: '',
        ID: '',
        JsonDatos: empleado,
        Nombre: ''
      };
    }
    catch(e){
      new CtrlAlerta("Error al pintar la tabla de empleados");
    }
  }

  cancelar(){
    console.log(this.configRadioTiposEmpleados);
  }

  buscar()
  {
    var self = this.Padre;
    
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
          self.mostrarEmpleados(respuesta.Respuesta);
        }
        else
        new CtrlAlerta(respuesta.Mensaje);
      })
      .catch(error => {
        new CtrlAlerta(EnumMensajes.ErrorAPI);
      });
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
        self.inicializarControles();
      }
      else
        new CtrlAlerta(respuesta.Mensaje, new Icono(EnumIconos.Advertencia, EnumColores.Amarillo));
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

    this.configBotonBuscar = {
      ID: '',
      Icono: new Icono(EnumIconos.Buscar, EnumColores.SinColor, EnumPosiciones.izquierda),
      Nombre: '',
      Texto: 'Buscar',
      Deshabilitado: false,
      Mostrar: true,
      Funcion: 'buscar',
      Padre: this
    };
  
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
  
    this.configBotonCancelar = {
      ID: '',
      Icono: new Icono(),
      Nombre: '',
      Texto: 'Cancelar',
      Deshabilitado: false,
      Mostrar: false,
      Funcion: 'cancelar',
      Padre: this
    };
  }
}
