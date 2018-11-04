
ALTER PROCEDURE sp_consultarTiposEmpleados    
AS    
BEGIN    
 SELECT ID, Nombre, Activo FROM TiposEmpleados(NOLOCK) WHERE Activo = 1
END

GO

ALTER PROCEDURE sp_consultarPuestos    
AS    
BEGIN    
 SELECT ID, Nombre, Activo FROM Puestos(NOLOCK) WHERE Activo = 1
END

GO

ALTER PROCEDURE sp_nuevoEmpleado @Nombre varchar(150), @APaterno varchar(150), @AMaterno varchar(150), @Puesto int, @TipoEmpleado int
AS    
BEGIN	
	IF NOT EXISTS(SELECT 1 FROM Empleados WHERE Nombre = @Nombre AND ApellidoPaterno = @APaterno AND ApellidoMaterno = @AMaterno)
	BEGIN
	BEGIN TRY  
		BEGIN TRANSACTION
			INSERT INTO Empleados(Nombre, ApellidoPaterno, ApellidoMaterno, PuestoID, TipoEmpleadoID, Activo)
			SELECT @Nombre, @APaterno, @AMaterno, @Puesto, @TipoEmpleado, 1

			SELECT Nombre, ApellidoPaterno, ApellidoMaterno, PuestoID, TipoEmpleadoID, Activo
			FROM Empleados(NOLOCK)
			WHERE ID = @@IDENTITY
		
			COMMIT
		END TRY  
		BEGIN CATCH
			ROLLBACK
			RAISERROR('Error ejecucion sp_nuevoEmpleado',20,217) WITH LOG
		END CATCH;
	END
	ELSE
	BEGIN
		RAISERROR('Ya existen los datos del empleado',16,217) WITH LOG
	END 
END

GO

 EXEC sp_nuevoEmpleado 'Roberto','Orozco','Bazua',1,1
