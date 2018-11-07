using RinkuBase.DTO;
using RinkuBase.Entidades;
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

        [HttpPost]
        [Route("consultar")]
        public IHttpActionResult ConsultarEmpleados(DTOEmpleados empleado)
        {
            try
            {
                EmpleadosMN empMN = new EmpleadosMN();

                dynamic resultado = empMN.ConsultarEmpleados(empleado);

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

        [HttpGet]
        [Route("consultar/tipos")]
        public IHttpActionResult ConsultarTiposEmpleados()
        {
            try
            {
                EmpleadosMN empMN = new EmpleadosMN();

                dynamic resultado = empMN.ConsultarTiposEmpleados();

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
                EmpleadosMN empMN = new EmpleadosMN();

                dynamic resultado = empMN.nuevoEmpleado(empleado);

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
        [Route("actualizar")]
        public IHttpActionResult ActualizarEmpleado(DTOEmpleados empleado)
        {
            try
            {
                EmpleadosMN empMN = new EmpleadosMN();

                dynamic resultado = empMN.actualizarEmpleado(empleado);

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
        [Route("eliminar")]
        public IHttpActionResult eliminarEmpleado(DTOEmpleados empleado)
        {
            try
            {
                EmpleadosMN empMN = new EmpleadosMN();

                dynamic resultado = empMN.eliminarEmpleado(empleado);

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