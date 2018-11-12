using RinkuBase.DTO;
using RinkuMN;
using System;
using System.Data.SqlClient;
using System.Web.Http;
using Utilerias.ManejadorErrores;
using Utilerias.ResuestaApi;

namespace RinkuAPI.Controllers
{
    [RoutePrefix("api/nominas")]
    public class NominasController : ApiController
    {
        ManejadorRespuestaAPI mr = new ManejadorRespuestaAPI();
        ManejadorErroresAPI me = new ManejadorErroresAPI();

        [HttpPost]
        [Route("consultar")]
        public IHttpActionResult ConsultaNominas(DTONominas nomina)
        {
            try
            {
                NominasMN nomMN = new NominasMN();

                dynamic resultado = nomMN.ConsultarNominas(nomina);

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