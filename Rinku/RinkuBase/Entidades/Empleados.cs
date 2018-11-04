namespace RinkuBase.Entidades
{
    public class Empleados
    {
        public int ID { get; set; }
        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public int PuestoID { get; set; }
        public int TipoEmpleadoID { get; set; }
        public bool Activo { get; set; }

    }
}
