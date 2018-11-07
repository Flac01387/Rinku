import { autoinject } from "aurelia-framework";
import environment from '../../environment';
import { ApiSolicitud } from './api-solicitud';
import { ApiProcesarRespuesta } from './api-procesar-respuesta';

class ApiEmpleadosMetodos {

  constructor(private apiBase: string) 
  { 
    this.apiBase = this.apiBase + "{0}";
  };

  consultarTiposEmpleados() {
    return this.apiBase["format"]("consultar/tipos");
  };

  consultarEmpleados() {
    return this.apiBase["format"]("consultar");
  };

  nuevoEmpleado() {
    return this.apiBase["format"]("nuevo");
  }

  actualizarEmpleado() {
    return this.apiBase["format"]("actualizar");
  }

  eliminarEmpleado() {
    return this.apiBase["format"]("eliminar");
  }
}

@autoinject
export class ApiEmpleados 
{
  apis: ApiEmpleadosMetodos;

  constructor(private api: ApiSolicitud, private procesarRespuesta: ApiProcesarRespuesta) 
  {
    this.apis = new ApiEmpleadosMetodos(environment.apiUrl.empleados);
  }

  consultarTiposEmpleados(): Promise<any>
  {
    var self = this;
    var resultado: any[] = [];
    return new Promise<any>(result => {
      this.api.get(self.apis.consultarTiposEmpleados())
        .then(respuesta => {
            return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
        })
        .catch(error => {
            return result(self.procesarRespuesta.ProcesarError(error, resultado));
        });
    });
  }

  consultarEmpleados(ID: number, Nombre: string, ApellidoPaterno: string, ApellidoMaterno: string, PuestoID: number, TipoEmpleadoID: number, JornadaID: number, Activo: boolean): Promise<any>
  {

    var filtros = {
      "ID": ID,
      "Nombre": Nombre,
      "ApellidoPaterno": ApellidoPaterno,
      "ApellidoMaterno": ApellidoMaterno,
      "TipoEmpleadoID": TipoEmpleadoID,
      "PuestoID": PuestoID,
      "JornadaID": JornadaID,
      "Activo": Activo
    };

    var self = this;
    var resultado: any[] = [];
    return new Promise<any>(result => {
      this.api.post(self.apis.consultarEmpleados(), filtros)
      .then(respuesta => {
          return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
      })
      .catch(error => {
          return result(self.procesarRespuesta.ProcesarError(error, resultado));
      });
    });
  }

  actualizarEmpleado(ID: number, Nombre: string, ApellidoPaterno: string, ApellidoMaterno: string, PuestoID: number, TipoEmpleadoID: number, JornadaID: number, Activo: boolean): Promise<any>
  {

    var empleado = {
      "ID": ID,
      "Nombre": Nombre,
      "ApellidoPaterno": ApellidoPaterno,
      "ApellidoMaterno": ApellidoMaterno,
      "TipoEmpleadoID": TipoEmpleadoID,
      "PuestoID": PuestoID,
      "JornadaID": JornadaID,
      "Activo": Activo
    };

    var self = this;
    var resultado: any[] = [];
    return new Promise<any>(result => {
      this.api.post(self.apis.actualizarEmpleado(), empleado)
      .then(respuesta => {
          return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
      })
      .catch(error => {
          return result(self.procesarRespuesta.ProcesarError(error, resultado));
      });
    });
  }

  nuevoEmpleado(ID: number, Nombre: string, ApellidoPaterno: string, ApellidoMaterno: string, PuestoID: number, TipoEmpleadoID: number, JornadaID: number, Activo: boolean): Promise<any>
  {
    var empleado = {
      "ID": ID,
      "Nombre": Nombre,
      "ApellidoPaterno": ApellidoPaterno,
      "ApellidoMaterno": ApellidoMaterno,
      "TipoEmpleadoID": TipoEmpleadoID,
      "PuestoID": PuestoID,
      "JornadaID": JornadaID,
      "Activo": Activo
    };
    var self = this;
    var resultado: any[] = [];
    return new Promise<any>(result => {
      this.api.post(self.apis.nuevoEmpleado(), empleado)
      .then(respuesta => {
          return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
      })
      .catch(error => {
          return result(self.procesarRespuesta.ProcesarError(error, resultado));
      });
    });
  }

  eliminarEmpleado(empleado: any): Promise<any>
  {
    var self = this;
    var resultado: any[] = [];
    return new Promise<any>(result => {
      this.api.post(self.apis.eliminarEmpleado(), empleado)
      .then(respuesta => {
          return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
      })
      .catch(error => {
          return result(self.procesarRespuesta.ProcesarError(error, resultado));
      });
    });
  }
}
