using RinkuAPI.Enumeradores;
using RinkuBase.Entidades;
using RinkuDA;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utilerias.ManejadorErrores;

namespace RinkuMN
{
    public class JornadasMN
    {
        public List<Jornadas> consultarJornadas()
        {
            try
            {
                AccesoDatos da = new AccesoDatos();

                List<Jornadas> jornadas = da.ejecutarSP<Jornadas>("sp_consultarJornadas", null);

                return jornadas;
            }
            catch (SqlException error)
            {
                throw new ArgumentException(error.Message, error);
            }
            catch (ExcepcionNegocio error)
            {
                error.Tipos.Add(EnumTipoMensaje.Alerta);
                throw new ArgumentException(error.Mensaje, error);
            }
            catch (Exception error)
            {
                throw new ArgumentException(error.Message, error);
            }
        }
    }
}
