using System;
using System.Web.Http;
using RinkuMN;
using Utilerias.ResuestaApi;
using Utilerias.ManejadorErrores;
using System.Data.SqlClient;

namespace RinkuAPI.Controllers
{
    [RoutePrefix("api/puestos")]
    public class PuestosController : ApiController
    {
        ManejadorRespuestaAPI mr = new ManejadorRespuestaAPI();
        ManejadorErroresAPI me = new ManejadorErroresAPI();

        [HttpGet]
        [Route("consultar")]
        public IHttpActionResult ConsultarPuestos()
        {
            try
            {
                PuestosMN puestos = new PuestosMN();

                dynamic resultado = puestos.consultarPuestos();

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