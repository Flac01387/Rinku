using RinkuAPI.Enumeradores;
using System;
using System.Collections.Generic;
using System.Text;

namespace Utilerias.ManejadorErrores
{
    public interface IExcepcionNegocio
    {
        EnumRespuesta Codigo { get; set; }
        string Mensaje { get; set; }
    }
}
