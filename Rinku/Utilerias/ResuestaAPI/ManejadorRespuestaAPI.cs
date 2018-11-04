using RinkuAPI.Enumeradores;

namespace Utilerias.ResuestaApi
{
    public class ManejadorRespuestaAPI
    {
        public RespuestaAPI<object> ManejarRespuesta(dynamic respuesta)
        {
            return new RespuestaAPI<object>
            {
                Respuesta = respuesta,
                Codigo = EnumRespuesta.Aceptado
            };
        }
    }
}
