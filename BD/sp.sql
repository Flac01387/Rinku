
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

ALTER PROCEDURE sp_nuevoEmpleado @Nombre varchar(150), @ApellidoPaterno varchar(150), @ApellidoMaterno varchar(150), @PuestoID int, @TipoEmpleadoID int
AS    
BEGIN	
	IF NOT EXISTS(SELECT 1 FROM Empleados WHERE Nombre = @Nombre AND ApellidoPaterno = @ApellidoPaterno AND ApellidoMaterno = @ApellidoMaterno)
	BEGIN
	BEGIN TRY  
		BEGIN TRANSACTION
			INSERT INTO Empleados(Nombre, ApellidoPaterno, ApellidoMaterno, PuestoID, TipoEmpleadoID, Activo)
			SELECT @Nombre, @ApellidoPaterno, @ApellidoMaterno, @PuestoID, @TipoEmpleadoID, 1

			SELECT Nombre, ApellidoPaterno, ApellidoMaterno, PuestoID, TipoEmpleadoID, Activo
			FROM Empleados(NOLOCK)
			WHERE ID = @@IDENTITY
		
			COMMIT
		END TRY  
		BEGIN CATCH
			ROLLBACK
			RAISERROR('Error ejecucion sp_nuevoEmpleado',16,217) WITH LOG
		END CATCH;
	END
	ELSE
	BEGIN
		RAISERROR('Ya existen los datos del empleado',16,217) WITH LOG
	END 
END

GO

ALTER PROCEDURE sp_consultarEmpleados @ID int, @Nombre varchar(150), @ApellidoPaterno varchar(150), @ApellidoMaterno varchar(150), @PuestoID int, @TipoEmpleadoID int, @Activo bit
AS    
BEGIN    
 SELECT ID, Nombre, ApellidoPaterno, ApellidoMaterno, PuestoID,	TipoEmpleadoID, Activo
 FROM Empleados(NOLOCK)
 WHERE 
	ID = CASE WHEN @ID != 0 THEN @ID ELSE ID END AND
	Nombre like '%'+@Nombre+'%' AND 
	ApellidoPaterno like '%'+@ApellidoPaterno+'%' AND 
	ApellidoMaterno like '%'+@ApellidoMaterno+'%' AND
	PuestoID = CASE WHEN @PuestoID > 0 THEN @PuestoID ELSE PuestoID END AND
	TipoEmpleadoID = CASE WHEN @TipoEmpleadoID > 0 THEN @TipoEmpleadoID ELSE TipoEmpleadoID END AND
	Activo = @Activo
END

GO








