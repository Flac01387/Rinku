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

  consultarMovimientos() {
    return this.apiBase["format"]("consultar");
  };
}

@autoinject
export class ApiMovimientos 
{
    apis: ApiMovimientosMetodos;

    constructor(private api: ApiSolicitud, private procesarRespuesta: ApiProcesarRespuesta) 
    {
       this.apis = new ApiMovimientosMetodos(environment.apiUrl.movimientos);
    }

    consultarMovimientos(EmpleadoID: number, Fecha: Date, Nombre: string = "", ApellidoPaterno: string = "", ApellidoMaterno: string = "", Actividad: string = "", Cantidad: number = 0, Monto: number = 0, Total: number = 0)
    {
      var movimiento = {
          "EmpleadoID": EmpleadoID,
          "Fecha": Fecha,
          "Nombre": Nombre,
          "ApellidoPaterno": ApellidoPaterno,
          "ApellidoMaterno": ApellidoMaterno,
          "Actividad": Actividad, 
          "Cantidad": Cantidad,
          "Monto": Monto,
          "Total": Total
      };

      var self = this;
      var resultado: any[] = [];
      return new Promise<any>(result => {
          this.api.post(self.apis.consultarMovimientos(), movimiento)
          .then(respuesta => {
              return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
          })
          .catch(error => {
              return result(self.procesarRespuesta.ProcesarError(error, resultado));
          });
      });
    }

    registrarMovimiento(EmpleadoID: number, FechaMovimiento: Date, Entregas: number, PuestoCubrir: number): Promise<any>
    {
        var movimiento = {
            "EmpleadoID": EmpleadoID,
            "FechaMovimiento": FechaMovimiento,
            "Entregas": Entregas,
            "PuestoCubrir":PuestoCubrir
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
