import { autoinject } from "aurelia-framework";
import environment from '../../environment';
import { ApiSolicitud } from './api-solicitud';
import { ApiProcesarRespuesta } from './api-procesar-respuesta';

class ApiPuestosMetodos {

  constructor(private apiBase: string) 
  { 
    this.apiBase = this.apiBase + "{0}";
  };

  consultarPuestos() {
    return this.apiBase["format"]("consultar");
  };
}

@autoinject
export class ApiPuestos 
{
  apis: ApiPuestosMetodos;

  constructor(private api: ApiSolicitud, private procesarRespuesta: ApiProcesarRespuesta)
  {
    this.apis = new ApiPuestosMetodos(environment.apiUrl.puestos);
  }

  consultarPuestos(): Promise<any>
  {
    var self = this;
    var resultado: any[] = [];

    return new Promise<any>(result => {
      this.api.get(this.apis.consultarPuestos())
        .then(respuesta => {
          return result(self.procesarRespuesta.ProcesarResultado(respuesta, resultado));
        })
        .catch(error => {
          return result(self.procesarRespuesta.ProcesarError(error, resultado));
        });
    });
  }
}
