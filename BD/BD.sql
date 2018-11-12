USE master DROP DATABASE Rinku -- SP_WHO kill 54

CREATE DATABASE Rinku
GO
USE Rinku

CREATE TABLE Fechas
(
	Fecha DATE NOT NULL UNIQUE,
	DiaSemana INT NOT NULL,
	DiaMes INT NOT NULL,
	DiaAnio INT NOT NULL,
	SemanaID INT NOT NULL,
	SemanaMes INT NOT NULL,
	SemanaAnio INT NOT NULL,
	MesID INT NOT NULL,
	MesAnio INT NOT NULL,
	AnioID INT NOT NULL,
	Anio INT NOT NULL,
	PRIMARY KEY(Fecha)
)

DECLARE @FECHA DATE = DATEADD(YEAR, -1, GETDATE())
DECLARE @FECHAFIN DATE = DATEADD(YEAR, 1, GETDATE())

WHILE (SELECT @FECHA) < (SELECT @FECHAFIN)
BEGIN
	INSERT INTO Fechas
	SELECT @FECHA, DATEPART(WEEKDAY,@FECHA), DATEPART(DAY, @FECHA), DATEPART(DAYOFYEAR,@FECHA), 0, CONVERT(INT,(DATEPART(DAY, @FECHA)/7)+1), DATEPART(WEEK,@FECHA), 0, DATEPART(MONTH,@FECHA), 0, DATEPART(YEAR,@FECHA)
	SET @FECHA = DATEADD(DAY, 1, @FECHA)
END

--Actualizar la semana
UPDATE F
SET F.SemanaID = TablaSemana.SemanaID
FROM Fechas F
INNER JOIN 
(
	SELECT 
		ROW_NUMBER() OVER(ORDER BY Anio, SemanaAnio ASC) AS SemanaID, SemanaAnio, Anio
	FROM 
		(SELECT DISTINCT SemanaAnio, Anio FROM Fechas) as Temp
	GROUP BY
		SemanaAnio, Anio
) TablaSemana ON F.SemanaAnio = TablaSemana.SemanaAnio AND F.Anio = TablaSemana.Anio

--Actualizar Mes
UPDATE F
SET F.MesID = TablaMes.MesID
FROM Fechas F
INNER JOIN 
(
	SELECT 
		ROW_NUMBER() OVER(ORDER BY Anio, MesAnio ASC) AS MesID, MesAnio, Anio
	FROM 
		(SELECT DISTINCT MesAnio, Anio FROM Fechas) as Temp
	GROUP BY
		MesAnio, Anio
) TablaMes ON F.MesAnio = TablaMes.MesAnio AND F.Anio = TablaMes.Anio

--Actualizar Anio
UPDATE F
SET F.AnioID = TablaAnio.AnioID
FROM Fechas F
INNER JOIN 
(
	SELECT 
		ROW_NUMBER() OVER(ORDER BY Anio ASC) AS AnioID, Anio
	FROM 
		(SELECT DISTINCT Anio FROM Fechas) as Temp
	GROUP BY
		Anio
) TablaAnio ON F.Anio = TablaAnio.Anio

CREATE TABLE ActividadesTipos
(
	ID INT NOT NULL IDENTITY(1,1),
    Nombre VARCHAR(100) NOT NULL,
    Activo BIT,
    PRIMARY KEY (ID)
)

CREATE TABLE Comisiones
(
	ID INT NOT NULL IDENTITY(1,1),
    Nombre VARCHAR(100) NOT NULL,
    Activo BIT,
	Monto DECIMAL(5,2) NOT NULL,
    PRIMARY KEY (ID)
)

CREATE TABLE Actividades
(
	ID INT NOT NULL IDENTITY(1,1),
	Nombre VARCHAR(250) NOT NULL,
	ComisionID INT NOT NULL,
	ActividadTipoID INT NOT NULL,
    Activo BIT,
    PRIMARY KEY (ID),
    FOREIGN KEY (ComisionID) REFERENCES Comisiones(ID),
    FOREIGN KEY (ActividadTipoID) REFERENCES ActividadesTipos(ID)
)

CREATE TABLE Puestos
(
	ID INT NOT NULL IDENTITY(1,1),
    Nombre VARCHAR(100) NOT NULL,
    Activo BIT,
    PRIMARY KEY (ID)
)

CREATE TABLE ActividadesPuestos
(
	PuestoID INT NOT NULL,
	ActividadID INT NOT NULL,
	Base BIT NOT NULL,
	Activo BIT NOT NULL,
	PRIMARY KEY(PuestoID, ActividadID),
	FOREIGN KEY (PuestoID) REFERENCES Puestos(ID),
	FOREIGN KEY (ActividadID) REFERENCES Actividades(ID)
)

CREATE TABLE PuestosCubrir
(
	ID INT NOT NULL IDENTITY(1,1),
	Nombre VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(250) NOT NULL,
	Puesto INT NOT NULL,
	PuestoCubrir INT NULL,
    Activo BIT,
    PRIMARY KEY (ID),
    FOREIGN KEY (Puesto) REFERENCES Puestos(ID),
    FOREIGN KEY (PuestoCubrir) REFERENCES Puestos(ID)
)

CREATE TABLE EmpleadosTipos
(
	ID INT NOT NULL IDENTITY(1,1),
	Nombre VARCHAR(100) NOT NULL,
	Activo BIT,
    PRIMARY KEY (ID)
)

CREATE TABLE BonosTipos
(
	ID INT NOT NULL IDENTITY(1,1),
	Nombre VARCHAR(100) NOT NULL,
	Activo BIT NOT NULL,
	PRIMARY KEY (ID)
)

CREATE TABLE Bonos
(
	ID INT NOT NULL IDENTITY(1,1),
	Nombre VARCHAR(100) NOT NULL,
	Cantidad DECIMAL(5,2) NOT NULL,
	BonoTipoID INT NOT NULL,
	EmpleadoTipoID INT NOT NULL,
	Activo BIT NOT NULL,
	PRIMARY KEY (ID),
    FOREIGN KEY (BonoTipoID) REFERENCES BonosTipos(ID),
    FOREIGN KEY (EmpleadoTipoID) REFERENCES EmpleadosTipos(ID)
)

CREATE TABLE Jornadas(
	ID INT NOT NULL IDENTITY(1,1),
	Nombre VARCHAR(100) NOT NULL,
	Activo BIT NOT NULL, 
    PRIMARY KEY (ID)
)


CREATE TABLE JornadasDetalles(
	ID INT NOT NULL IDENTITY(1,1),
	JornadaID INT NOT NULL,
	HrsDia INT NOT NULL,
	HrsSemana INT NOT NULL,
	HrsQuincena INT NOT NULL,
	HrsMes INT NOT NULL,
	Activo BIT NOT NULL, 
    PRIMARY KEY (ID),
	FOREIGN KEY (JornadaID) REFERENCES Jornadas(ID)
)

CREATE TABLE Empleados
(
	ID INT NOT NULL IDENTITY(1,1),
	Nombre VARCHAR(100) NOT NULL,
	ApellidoPaterno VARCHAR(100) NOT NULL,
	ApellidoMaterno VARCHAR(100) NOT NULL,
	PuestoID INT NOT NULL,
	EmpleadoTipoID INT NOT NULL,
	JornadaID INT NOT NULL,
    Activo BIT,
    PRIMARY KEY (ID),
    FOREIGN KEY (PuestoID) REFERENCES Puestos(ID),
    FOREIGN KEY (EmpleadoTipoID) REFERENCES EmpleadosTipos(ID),
    FOREIGN KEY (JornadaID) REFERENCES Jornadas(ID)
)

CREATE TABLE Impuestos
(
	ID INT NOT NULL IDENTITY(1,1),
	Nombre VARCHAR(100) NOT NULL,
	Descripcion VARCHAR(250) NOT NULL,
	Minimo DECIMAL(10,2) NOT NULL,
	Maximo DECIMAL(10,2) NOT NULL,
	Porcentaje DECIMAL(10,2) NOT NULL,
	Activo BIT NOT NULL,
    PRIMARY KEY (ID)
)

CREATE TABLE Pagos(
	ID INT NOT NULL IDENTITY(1,1),
	EmpleadoID INT NOT NULL,
	SueldoBase DECIMAL(10,2) NOT NULL,
	TotalBruto DECIMAL(10,2) NOT NULL,
	TotalNeto DECIMAL(10,2) NOT NULL,
	FechaPago DATE NOT NULL,
    PRIMARY KEY (ID),
	FOREIGN KEY (EmpleadoID) REFERENCES Empleados(ID),
	FOREIGN KEY (FechaPago) REFERENCES Fechas(Fecha)
)

CREATE TABLE MovimientosCubrio
(
	ID INT NOT NULL IDENTITY(1,1),
	PagoID INT NOT NULL,
	ActividadID INT NOT NULL,
	Cantidad INT NOT NULL,
	Total DECIMAL(10,2) NOT NULL, 
	FechaMovimiento DATE NOT NULL,
	CubrioPuestoID INT NOT NULL,
    PRIMARY KEY (ID),
	FOREIGN KEY (ActividadID) REFERENCES Actividades(ID),
	FOREIGN KEY (CubrioPuestoID) REFERENCES Puestos(ID),
	FOREIGN KEY (PagoID) REFERENCES Pagos(ID),
	FOREIGN KEY (FechaMovimiento) REFERENCES Fechas(Fecha)

)

CREATE TABLE MovimientosDiarios
(
	ID INT NOT NULL IDENTITY(1,1),
	PagoID INT NOT NULL,
	ActividadID INT NOT NULL,
	Cantidad INT NOT NULL,
	Total DECIMAL(10,2) NOT NULL, 
	FechaMovimiento DATE NOT NULL,
	CubrioPuesto BIT NOT NULL,
    PRIMARY KEY (ID),
	FOREIGN KEY (ActividadID) REFERENCES Actividades(ID),
	FOREIGN KEY (PagoID) REFERENCES Pagos(ID),
	FOREIGN KEY (FechaMovimiento) REFERENCES Fechas(Fecha)

)

CREATE TABLE MovimientosBonos
(
	ID INT NOT NULL IDENTITY(1,1),
	PagoID INT NOT NULL,
	BonoID INT NOT NULL,
	Total DECIMAL(10,2) NOT NULL,
	FechaMovimiento DATE NOT NULL,
    PRIMARY KEY (ID),
	FOREIGN KEY (BonoID) REFERENCES Bonos(ID),
	FOREIGN KEY (PagoID) REFERENCES Pagos(ID),
	FOREIGN KEY (FechaMovimiento) REFERENCES Fechas(Fecha)
)

CREATE TABLE MovimientosImpuestos
(
	ID INT NOT NULL IDENTITY(1,1),
	PagoID INT NOT NULL,
	ImpuestoID INT NOT NULL,
	Total DECIMAL(10,2) NOT NULL,
	FechaMovimiento DATE NOT NULL,
    PRIMARY KEY (ID),
	FOREIGN KEY (ImpuestoID) REFERENCES Impuestos(ID),
	FOREIGN KEY (PagoID) REFERENCES Pagos(ID),
	FOREIGN KEY (FechaMovimiento) REFERENCES Fechas(Fecha)
)

INSERT INTO ActividadesTipos(Nombre, Activo)
SELECT 'Hora',1
INSERT INTO ActividadesTipos(Nombre, Activo)
SELECT 'Evento',1
INSERT INTO Comisiones(Nombre, Activo, Monto)
SELECT 'Comisión Base',1, 30
INSERT INTO Comisiones(Nombre, Activo, Monto)
SELECT 'Comisión entregar paquete',1, 5
INSERT INTO Comisiones(Nombre, Activo, Monto)
SELECT 'Comisión Hora 1',1, 5
INSERT INTO Comisiones(Nombre, Activo, Monto)
SELECT 'Comisión Hora 2',1, 10
INSERT INTO Actividades(Nombre, ComisionID, ActividadTipoID, Activo)
SELECT 'Actividad Base Chofer', 1, 1, 1
INSERT INTO Actividades(Nombre, ComisionID, ActividadTipoID, Activo)
SELECT 'Actividad Base Cargador', 1, 1, 1
INSERT INTO Actividades(Nombre, ComisionID, ActividadTipoID, Activo)
SELECT 'Actividad Base Auxiliar', 1, 1, 1
INSERT INTO Actividades(Nombre, ComisionID, ActividadTipoID, Activo)
SELECT 'Entregar paquete', 2, 2, 1
INSERT INTO Actividades(Nombre, ComisionID, ActividadTipoID, Activo)
SELECT 'Hora cargador', 3, 1, 1
INSERT INTO Actividades(Nombre, ComisionID, ActividadTipoID, Activo)
SELECT 'Hora chofer', 4, 1, 1
INSERT INTO Puestos(Nombre, Activo)
SELECT 'Chofer',1
INSERT INTO Puestos(Nombre, Activo)
SELECT 'Cargador',1
INSERT INTO Puestos(Nombre, Activo)
SELECT 'Auxiliar',1
INSERT INTO ActividadesPuestos(PuestoID,ActividadID,Base,Activo)
SELECT 1,1,1,1
INSERT INTO ActividadesPuestos(PuestoID,ActividadID,Base,Activo)
SELECT 1,4,0,1
INSERT INTO ActividadesPuestos(PuestoID,ActividadID,Base,Activo)
SELECT 1,6,0,1
INSERT INTO ActividadesPuestos(PuestoID,ActividadID,Base,Activo)
SELECT 2,2,1,1
INSERT INTO ActividadesPuestos(PuestoID,ActividadID,Base,Activo)
SELECT 2,4,0,1
INSERT INTO ActividadesPuestos(PuestoID,ActividadID,Base,Activo)
SELECT 2,5,0,1
INSERT INTO ActividadesPuestos(PuestoID,ActividadID,Base,Activo)
SELECT 3,3,1,1
INSERT INTO ActividadesPuestos(PuestoID,ActividadID,Base,Activo)
SELECT 3,4,0,1
INSERT INTO PuestosCubrir(Nombre, Descripcion, Puesto, PuestoCubrir, Activo)
SELECT 'Auxiliar a Chofer','Auxiliar puede cubrir actividades de un chofer', 3,1,1
INSERT INTO PuestosCubrir(Nombre, Descripcion, Puesto, PuestoCubrir, Activo)
SELECT 'Auxiliar a Cargador','Auxiliar puede cubrir actividades de un cargador', 3,2,1
INSERT INTO EmpleadosTipos(Nombre,Activo)
SELECT 'Internos',1
INSERT INTO EmpleadosTipos(Nombre,Activo)
SELECT 'Externos',2
INSERT INTO BonosTipos(Nombre, Activo)
SELECT 'Porcentaje',1
INSERT INTO BonosTipos(Nombre, Activo)
SELECT 'Cantidad Fija',1
INSERT INTO Bonos(Nombre, Cantidad, BonoTipoID, EmpleadoTipoID, Activo)
SELECT 'Vales de despensa', 4, 1, 1, 1
INSERT INTO Impuestos(Nombre, Descripcion, Minimo, Maximo, Porcentaje, Activo)
SELECT 'ISR Base', 'Impuesto para todos', 0, -1, 9, 1
INSERT INTO Impuestos(Nombre, Descripcion, Minimo, Maximo, Porcentaje, Activo)
SELECT 'ISR para Ricos', 'Impuesto para los que ganan mucho', 16000, -1, 3, 1
INSERT INTO Jornadas(Nombre, Activo)
SELECT '1/2 Turno', 1
INSERT INTO Jornadas(Nombre, Activo)
SELECT 'Turno Completo', 1
INSERT INTO JornadasDetalles(JornadaID, HrsDia, HrsSemana, HrsQuincena, HrsMes, Activo)
SELECT 1, 6, 6*7, 6*15, 6*30, 1
INSERT INTO JornadasDetalles(JornadaID, HrsDia, HrsSemana, HrsQuincena, HrsMes, Activo)
SELECT 2, 8, 8*7, 8*15, 8*30, 1


/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/*
-- Datos de pruebas
INSERT INTO Empleados(Nombre, ApellidoPaterno, ApellidoMaterno, PuestoID, EmpleadoTipoID, JornadaID, Activo)
SELECT 'Chofer', 'Interno', 'Materno', 1, 1, 1, 1
INSERT INTO Empleados(Nombre, ApellidoPaterno, ApellidoMaterno, PuestoID, EmpleadoTipoID, JornadaID, Activo)
SELECT 'Auxiliar ', 'Interno', 'Materno', 3, 1, 1, 1
INSERT INTO Empleados(Nombre, ApellidoPaterno, ApellidoMaterno, PuestoID, EmpleadoTipoID, JornadaID, Activo)
SELECT 'Chofer', 'Externo', 'Materno', 1, 2, 1, 1
INSERT INTO Empleados(Nombre, ApellidoPaterno, ApellidoMaterno, PuestoID, EmpleadoTipoID, JornadaID, Activo)
SELECT 'Cargador ', 'Interno', 'Materno', 2, 1, 1, 1
*/
/*
INSERT INTO Pagos(EmpleadoID, TotalBruto, TotalNeto)
SELECT 1, 0, 0
INSERT INTO MovimientosDiarios(PagoID, ActividadID, Cantidad, Total, FechaMovimiento, CubrioPuestoID)
SELECT 1,1, 8,240,GETDATE(),1
INSERT INTO MovimientosBonos(PagoID,BonoID,Total)
SELECT 1,1, '9.6'
INSERT INTO MovimientosImpuestos(PagoID,ImpuestoID,Total)
SELECT 1,1, '22.464'
*/

--DELETE FROM Empleados WHERE ID >2

SELECT * FROM Empleados