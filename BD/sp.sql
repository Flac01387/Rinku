
CREATE OR ALTER PROCEDURE sp_consultarTiposEmpleados    
AS    
BEGIN    
 SELECT ID, Nombre, Activo FROM TiposEmpleados(NOLOCK) WHERE Activo = 1
END

GO

CREATE OR ALTER  PROCEDURE sp_consultarPuestos    
AS    
BEGIN    
 SELECT ID, Nombre, Activo FROM Puestos(NOLOCK) WHERE Activo = 1
END

GO

CREATE OR ALTER PROCEDURE sp_nuevoEmpleado @Nombre varchar(150), @ApellidoPaterno varchar(150), @ApellidoMaterno varchar(150), @PuestoID int, @TipoEmpleadoID int
AS    
BEGIN	
	IF NOT EXISTS(SELECT 'true' FROM Empleados WHERE Nombre = @Nombre AND ApellidoPaterno = @ApellidoPaterno AND ApellidoMaterno = @ApellidoMaterno)
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

CREATE OR ALTER PROCEDURE sp_consultarEmpleados @ID int, @Nombre varchar(150), @ApellidoPaterno varchar(150), @ApellidoMaterno varchar(150), @PuestoID int, @TipoEmpleadoID int, @Activo bit
AS    
BEGIN    
 SELECT 
	E.ID, E.Nombre, E.ApellidoPaterno, E.ApellidoMaterno, E.PuestoID, E.TipoEmpleadoID, E.Activo,
	P.Nombre as Puesto, TE.Nombre as TipoEmpleado
 FROM Empleados E(NOLOCK)
 INNER JOIN Puestos P(NOLOCK) ON E.PuestoID = P.ID
 INNER JOIN TiposEmpleados TE(NOLOCK) ON E.TipoEmpleadoID = TE.ID
 WHERE 
	E.ID = CASE WHEN @ID != 0 THEN @ID ELSE E.ID END AND
	E.Nombre like '%'+@Nombre+'%' AND 
	E.ApellidoPaterno like '%'+@ApellidoPaterno+'%' AND 
	E.ApellidoMaterno like '%'+@ApellidoMaterno+'%' AND
	E.PuestoID = CASE WHEN @PuestoID > 0 THEN @PuestoID ELSE E.PuestoID END AND
	E.TipoEmpleadoID = CASE WHEN @TipoEmpleadoID > 0 THEN @TipoEmpleadoID ELSE E.TipoEmpleadoID END AND
	E.Activo = @Activo
END

GO

CREATE OR ALTER PROCEDURE sp_eliminarEmpleado  @ID int
AS    
BEGIN	
	IF EXISTS(SELECT TOP 1 'true' FROM Empleados(NOLOCK) WHERE ID = @ID)
	BEGIN
	BEGIN TRY  
		BEGIN TRANSACTION
			UPDATE Empleados 
			SET Activo = 0
			WHERE ID = @ID
		
			COMMIT
		END TRY  
		BEGIN CATCH
			ROLLBACK
			RAISERROR('Error ejecucion sp_nuevoEmpleado',16,217) WITH LOG
		END CATCH;
	END
	ELSE
	BEGIN
		RAISERROR('No existen los datos del empleado',16,217) WITH LOG
	END 
END

GO






















