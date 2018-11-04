using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using RinkuBase.DTO;
using Utilerias.ManejadorErrores;

namespace RinkuDA
{
    public class AccesoDatos
    {
        public List<T> ejecutarSP<T>(string sp, T parametros) where T : new()
        {
            string cs = @"Data Source=DESKTOP-H28MIOE;Initial Catalog=Rinku;Integrated Security=True";

            try
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand(sp, con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    //Agregar parametros+
                    if(parametros != null)
                        foreach (PropertyInfo p in typeof(T).GetProperties())
                            if(p.GetValue(parametros) != null)
                                cmd.Parameters.Add(new SqlParameter("@" + p.Name, p.GetValue(parametros)));

                    con.Open();
                    //cmd.ExecuteNonQuery();

                    SqlDataReader reader = cmd.ExecuteReader();
                    List<T> respuesta = new List<T>();
                    var properties = typeof(T).GetProperties();

                    while (reader.Read())
                    {
                        var item = Activator.CreateInstance<T>();
                        foreach (var property in typeof(T).GetProperties())
                        {
                            if (!reader.IsDBNull(reader.GetOrdinal(property.Name)))
                            {
                                Type convertTo = Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType;
                                property.SetValue(item, Convert.ChangeType(reader[property.Name], convertTo), null);
                            }
                        }

                        respuesta.Add(item);
                    }

                    return respuesta;
                }
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