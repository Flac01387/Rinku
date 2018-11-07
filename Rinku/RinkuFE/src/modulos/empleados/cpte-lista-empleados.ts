import { autoinject, bindable, bindingMode  } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as eventosEmpleados from '../../eventos/eventos-empleados';
import * as EventosControles from '../../eventos/eventos-controles';
import { ConfiguracionBoton } from '../../controles/ctrl-boton';
import { ConfiguracionAlertaConfirmacion } from '../../controles/ctrl-alerta-confirmacion';
import { ConfiguracionTabla, Encabezados, Columnas, EnumTipoColumnas } from '../../controles/ctrl-tabla';
import { ConfiguracionMenuFlotanteHorizontal, ConfiguracionOpcionMenuFlotanteHorizontal } from '../../controles/ctrl-menu-flotante-horizontal';
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
    configBotonNuevoEmpleado: ConfiguracionBoton;
    configTablaEmpleados: ConfiguracionTabla;
    configAlertaEmpleados: ConfiguracionAlertaConfirmacion;

    empleado: any;

    //Subscripciones
    subscribeEnviarListaPacientes: any;
    subscribeClickAccion: any;
    subscribeModalClickAceptar: any;
    subscribeClickBoton: any;

    constructor(private ea: EventAggregator, private peticionEmpleados: ApiEmpleados)
    {
        this.inicializarControles();
    }

    attached()
    {
        var self = this;

        this.subscribeEnviarListaPacientes = this.ea.subscribe(eventosEmpleados.EnviarListaEmpleados, msg => {
            self.mostrarEmpleados(msg.configuracion);
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
                case 'EditarEmpleado':
                    self.empleado = msg.objeto;
                    self.editarEmpleado();
                    break;
            }
        });

        this.subscribeClickBoton = this.ea.subscribe(EventosControles.ClickBoton, msg =>
        {
          var self = this;
        
          switch(msg.funcion)
          {
            case 'nuevoEmpleado':
              self.regresarFiltrosEmpleados();
              break;
          }
        });
    }

    detached() {
        this.subscribeEnviarListaPacientes.dispose();
        this.subscribeClickAccion.dispose();
        this.subscribeModalClickAceptar.dispose();
        this.subscribeClickBoton.dispose();
    }

    confirmarEliminarEmpleado()
    {
        this.ea.publish(new EventosControles.MostrarModal());
    }
    
    mostrarEmpleados(empleados)
    {
        try
        {
            var empleado = [];
        
            var IconoPrincipal: Icono = new Icono(EnumIconos.Opciones, EnumColores.Azul, EnumPosiciones.centro, 'Opciones');
            var Opciones: ConfiguracionOpcionMenuFlotanteHorizontal[] = [];

            Opciones.push(new ConfiguracionOpcionMenuFlotanteHorizontal(new Icono(EnumIconos.Editar, EnumColores.Verde, EnumPosiciones.default, 'Editar'), 'EditarEmpleado'));
            Opciones.push(new ConfiguracionOpcionMenuFlotanteHorizontal(new Icono(EnumIconos.Borrar, EnumColores.Rojo, EnumPosiciones.default, 'Eliminar'), 'EliminarEmpleado'));
        
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
    
    editarEmpleado()
    {
        var self = this;
        
        this.ea.publish(new eventosEmpleados.CambiarVistasEmpleados(EnumVistas.vistaEditarEmpleados));
  
        setTimeout(() => {
            this.ea.publish(new eventosEmpleados.EditarEmpleado(self.empleado.ID.Valor));
        }, 100);
    }

    eliminarEmpleado()
    {
        var self = this;

        var empleado = {
            "ID": this.empleado.ID.Valor,
            "Nombre": "",
            "ApellidoPaterno": "",
            "ApellidoMaterno": "",
            "TipoEmpleadoID": 0,
            "PuestoID": 0,
            "Activo": true
        };
        
        self.peticionEmpleados.eliminarEmpleado(empleado)
        .then(respuesta => 
        {
            if (respuesta.Codigo == EnumRespuestaAPI.Aceptado) 
            {
                new CtrlAlerta("El empleado ha sido dado de baja");
                self.regresarFiltrosEmpleados();
            }
            else
                new CtrlAlerta(respuesta.Mensaje);
        })
        .catch(error => {
            new CtrlAlerta(EnumMensajes.ErrorAPI);
        });
    }

    regresarFiltrosEmpleados()
    {
        this.ea.publish(new eventosEmpleados.CambiarVistasEmpleados(EnumVistas.vistaFiltrosEmpleados));
    }

    inicializarControles()
    {
        this.configBotonNuevoEmpleado = {
            ID: '',
            Icono: new Icono(EnumIconos.Guardar, EnumColores.SinColor, EnumPosiciones.izquierda),
            Nombre: '',
            Texto: 'Nuevo',
            Deshabilitado: false,
            Mostrar: true,
            Funcion: 'nuevoEmpleado'
        };

        this.configAlertaEmpleados = {
            id: 'modalEliminarEmpleado', 
            titulo: 'Empleados',
            mensaje: '¿Desea eliminar al empleado?'
        };
    }
}