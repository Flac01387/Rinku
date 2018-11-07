import { autoinject } from "aurelia-framework";
import environment from '../../environment';
import { ApiSolicitud } from './api-solicitud';
import { ApiProcesarRespuesta } from './api-procesar-respuesta';

class ApiJornadasMetodos {

  constructor(private apiBase: string) 
  { 
    this.apiBase = this.apiBase + "{0}";
  };

  consultarJornadas() {
    return this.apiBase["format"]("consultar");
  };
}

@autoinject
export class ApiJornadas 
{
  apis: ApiJornadasMetodos;

  constructor(private api: ApiSolicitud, private procesarRespuesta: ApiProcesarRespuesta) 
  {
    this.apis = new ApiJornadasMetodos(environment.apiUrl.jornadas);
  }

  consultarJornadas(): Promise<any>
  {
    var self = this;
    var resultado: any[] = [];
    return new Promise<any>(result => {
      this.api.get(self.apis.consultarJornadas())
        .then(respuesta => {
            return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
        })
        .catch(error => {
            return result(self.procesarRespuesta.ProcesarError(error, resultado));
        });
    });
  }
}
