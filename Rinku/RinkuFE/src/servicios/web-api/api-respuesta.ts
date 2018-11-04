import { EnumRespuestaAPI } from "../../enumeradores/enum-respuesta-api";

export class ApiRespuesta {

  public ProcesarRespuesta(respuesta): any {
    var resultado;

    switch (respuesta.Codigo) {
      case EnumRespuestaAPI.Aceptado: {
        if (respuesta.Respuesta == null || respuesta.Respuesta.length == 0)
          resultado = { Respuesta: null, Codigo: respuesta.Codigo, Mensaje: 'No hay datos registrados.' };
        else
          resultado = respuesta;
        break;
      }
      case EnumRespuestaAPI.NoEncontrado: {
        resultado = { Respuesta: null, Codigo: respuesta.Codigo, Mensaje: 'La página solicitada no ha sido encontrada.' };
        break;
      }
      case EnumRespuestaAPI.ErrorInterno: {
        resultado = { Respuesta: null, Codigo: respuesta.Codigo, Mensaje: 'Ocurrió algo inesperado.' };
        break;
      }
      case EnumRespuestaAPI.NoSeEncontraronDatos: {
        resultado = { Respuesta: null, Codigo: respuesta.Codigo, Mensaje: respuesta.Mensaje };
        break;
      }
      case EnumRespuestaAPI.ValidacionReglaNegocio: {
        resultado = { Respuesta: null, Codigo: respuesta.Codigo, Mensaje: respuesta.Mensaje };
        break;
      }
      default: {
        resultado = { Respuesta: null, Codigo: EnumRespuestaAPI.NoSeEncontraronDatos, Mensaje: "La api no está configurada" };
        break;
      }
    }

    return resultado;
  }
}
