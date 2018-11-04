import { EnumTipoMensaje } from '../../enumeradores/enum-tipo-mensaje';

export class ApiProcesarRespuesta
{
    public ProcesarResultado(respuesta, resultado): any 
    {
      if (respuesta.Codigo == 200) {
        if (respuesta.Respuesta == null || respuesta.Respuesta.length == 0) {
          respuesta.Respuesta = this.NoHayDatos('No hay datos registrados.');
          resultado = respuesta;
        }
        else
          resultado = respuesta;
      }
      else if (respuesta.Codigo == 503) {
        respuesta.Respuesta = this.NoHayDatos('Ocurrió algo inesperado.');
        resultado = respuesta;
      }
      else {
        resultado = respuesta;
      }
  
      return resultado;
    }

    public ProcesarError(error, resultado)
    {
      error.Respuesta = this.NoHayDatos('Ocurrió algo inesperado.');
      resultado = error;
    }
  
    private NoHayDatos(mensaje): any[] {
      var listaVacia = [];
      var SinDatos = { Id: -1, Nombre: mensaje };
      listaVacia.push(SinDatos);
      return listaVacia;
    }
}