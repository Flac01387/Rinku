import { autoinject } from "aurelia-framework";
import environment from '../../environment';
import { ApiSolicitud } from './api-solicitud';
import { ApiProcesarRespuesta } from './api-procesar-respuesta';

class ApiNominasMetodos {

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
export class ApiNominas
{
    apis: ApiNominasMetodos;

    constructor(private api: ApiSolicitud, private procesarRespuesta: ApiProcesarRespuesta) 
    {
       this.apis = new ApiNominasMetodos(environment.apiUrl.nominas);
    }

    consultarNomina(Fecha: Date, EmpleadoID: number = 0, Nombre: string = "", ApellidoPaterno: string = "", ApellidoMaterno: string = "", SueldoBase: number = 0, TotalBruto: number = 0, TotalNeto: number = 0)
    {
        var nomina = {
            "Fecha": Fecha,
            "EmpleadoID": EmpleadoID,
            "Nombre": Nombre,
            "ApellidoPaterno": ApellidoPaterno,
            "ApellidoMaterno": ApellidoMaterno,
            "SueldoBase": SueldoBase,
            "TotalNeto": TotalNeto,
            "TotalBruto": TotalBruto
        };

        var self = this;
        var resultado: any[] = [];
        return new Promise<any>(result => {
            this.api.post(self.apis.consultarMovimientos(), nomina)
            .then(respuesta => {
                return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
            })
            .catch(error => {
                return result(self.procesarRespuesta.ProcesarError(error, resultado));
            });
        });
    }
}
