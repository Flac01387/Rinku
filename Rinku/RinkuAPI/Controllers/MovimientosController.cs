using System;
using System.Web.Http;
using RinkuMN;
using Utilerias.ResuestaApi;
using Utilerias.ManejadorErrores;
using System.Data.SqlClient;
using RinkuBase.DTO;

namespace RinkuAPI.Controllers
{
    [RoutePrefix("api/movimientos")]
    public class MovimientosController : ApiController
    {
        ManejadorRespuestaAPI mr = new ManejadorRespuestaAPI();
        ManejadorErroresAPI me = new ManejadorErroresAPI();

        [HttpPost]
        [Route("registrar")]
        public IHttpActionResult registrarMovimiento(DTOMovimientos movimiento)
        {
            try
            {
                MovimientoMN movimientos = new MovimientoMN();

                dynamic resultado = movimientos.registrarMovimiento(movimiento);

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

        [HttpPost]
        [Route("consultar")]
        public IHttpActionResult consultarMovimientos(DTOMovimientosConsulta movimiento)
        {
            try
            {
                MovimientoMN movimientos = new MovimientoMN();

                dynamic resultado = movimientos.consultarMovimientos(movimiento);

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