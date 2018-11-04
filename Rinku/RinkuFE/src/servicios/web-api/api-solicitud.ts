import { HttpClient, json, RequestInit } from 'aurelia-fetch-client';

export class ApiSolicitud extends HttpClient {
  get(url: string): Promise<any> {
    let self = this;
    return new Promise<any>((res, err) => {
      self.fetch(url)
        .then(respuesta => respuesta.json())
        .then(respuesta => res(respuesta))
        .catch(error => err(error));
    });
  }

  post(url: string, objeto: any): Promise<any> {
    let self = this;
    return new Promise<any>((res, err) => {
      let init: RequestInit = {};
      init.method = "post";
      init.body = json(objeto);

      self.fetch(url, init)
        .then(respuesta => respuesta.json())
        .then(respuesta => res(respuesta))
        .catch(error => err(error));
    });
  }
}
