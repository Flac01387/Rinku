using RinkuMN;
using System;
using System.Data.SqlClient;
using System.Web.Http;
using Utilerias.ManejadorErrores;
using Utilerias.ResuestaApi;

namespace RinkuAPI.Controllers
{
    [RoutePrefix("api/jornadas")]
    public class JornadasController : ApiController
    {
        ManejadorRespuestaAPI mr = new ManejadorRespuestaAPI();
        ManejadorErroresAPI me = new ManejadorErroresAPI();

        [HttpGet]
        [Route("consultar")]
        public IHttpActionResult ConsultarJornadas()
        {
            try
            {
                JornadasMN jorMN = new JornadasMN();

                dynamic resultado = jorMN.consultarJornadas();

                return Json(mr.ManejarRespuesta(resultado));
            }
            catch (SqlException error)
            {
                throw new ArgumentException(error.Message, error);
            }
            catch (ExcepcionNegocio error)
            {
                return Json(me.ManejarError(error));
            }
            catch (Exception error)
            {
                return Json(me.ManejarError(error.Message));
            }
        }
    }
}