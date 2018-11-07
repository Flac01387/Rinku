namespace RinkuBase.DTO
{
    public class DTOEmpleados
    {
        public int ID { get; set; }
        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public int PuestoID { get; set; }
        public string Puesto { get; set; }
        public int TipoEmpleadoID { get; set; }
        public string TipoEmpleado { get; set; }
        public int JornadaID { get; set; }
        public string Jornada { get; set; }
        public bool Activo { get; set; }
    }
}
