using RinkuAPI.Enumeradores;
using System;
using System.Collections.Generic;

namespace Utilerias.ManejadorErrores
{
    [Serializable]
    public class ExcepcionNegocio : Exception, IExcepcionNegocio
    {
        public EnumRespuesta Codigo { get; set; }
        public string Mensaje { get; set; }
        public List<EnumTipoMensaje> Tipos { get; set; }
        public ExcepcionNegocio() : base() { }
        public ExcepcionNegocio(string mensaje) : base(mensaje)
        {
            this.Mensaje = mensaje;
        }
        public ExcepcionNegocio(string mensaje, EnumRespuesta codigo)
        {
            this.Mensaje = mensaje;
            this.Codigo = codigo;
        }
        public ExcepcionNegocio(string mensaje, EnumRespuesta codigo, List<EnumTipoMensaje> tipos)
        {
            this.Mensaje = mensaje;
            this.Codigo = codigo;
            this.Tipos = tipos;
        }
        public ExcepcionNegocio(string mensaje, Exception innerException) : base(mensaje, innerException) { }
    }

    public class ExcepcionNegocio<T> : ExcepcionNegocio
    {
        public ExcepcionNegocio(T objeto)
        {
            this.Objeto = objeto;
        }

        public ExcepcionNegocio(string mensaje, T objeto) : base(mensaje)
        {
            this.Objeto = objeto;
        }

        public ExcepcionNegocio(string mensaje, T objeto, Exception innerException) : base(mensaje, innerException)
        {
            this.Objeto = objeto;
        }

        public ExcepcionNegocio(string mensaje, T objeto, EnumRespuesta codigo) : base(mensaje, codigo)
        {
            this.Objeto = objeto;
        }

        public T Objeto { get; set; }
    }
}
