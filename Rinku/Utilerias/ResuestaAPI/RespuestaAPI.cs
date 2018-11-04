using RinkuAPI.Enumeradores;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace Utilerias.ResuestaApi
{
    public class RespuestaAPI<T>
    {
        public List<T> Respuestas { get; set; }
        public T Respuesta { get; set; }
        public EnumRespuesta Codigo { get; set; }
        public string Mensaje { get; set; }
        public List<EnumTipoMensaje> TiposMensajes { get; set; }
    }
    /// <summary>
    /// Esta clase se usa en peticiones web a otros servicios REST que no pertenecen al His
    /// </summary>
    public class RespuestaHttp
    {
        public string Respuesta { get; set; }
        public HttpStatusCode HttpStatus { get; set; }
        public WebExceptionStatus WebExceptionStatus { get; set; }
        public string CodigoDescripcion { get; set; }
    }
}
