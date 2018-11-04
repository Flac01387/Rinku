using System;
using RinkuBase;
using RinkuDA;
using System.Collections.Generic;
using Utilerias.ManejadorErrores;
using System.Data.SqlClient;

namespace RinkuMN
{
    public class PuestosMN
    {
        public List<Puestos> consultarPuestos()
        {
            try
            {
                AccesoDatos da = new AccesoDatos();

                List<Puestos> puestos = da.ejecutarSP<Puestos>("sp_consultarPuestos", null);

                return puestos;
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
