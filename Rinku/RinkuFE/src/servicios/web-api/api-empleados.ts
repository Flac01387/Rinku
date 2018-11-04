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
      this.api.get(this.apis.consultarTiposEmpleados())
        .then(respuesta => {
            return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
        })
        .catch(error => {
            return result(self.procesarRespuesta.ProcesarError(error, resultado));
        });
    });
  }

  consultarEmpleados(ID: number, Nombre: string, ApellidoPaterno: string, ApellidoMaterno: string, PuestoID: number, TipoEmpleadoID: number, Activo: boolean): Promise<any>
  {

    var filtros = {
      "ID": ID,
      "Nombre": Nombre,
      "ApellidoPaterno": ApellidoPaterno,
      "ApellidoMaterno": ApellidoMaterno,
      "TipoEmpleadoID": TipoEmpleadoID,
      "PuestoID": PuestoID,
      "Activo": Activo
    };

    var self = this;
    var resultado: any[] = [];
    return new Promise<any>(result => {
      this.api.post(this.apis.consultarEmpleados(), filtros)
      .then(respuesta => {
          return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
      })
      .catch(error => {
          return result(self.procesarRespuesta.ProcesarError(error, resultado));
      });
    });
  }

  nuevoEmpleado(Nombre: string, ApellidoPaterno: string, ApellidoMaterno: string, PuestoID: number, TipoEmpleadoID: number): Promise<any>
  {
    var empleado = {
      "Nombre": Nombre,
      "ApellidoPaterno": ApellidoPaterno,
      "ApellidoMaterno": ApellidoMaterno,
      "TipoEmpleadoID": TipoEmpleadoID,
      "PuestoID": PuestoID
    };
    var self = this;
    var resultado: any[] = [];
    return new Promise<any>(result => {
      this.api.post(this.apis.nuevoEmpleado(), empleado)
      .then(respuesta => {
          return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
      })
      .catch(error => {
          return result(self.procesarRespuesta.ProcesarError(error, resultado));
      });
    });
  }
}
