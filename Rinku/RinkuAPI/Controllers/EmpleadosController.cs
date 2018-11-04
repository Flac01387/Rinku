using RinkuBase.DTO;
using RinkuMN;
using System;
using System.Data.SqlClient;
using System.Web.Http;
using Utilerias.ManejadorErrores;
using Utilerias.ResuestaApi;

namespace RinkuAPI.Controllers
{
    [RoutePrefix("api/empleados")]
    public class EmpleadosController : ApiController
    {
        ManejadorRespuestaAPI mr = new ManejadorRespuestaAPI();
        ManejadorErroresAPI me = new ManejadorErroresAPI();

        [HttpGet]
        [Route("consultar")]
        public IHttpActionResult ConsultarTiposEmpleados()
        {
            try
            {
                EmpleadosMN tiposEmpleados = new EmpleadosMN();

                dynamic resultado = tiposEmpleados.ConsultarTiposEmpleados();

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
        [Route("nuevo")]
        public IHttpActionResult nuevoEmpleado(DTOEmpleados empleado)
        {
            try
            {
                EmpleadosMN tiposEmpleados = new EmpleadosMN();

                dynamic resultado = tiposEmpleados.nuevoEmpleado(empleado);

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