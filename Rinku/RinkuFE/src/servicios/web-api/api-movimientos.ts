import { autoinject } from "aurelia-framework";
import environment from '../../environment';
import { ApiSolicitud } from './api-solicitud';
import { ApiProcesarRespuesta } from './api-procesar-respuesta';

class ApiMovimientosMetodos {

  constructor(private apiBase: string) 
  { 
    this.apiBase = this.apiBase + "{0}";
  };

  registrarMovimiento() {
    return this.apiBase["format"]("registrar");
  };
}

@autoinject
export class ApiMovimientos 
{
  apis: ApiMovimientosMetodos;

  constructor(private api: ApiSolicitud, private procesarRespuesta: ApiProcesarRespuesta) 
  {
    this.apis = new ApiMovimientosMetodos(environment.apiUrl.empleados);
  }

  registrarMovimiento(ID: number): Promise<any>
  {

    var movimiento = {
      "ID": ID,
    };

    var self = this;
    var resultado: any[] = [];
    return new Promise<any>(result => {
      this.api.post(self.apis.registrarMovimiento(), movimiento)
      .then(respuesta => {
          return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
      })
      .catch(error => {
          return result(self.procesarRespuesta.ProcesarError(error, resultado));
      });
    });
  }
}
