using RinkuAPI.Enumeradores;
using Utilerias.ResuestaApi;

namespace Utilerias.ManejadorErrores
{
    public class ManejadorErroresAPI
    {
        public RespuestaAPI<object> ManejarError(string msg)
        {
            return new RespuestaAPI<object>
            {
                Respuestas = null,
                Respuesta = null,
                Codigo = EnumRespuesta.ErrorInterno,
                Mensaje = $"{msg}"
            };
        }

        public RespuestaAPI<object> ManejarError(ExcepcionNegocio excepcion)
        {
            return new RespuestaAPI<object>
            {
                Respuesta = null,
                Codigo = excepcion.Codigo,
                Mensaje = $"{excepcion.Mensaje ?? excepcion.Message}",
                TiposMensajes = excepcion.Tipos
            };
        }
    }
}
