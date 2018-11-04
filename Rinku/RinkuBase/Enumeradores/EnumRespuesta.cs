namespace RinkuAPI.Enumeradores
{
    public enum EnumRespuesta
    {
        Aceptado = 200,
        NoEncontrado = 404,
        ErrorInterno = 503,
        NoSeEncontraronDatos = 1001,
        ValidacionReglaNegocio = 1002,
        ErrorBaseDatos = 1003
    }
}
//https://www.xataka.com/basics/errores-404-500-502-504-y-mas-en-paginas-web-que-significan