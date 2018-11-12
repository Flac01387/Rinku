using RinkuBase.DTO;
using RinkuBase.Entidades;
using RinkuDA;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Utilerias.ManejadorErrores;

namespace RinkuMN
{
    public class MovimientoMN
    {
        public List<DTOMovimientos> registrarMovimiento(DTOMovimientos movimiento)
        {
            try
            {
                AccesoDatos da = new AccesoDatos();

                List<DTOMovimientos> movimientos = da.ejecutarSP<DTOMovimientos>("sp_registrarMovimientos", movimiento);

                Pagos pago = new Pagos();
                pago.EmpleadoID = movimiento.EmpleadoID;
                pago.FechaPago = movimiento.FechaMovimiento;

                List<Pagos> pagos = da.ejecutarSP<Pagos>("sp_calcularSalario", pago);

                return movimientos;
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

        public List<DTOMovimientosConsulta> consultarMovimientos(DTOMovimientosConsulta movimiento)
        {
            try
            {
                AccesoDatos da = new AccesoDatos();

                List<DTOMovimientosConsulta> movimientos = da.ejecutarSP<DTOMovimientosConsulta>("sp_consultarMovimientos", movimiento);

                return movimientos;
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
