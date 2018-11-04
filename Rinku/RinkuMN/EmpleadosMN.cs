﻿using RinkuAPI.Enumeradores;
using RinkuBase.DTO;
using RinkuBase.Entidades;
using RinkuDA;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Utilerias.ManejadorErrores;

namespace RinkuMN
{
    public class EmpleadosMN
    {
        public List<TiposEmpleados> ConsultarTiposEmpleados()
        {
            try
            {
                AccesoDatos da = new AccesoDatos();

                List<TiposEmpleados> tipos = da.ejecutarSP<TiposEmpleados>("sp_consultarTiposEmpleados", null);

                return tipos;
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

        public List<DTOEmpleados> nuevoEmpleado(DTOEmpleados empleado)
        {
            try
            {
                AccesoDatos da = new AccesoDatos();

                List<DTOEmpleados> empleados = da.ejecutarSP<DTOEmpleados>("sp_nuevoEmpleado", empleado);

                return empleados;
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
