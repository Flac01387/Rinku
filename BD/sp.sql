
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

CREATE OR ALTER  PROCEDURE sp_consultarPuestosCubrir @ID INT, @Nombre varchar(150), @Activo BIT
AS    
BEGIN    
 SELECT P.ID, P.Nombre, PC.Activo
 FROM Empleados(NOLOCK) E
 INNER JOIN PuestosCubrir(NOLOCK) PC ON E.PuestoID = PC.Puesto
 INNER JOIN Puestos(NOLOCK) P ON PC.PuestoCubrir = P.ID
 WHERE E.ID = @ID AND PC.Activo = @Activo
END

GO

CREATE OR ALTER  PROCEDURE sp_consultarJornadas  
AS    
BEGIN    
 SELECT ID, Nombre, Activo FROM Jornadas(NOLOCK) WHERE Activo = 1
END

GO

CREATE OR ALTER  PROCEDURE sp_consultarNomina @EmpleadoID INT, @Nombre VARCHAR, @ApellidoPaterno VARCHAR, @ApellidoMaterno VARCHAR, @SueldoBase DECIMAL, @TotalBruto DECIMAL, @TotalNeto DECIMAL, @Fecha DATE
AS    
BEGIN    
	SELECT E.ID as EmpleadoID, E.Nombre, E.ApellidoPaterno, E.ApellidoMaterno, P.SueldoBase, P.TotalBruto, P.TotalNeto, P.FechaPago as Fecha
	FROM Pagos(NOLOCK)  P
	INNER JOIN Empleados(NOLOCK) E ON P.EmpleadoID = E.ID
	WHERE DATEPART(MONTH,P.FechaPago) = DATEPART(MONTH,@Fecha) AND DATEPART(YEAR,P.FechaPago) = DATEPART(YEAR,@Fecha)
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
-- EXEC sp_consultarMovimientos 1, '2018-11-11', '', '' ,'', '', 0, 0, 0
CREATE OR ALTER PROCEDURE sp_consultarMovimientos @EmpleadoID INT, @Fecha DATE, @Nombre VARCHAR(150), @ApellidoPaterno VARCHAR(150), @ApellidoMaterno VARCHAR(150), @Actividad VARCHAR(150), @Cantidad INT, @MONTO DECIMAL, @Total DECIMAL
AS
BEGIN
	DECLARE @PagoID INT
	SET @PagoID = (SELECT P.ID FROM Pagos(NOLOCK) P WHERE P.EmpleadoID = @EmpleadoID AND DATEPART(MONTH,P.FechaPago) = DATEPART(MONTH,@Fecha) AND DATEPART(YEAR,P.FechaPago) = DATEPART(YEAR,@Fecha))
	
	SELECT
		 PGO.EmpleadoID, MD.FechaMovimiento as Fecha, E.Nombre, E.ApellidoPaterno, E.ApellidoMaterno, A.Nombre as Actividad, MD.Cantidad, C.Monto, MD.Total
	FROM
		MovimientosDiarios(NOLOCK) MD
	INNER JOIN Pagos(NOLOCK) PGO ON MD.PagoID = PGO.ID
	INNER JOIN Empleados(NOLOCK) E ON PGO.EmpleadoID = E.ID
	INNER JOIN Jornadas(NOLOCK) J ON E.JornadaID =J.ID
	INNER JOIN JornadasDetalles(NOLOCK) JD ON J.ID = JD.JornadaID
	INNER JOIN Puestos(NOLOCK) P ON E.PuestoID = P.ID
	INNER JOIN Actividades A(NOLOCK) ON MD.ActividadID = A.ID AND MD.ActividadID = A.ID
	INNER JOIN Comisiones C(NOLOCK) ON C.ID = A.ComisionID
	WHERE
		PGO.EmpleadoID = CASE WHEN @EmpleadoID > 0 THEN @EmpleadoID ELSE PGO.EmpleadoID END AND
		DATEPART(MONTH,MD.FechaMovimiento) = DATEPART(MONTH,@Fecha) AND DATEPART(YEAR,MD.FechaMovimiento) = DATEPART(YEAR,@Fecha) AND
		E.Nombre LIKE '%'+@Nombre+'%' AND
		E.ApellidoPaterno LIKE '%'+@ApellidoPaterno+'%' AND
		E.ApellidoMaterno LIKE '%'+@ApellidoMaterno+'%' 
	ORDER BY
		MD.FechaMovimiento ASC
END

GO
-- EXEC sp_calcularSalario 1, '2018-02-11', 0, 0, 0, 0
CREATE OR ALTER PROCEDURE sp_calcularSalario @EmpleadoID INT, @FechaPago DATE, @ID INT, @SueldoBase DECIMAL, @TotalBruto DECIMAL, @TotalNeto DECIMAL
AS    
BEGIN 
	DECLARE @Mensaje VARCHAR(MAX) = ''

	BEGIN TRY  
		BEGIN TRANSACTION
			
			DECLARE	@PagoID INT
			SELECT @PagoID = P.ID, @SueldoBase= P.SueldoBase FROM Pagos(NOLOCK) P WHERE P.EmpleadoID = @EmpleadoID AND DATEPART(MONTH,P.FechaPago) = DATEPART(MONTH,@FechaPago) AND DATEPART(YEAR,P.FechaPago) = DATEPART(YEAR,@FechaPago)
			DECLARE @TotalMovimientos DECIMAL(10,2) = (SELECT SUM(Total) FROM MovimientosDiarios(NOLOCK) MD WHERE MD.PagoID = @PagoID)
			DECLARE @TotalPorCubrir DECIMAL(10,2) = (SELECT COALESCE(SUM(Total),0) FROM MovimientosCubrio(NOLOCK) MD WHERE MD.PagoID = @PagoID)
			DECLARE @TotalBonos DECIMAL(10,2) = (SELECT COALESCE(SUM(Total),0) FROM MovimientosBonos(NOLOCK) MB WHERE MB.PagoID = @PagoID)
			
			--Calcular sueldo bruto
			UPDATE Pagos SET TotalBruto = @TotalMovimientos+@TotalBonos+@TotalPorCubrir+@SueldoBase WHERE ID = @PagoID

			DECLARE @SueldoBruto DECIMAL(10,2) = (SELECT TotalBruto FROM Pagos(NOLOCK) P WHERE P.ID = @PagoID)
			DECLARE @MesID INT = (SELECT MesID FROM Fechas(NOLOCK) F WHERE F.Fecha = @FechaPago)
			
			UPDATE MI
			SET MI.Total = Impuesto.Total
			from MovimientosImpuestos MI
			INNER JOIN (
				SELECT MI.PagoID, CASE WHEN TotalBruto > I.Minimo THEN (TotalBruto*I.Porcentaje)/100 END as Total
				FROM MovimientosImpuestos(NOLOCK) MI
				INNER JOIN Pagos P(NOLOCK) ON MI.PagoID = P.ID
				INNER JOIN Impuestos(NOLOCK) I ON MI.ImpuestoID = I.ID
				WHERE MI.PagoID = @PagoID
			) Impuesto ON MI.PagoID = Impuesto.PagoID

			--Calcular sueldo neto
			UPDATE P SET P.TotalNeto = (P.TotalBruto-MI.Total)
			FROM Pagos P
			INNER JOIN MovimientosImpuestos(NOLOCK) MI ON P.ID = MI.PagoID
			WHERE P.ID = @PagoID

		COMMIT
	END TRY  
	BEGIN CATCH
		ROLLBACK

		IF @Mensaje = ''
		BEGIN
			RAISERROR('Error ejecucion sp_calcularSalario',16,217) WITH LOG
		END
		ELSE BEGIN
			RAISERROR(@Mensaje,16,217) WITH LOG
		END
	END CATCH;
END

GO

CREATE OR ALTER PROCEDURE sp_registrarMovimientos @EmpleadoID INT, @FechaMovimiento DATE, @Entregas INT, @PuestoCubrir INT
AS    
BEGIN 

	DECLARE @Mensaje VARCHAR(MAX) = ''

	BEGIN TRY  
		BEGIN TRANSACTION
			
			DECLARE	@PagoID INT, @SueldoBase DECIMAL(10,2)
			DECLARE	@CubrioPuesto BIT;
			SELECT @CubrioPuesto = CASE WHEN @PuestoCubrir > 0 THEN 1 ELSE 0 END;

			IF NOT EXISTS(SELECT 'true' FROM Pagos(NOLOCK) P WHERE P.EmpleadoID = @EmpleadoID AND DATEPART(MONTH,P.FechaPago) = DATEPART(MONTH,@FechaMovimiento) AND DATEPART(YEAR,P.FechaPago) = DATEPART(YEAR,@FechaMovimiento))
			BEGIN
				INSERT INTO Pagos(EmpleadoID, SueldoBase, TotalBruto, TotalNeto, FechaPago)
				SELECT 
					E.ID, (JD.HrsMes*C.Monto), 0, 0, @FechaMovimiento
				FROM Empleados(NOLOCK) E 
				INNER JOIN Jornadas(NOLOCK) J ON E.JornadaID = J.ID
				INNER JOIN JornadasDetalles(NOLOCK) JD ON J.ID = JD.JornadaID
				INNER JOIN Puestos(NOLOCK) P ON E.PuestoID = P.ID
				INNER JOIN ActividadesPuestos AP(NOLOCK) ON P.ID = AP.PuestoID AND AP.Base = 1
				INNER JOIN Actividades A(NOLOCK) ON AP.ActividadID = A.ID 
				INNER JOIN Comisiones C(NOLOCK) ON C.ID = A.ComisionID
				WHERE E.ID = @EmpleadoID
				 
				SET @PagoID = @@IDENTITY;
				SET @SueldoBase = (SELECT P.SueldoBase FROM Pagos(NOLOCK) P WHERE P.ID = @PagoID AND DATEPART(MONTH,P.FechaPago) = DATEPART(MONTH,@FechaMovimiento) AND DATEPART(YEAR,P.FechaPago) = DATEPART(YEAR,@FechaMovimiento)); 

				--Se calculan los bonos
				INSERT INTO MovimientosBonos(PagoID, BonoID, Total, FechaMovimiento)
				SELECT
					@PagoID, B.ID, CASE WHEN BT.ID = 1 THEN (B.Cantidad*@SueldoBase)/100 ELSE B.Cantidad END, @FechaMovimiento
				FROM Bonos(NOLOCK) B
				INNER JOIN BonosTipos(NOLOCK) BT ON B.BonoTipoID = BT.ID
				INNER JOIN Pagos(NOLOCK) P ON P.ID = @PagoID
				INNER JOIN Empleados(NOLOCK) E ON P.EmpleadoID = E.ID AND E.EmpleadoTipoID = B.EmpleadoTipoID

				INSERT INTO MovimientosImpuestos(PagoID, ImpuestoID, Total, FechaMovimiento)
				SELECT @PagoID, I.ID, CASE WHEN @SueldoBase > Minimo THEN (@SueldoBase*Porcentaje)/100 END, GETDATE()
				FROM Impuestos(NOLOCK) I
				WHERE CASE WHEN @SueldoBase > Minimo THEN (@SueldoBase*Porcentaje)/100 END IS NOT NULL
			END
			ELSE
			BEGIN
				SELECT @PagoID = P.ID, @SueldoBase= P.SueldoBase FROM Pagos(NOLOCK) P WHERE P.EmpleadoID = @EmpleadoID AND DATEPART(MONTH,P.FechaPago) = DATEPART(MONTH,@FechaMovimiento) AND DATEPART(YEAR,P.FechaPago) = DATEPART(YEAR,@FechaMovimiento)
			END
	
			IF NOT EXISTS(SELECT 'true' FROM MovimientosDiarios(NOLOCK) MD WHERE MD.PagoID = @PagoID AND MD.FechaMovimiento = @FechaMovimiento)
			BEGIN
				--Calcular movimiento base de horas trabajadas
				INSERT INTO MovimientosDiarios(PagoID, ActividadID, Cantidad, Total, FechaMovimiento, CubrioPuesto)
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
					INSERT INTO MovimientosDiarios(PagoID, ActividadID, Cantidad, Total, FechaMovimiento, CubrioPuesto)
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
					INSERT INTO MovimientosCubrio(PagoID, ActividadID, Cantidad, Total, FechaMovimiento, CubrioPuestoID)
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
			END
			ELSE
			BEGIN
				ROLLBACK
				SET @Mensaje = 'Ya existen movimientos para este día';
				RAISERROR('',16,217) WITH LOG
			END

		COMMIT
	END TRY  
	BEGIN CATCH
		ROLLBACK

		IF @Mensaje = ''
		BEGIN
			RAISERROR('Error ejecucion sp_registrarMovimiento',16,217) WITH LOG
		END
		ELSE BEGIN
			RAISERROR(@Mensaje,16,217) WITH LOG
		END
	END CATCH;

	--EXEC sp_calcularSalario @EmpleadoID, @FechaMovimiento
END


-- EXEC sp_registrarMovimientos 1, '2018-11-08', 5, 1
-- EXEC sp_registrarMovimientos 2, '2018-11-11', 5, 0

-- EXEC sp_consultarMovimientos 2, '2018-11-09'

-- EXEC sp_calcularSalario 2, '2018-11-08'

/*
DECLARE @EmpleadoID INT = 2, @FechaMovimiento DATE = '2018-11-08'
DECLARE	@PagoID INT, @SueldoBase DECIMAL(10,2)
SELECT @PagoID = P.ID, @SueldoBase= P.SueldoBase FROM Pagos(NOLOCK) P WHERE P.EmpleadoID = @EmpleadoID AND  DATEPART(MONTH,P.FechaPago) = DATEPART(MONTH,@FechaMovimiento)
DECLARE @TotalMovimientos DECIMAL(10,2) = (SELECT SUM(Total) FROM MovimientosDiarios(NOLOCK) MD WHERE MD.PagoID = @PagoID)
DECLARE @TotalBonos DECIMAL(10,2) = (SELECT SUM(Total) FROM MovimientosBonos(NOLOCK) MB WHERE MB.PagoID = @PagoID)			
			
SELECT @PagoID, @SueldoBase, @TotalBonos, @TotalMovimientos

*/


--Calcular sueldo bruto
/*
UPDATE Pagos SET TotalBruto = @TotalMovimientos+@TotalBonos WHERE ID = @PagoID
SELECT * fROM Pagos
*/


/*
SELECT * FROM Pagos where id = 3
SELECT 'Diarios',* FROM MovimientosDiarios where PagoID = 3
SELECT 'Impuestos',* FROM MovimientosImpuestos where PagoID = 3
SELECT 'Bonos',* FROM MovimientosBonos where PagoID = 3
SELECT 'Cubrio',* FROM MovimientosCubrio where PagoID = 3

*/








