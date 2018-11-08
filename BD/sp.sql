
CREATE OR ALTER PROCEDURE sp_consultarTiposEmpleados    
AS    
BEGIN    
 SELECT ID, Nombre, Activo FROM EmpleadosTipos(NOLOCK) WHERE Activo = 1
END

GO

CREATE OR ALTER  PROCEDURE sp_consultarPuestos    
AS    
BEGIN    
 SELECT ID, Nombre, Activo FROM Puestos(NOLOCK) WHERE Activo = 1
END

GO

CREATE OR ALTER  PROCEDURE sp_consultarJornadas  
AS    
BEGIN    
 SELECT ID, Nombre, Activo FROM Jornadas(NOLOCK) WHERE Activo = 1
END

GO

CREATE OR ALTER PROCEDURE sp_nuevoEmpleado @ID int, @Nombre varchar(150), @ApellidoPaterno varchar(150), @ApellidoMaterno varchar(150), @PuestoID int, @EmpleadoTipoID int, @JornadaID int, @Activo bit
AS    
BEGIN	
	IF NOT EXISTS(SELECT 'true' FROM Empleados WHERE Nombre = @Nombre AND ApellidoPaterno = @ApellidoPaterno AND ApellidoMaterno = @ApellidoMaterno)
	BEGIN
	BEGIN TRY  
		BEGIN TRANSACTION
			INSERT INTO Empleados(Nombre, ApellidoPaterno, ApellidoMaterno, PuestoID, EmpleadoTipoID, JornadaID, Activo)
			SELECT @Nombre, @ApellidoPaterno, @ApellidoMaterno, @PuestoID, @EmpleadoTipoID, @JornadaID, 1

			SELECT	E.ID, E.Nombre, E.ApellidoPaterno, E.ApellidoMaterno, E.PuestoID, E.EmpleadoTipoID, E.Activo,
				P.Nombre as Puesto, TE.Nombre as EmpleadoTipo, E.JornadaID, J.Nombre as Jornada
			 FROM Empleados E(NOLOCK)
			 INNER JOIN Puestos P(NOLOCK) ON E.PuestoID = P.ID
			 INNER JOIN EmpleadosTipos TE(NOLOCK) ON E.EmpleadoTipoID = TE.ID
			 INNER JOIN Jornadas J(NOLOCK) ON E.JornadaID = J.ID
			WHERE E.ID = @@IDENTITY
		
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

CREATE OR ALTER PROCEDURE sp_consultarEmpleados @ID int, @Nombre varchar(150), @ApellidoPaterno varchar(150), @ApellidoMaterno varchar(150), @PuestoID int, @EmpleadoTipoID int, @JornadaID int, @Activo bit
AS    
BEGIN    
 SELECT 
	E.ID, E.Nombre, E.ApellidoPaterno, E.ApellidoMaterno, E.PuestoID, E.EmpleadoTipoID, E.Activo,
	P.Nombre as Puesto, TE.Nombre as EmpleadoTipo, E.JornadaID, J.Nombre as Jornada
 FROM Empleados E(NOLOCK)
 INNER JOIN Puestos P(NOLOCK) ON E.PuestoID = P.ID
 INNER JOIN EmpleadosTipos TE(NOLOCK) ON E.EmpleadoTipoID = TE.ID
 INNER JOIN Jornadas J(NOLOCK) ON E.JornadaID = J.ID
 WHERE 
	E.ID = CASE WHEN @ID > 0 THEN @ID ELSE E.ID END AND
	E.Nombre like '%'+@Nombre+'%' AND 
	E.ApellidoPaterno like '%'+@ApellidoPaterno+'%' AND 
	E.ApellidoMaterno like '%'+@ApellidoMaterno+'%' AND
	E.PuestoID = CASE WHEN @PuestoID > 0 THEN @PuestoID ELSE E.PuestoID END AND
	E.EmpleadoTipoID = CASE WHEN @EmpleadoTipoID > 0 THEN @EmpleadoTipoID ELSE E.EmpleadoTipoID END AND
	E.Activo = @Activo
END

GO

CREATE OR ALTER PROCEDURE sp_eliminarEmpleado  @ID int, @Nombre varchar(150), @ApellidoPaterno varchar(150), @ApellidoMaterno varchar(150), @PuestoID int, @EmpleadoTipoID int, @JornadaID int, @Activo bit
AS    
BEGIN	
	IF EXISTS(SELECT TOP 1 'true' FROM Empleados(NOLOCK) WHERE ID = @ID)
	BEGIN
	BEGIN TRY  
		BEGIN TRANSACTION
			UPDATE Empleados 
			SET Activo = 0
			WHERE ID = @ID

			EXEC sp_consultarEmpleados @ID, @Nombre, @ApellidoPaterno, @ApellidoMaterno, @PuestoID, @EmpleadoTipoID, @JornadaID, true
		
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

CREATE OR ALTER PROCEDURE sp_actualizarEmpleado @ID int, @Nombre varchar(150), @ApellidoPaterno varchar(150), @ApellidoMaterno varchar(150), @PuestoID int, @EmpleadoTipoID int, @JornadaID int, @Activo bit
AS    
BEGIN    
 IF EXISTS(SELECT TOP 1 'true' FROM Empleados(NOLOCK) WHERE ID = @ID)
	BEGIN
	BEGIN TRY  
		BEGIN TRANSACTION
			UPDATE Empleados SET Nombre = @Nombre, ApellidoPaterno = @ApellidoPaterno, ApellidoMaterno = @ApellidoMaterno, PuestoID = @PuestoID, EmpleadoTipoID = @EmpleadoTipoID, JornadaID = @JornadaID, Activo = @Activo
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

CREATE OR ALTER PROCEDURE sp_consultarMovimientos @EmpleadoID INT
AS
BEGIN
	SELECT * FROM Pagos(NOLOCK) P WHERE P.EmpleadoID = @EmpleadoID

	DECLARE @PagoID INT
	SET @PagoID = (SELECT P.ID FROM Pagos(NOLOCK) P WHERE P.EmpleadoID = @EmpleadoID)
	
	SELECT * FROM MovimientosDiarios(NOLOCK) MD WHERE MD.PagoID = @PagoID
END

GO

CREATE OR ALTER PROCEDURE sp_registrarMovimientos @EmpleadoID INT, @FechaMovimiento DATE, @Entregas INT, @PuestoCubrir INT, @EmpleadoTipo INT
AS    
BEGIN 
	BEGIN TRY  
		BEGIN TRANSACTION
			
			DECLARE @PagoID INT

			IF NOT EXISTS(SELECT 'true' FROM Pagos(NOLOCK) P WHERE P.EmpleadoID = @EmpleadoID)
			BEGIN
				INSERT INTO Pagos(EmpleadoID, TotalBruto, TotalNeto)
				SELECT @EmpleadoID, 0, 0;
				 
				 SET @PagoID = @@IDENTITY;
				/*UPDATE Pagos SET TotalBruto = (SELECT Total FROM MovimientosDiarios WHERE ID = @@IDENTITY)
				WHERE ID = @PagoID*/
			END
			ELSE
			BEGIN
				SET @PagoID = (SELECT P.ID FROM Pagos(NOLOCK) P WHERE P.EmpleadoID = @EmpleadoID)
			END
			
			--Calcular movimiento base de horas trabajadas
			INSERT INTO MovimientosDiarios(PagoID, ActividadID, Cantidad, Total, FechaMovimiento, CubrioPuestoID)
			SELECT 
				@PagoID, AP.ActividadID, JD.HrsDia, (C.Monto*JD.HrsDia), @FechaMovimiento,@PuestoCubrir
			FROM 
				Empleados(NOLOCK) E 
			INNER JOIN Jornadas(NOLOCK) J ON E.JornadaID =J.ID
			INNER JOIN JornadasDetalles(NOLOCK) JD ON J.ID = JD.JornadaID
			INNER JOIN Puestos(NOLOCK) P ON E.PuestoID = P.ID
			INNER JOIN ActividadesPuestos AP(NOLOCK) ON P.ID = AP.PuestoID AND AP.Base = 1
			INNER JOIN Actividades A(NOLOCK) ON AP.ActividadID = A.ID 
			INNER JOIN Comisiones C(NOLOCK) ON C.ID = A.ComisionID
			WHERE
				E.ID = @EmpleadoID

			--Calcular comision por entrega de paquetes
			IF @Entregas > 0
			BEGIN
				INSERT INTO MovimientosDiarios(PagoID, ActividadID, Cantidad, Total, FechaMovimiento, CubrioPuestoID)
				SELECT 
					@PagoID, A.ID, @Entregas, C.Monto*@Entregas, @FechaMovimiento,@PuestoCubrir
				FROM 
					Actividades(NOLOCK) A
				INNER JOIN Comisiones(NOLOCK) C ON A.ComisionID = C.ID
				WHERE
					A.ID = 4
			END
			
			--Calcular comisiones de movimientos por horas trabajadas
			IF @PuestoCubrir > 0
			BEGIN
				INSERT INTO MovimientosDiarios(PagoID, ActividadID, Cantidad, Total, FechaMovimiento, CubrioPuestoID)
				SELECT 
					@PagoID, AP.ActividadID, JD.HrsDia, (C.Monto*JD.HrsDia), @FechaMovimiento,@PuestoCubrir
				FROM 
					Empleados(NOLOCK) E 
				INNER JOIN Jornadas(NOLOCK) J ON E.JornadaID =J.ID
				INNER JOIN JornadasDetalles(NOLOCK) JD ON J.ID = JD.JornadaID
				INNER JOIN Puestos(NOLOCK) P ON E.PuestoID = P.ID
				INNER JOIN PuestosCubrir(NOLOCK) PC ON P.ID = PC.Puesto AND PC.PuestoCubrir = @PuestoCubrir
				INNER JOIN ActividadesPuestos AP(NOLOCK) ON PC.ID = AP.PuestoID AND AP.Base != 1
				INNER JOIN Actividades A(NOLOCK) ON AP.ActividadID = A.ID  AND A.ActividadTipoID = 1
				INNER JOIN Comisiones C(NOLOCK) ON C.ID = A.ComisionID
				WHERE
					E.ID = @EmpleadoID
			END

			--Calcular Bono despensa
			IF @EmpleadoID = 1
			BEGIN
				--Meter la parte de sueldos
			END

			--Calcular Impuestos

			--Calcular sueldo bruto y actualizar
		COMMIT
	END TRY  
	BEGIN CATCH
		ROLLBACK
		RAISERROR('Error ejecucion sp_registrarMovimiento',16,217) WITH LOG
	END CATCH;
END


-- EXEC sp_registrarMovimientos 2, '2018-11-08', 5, 1

-- EXEC sp_consultarMovimientos 2

SELECT * FROM EmpleadosTipos








