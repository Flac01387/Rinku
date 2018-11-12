using RinkuBase.DTO;
using RinkuDA;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Utilerias.ManejadorErrores;

namespace RinkuMN
{
    public class NominasMN
    {
        public List<DTONominas> ConsultarNominas(DTONominas nomina)
        {
            try
            {
                AccesoDatos da = new AccesoDatos();

                List<DTONominas> nominas = da.ejecutarSP<DTONominas>("sp_consultarNomina", nomina);

                return nominas;
            }
            catch (SqlException error)
            {
                throw new ArgumentException(error.Message, error);
            }
            catch (ExcepcionNegocio error)
            {
                throw new ArgumentException(error.Mensaje, error);
            }
            catch (Exception error)
            {
                throw new ArgumentException(error.Message, error);
            }
        }
    }
}
