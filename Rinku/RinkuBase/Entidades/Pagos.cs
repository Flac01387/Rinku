namespace RinkuBase.Entidades
{
    public class Pagos
    {
        public int ID { get; set; }
        public int EmpleadoID { get; set; }
        public double SueldoBase { get; set; }
        public double TotalBruto { get; set; }
        public double TotalNeto { get; set; }
        public string FechaPago { get; set; }
    }
}
