-- USE master DROP DATABASE Rinku -- SP_WHO kill 56
/*
CREATE DATABASE Rinku
GO
USE Rinku

CREATE TABLE Fechas
(
	Fecha DATE NOT NULL UNIQUE,
	DiaSemana INT NOT NULL,
	DiaMes INT NOT NULL,
	DiaAnio INT NOT NULL,
	Semana INT NOT NULL,
	SemanaMes INT NOT NULL,
	Mes INT NOT NULL,
	Anio INT NOT NULL,
	PRIMARY KEY(Fecha)
)

DECLARE @FECHA DATE = DATEADD(YEAR, -1, GETDATE())
WHILE (SELECT @FECHA) < GETDATE()
BEGIN
	INSERT INTO Fechas
	SELECT @FECHA, DATEPART(WEEKDAY,@FECHA), DATEPART(DAY, @FECHA), DATEPART(DAYOFYEAR,@FECHA), CONVERT(INT,(DATEPART(DAY, @FECHA)/7)+1), DATEPART(WEEK,@FECHA), DATEPART(MONTH,@FECHA), DATEPART(YEAR,@FECHA)
	SET @FECHA = DATEADD(DAY, 1, @FECHA)
END

CREATE TABLE ComisionesTipos
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
	TipoComisionID INT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (TipoComisionID) REFERENCES ComisionesTipos(ID)
)

CREATE TABLE Actividades
(
	ID INT NOT NULL IDENTITY(1,1),
	Nombre VARCHAR(250) NOT NULL,
	ComisionID INT NOT NULL,
    Activo BIT,
    PRIMARY KEY (ID),
    FOREIGN KEY (ComisionID) REFERENCES Comisiones(ID)
)

CREATE TABLE Puestos
(
	ID INT NOT NULL IDENTITY(1,1),
    Nombre VARCHAR(100) NOT NULL,
    Activo BIT,
    PRIMARY KEY (ID)
)

CREATE TABLE Sueldos
(
	ID INT NOT NULL IDENTITY(1,1),
	PuestoID INT NOT NULL,
	SdoHr INT NOT NULL,
	SdoMediaJornada INT NOT NULL,
	SdoJornada INT NOT NULL,
	SdoSemana INT NOT NULL,
	SdoQuincena INT NOT NULL,
	SdoMes INT NOT NULL,
	PRIMARY KEY(ID),
	FOREIGN KEY(PuestoID) REFERENCES Puestos(ID)
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

CREATE TABLE Estatus
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
	TipoBonoID INT NOT NULL,
	Activo BIT NOT NULL,
	PRIMARY KEY (ID),
    FOREIGN KEY (TipoBonoID) REFERENCES BonosTipos(ID)
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
	TipoEmpleadoID INT NOT NULL,
	JornadaID INT NOT NULL,
    Activo BIT,
    PRIMARY KEY (ID),
    FOREIGN KEY (PuestoID) REFERENCES Puestos(ID),
    FOREIGN KEY (TipoEmpleadoID) REFERENCES EmpleadosTipos(ID),
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

CREATE TABLE Nominas
(
	ID INT NOT NULL IDENTITY(1,1),
	EmpleadoID INT NOT NULL,
	SueldoBase DECIMAL(10,2) NOT NULL,
	SueldoTotal DECIMAL(10,2) NOT NULL,
	EstatusID INT NOT NULL,
	Activo BIT NOT NULL,
    PRIMARY KEY (ID),
	FOREIGN KEY (EmpleadoID) REFERENCES Empleados(ID),
	FOREIGN KEY (EstatusID) REFERENCES Estatus(ID)
)

CREATE TABLE MovimientosDiarios
(
	ID INT NOT NULL IDENTITY(1,1),
	NominaID INT NOT NULL,
	ActividadID INT NOT NULL,
	Horas INT NOT NULL,
	Total DECIMAL(10,2) NOT NULL, 
	FechaMovimiento DATE NOT NULL,
	CubrioPuesto BIT NOT NULL,
	EstatusID INT NOT NULL,
	Activo BIT NOT NULL,
    PRIMARY KEY (ID),
	FOREIGN KEY (ActividadID) REFERENCES Actividades(ID),
	FOREIGN KEY (NominaID) REFERENCES Nominas(ID),
	FOREIGN KEY (EstatusID) REFERENCES Estatus(ID)

)

CREATE TABLE MovimientosBonos
(
	ID INT NOT NULL IDENTITY(1,1),
	NominaID INT NOT NULL,
	BonoID INT NOT NULL,
	Total DECIMAL(10,2) NOT NULL, 
	EstatusID INT NOT NULL,
	Activo BIT NOT NULL,
    PRIMARY KEY (ID),
	FOREIGN KEY (BonoID) REFERENCES Bonos(ID),
	FOREIGN KEY (EstatusID) REFERENCES Estatus(ID),
	FOREIGN KEY (NominaID) REFERENCES Nominas(ID)
)

CREATE TABLE MovimientosImpuestos
(
	ID INT NOT NULL IDENTITY(1,1),
	NominaID INT NOT NULL,
	ImpuestoID INT NOT NULL,
	Total DECIMAL(10,2) NOT NULL,
	Activo BIT NOT NULL, 
    PRIMARY KEY (ID),
	FOREIGN KEY (ImpuestoID) REFERENCES Impuestos(ID),
	FOREIGN KEY (NominaID) REFERENCES Nominas(ID)
)

INSERT INTO ComisionesTipos(Nombre, Activo)
SELECT 'Hora',1
INSERT INTO ComisionesTipos(Nombre, Activo)
SELECT 'Evento',1
INSERT INTO Comisiones(Nombre, Activo, Monto, TipoComisionID)
SELECT 'Comisión Base',1, 30, 1
INSERT INTO Comisiones(Nombre, Activo, Monto, TipoComisionID)
SELECT 'Comisión entregar paquete',1, 5, 1
INSERT INTO Comisiones(Nombre, Activo, Monto, TipoComisionID)
SELECT 'Comisión Hora 1',1, 5, 1
INSERT INTO Comisiones(Nombre, Activo, Monto, TipoComisionID)
SELECT 'Comisión Hora 2',1, 10, 1
INSERT INTO Actividades(Nombre, ComisionID, Activo)
SELECT 'Actividad Base Chofer', 1, 1
INSERT INTO Actividades(Nombre, ComisionID, Activo)
SELECT 'Actividad Base Cargador', 1, 1
INSERT INTO Actividades(Nombre, ComisionID, Activo)
SELECT 'Actividad Base Auxiliar', 1, 1
INSERT INTO Actividades(Nombre, ComisionID, Activo)
SELECT 'Entregar paquete', 2, 1
INSERT INTO Actividades(Nombre, ComisionID, Activo)
SELECT 'Hora cargador', 3, 1
INSERT INTO Actividades(Nombre, ComisionID, Activo)
SELECT 'Hora chofer', 4, 1
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
INSERT INTO Bonos(Nombre, Cantidad, TipoBonoID, Activo)
SELECT 'Vales de despensa', 4, 1,1
INSERT INTO Estatus(Nombre, Activo)
SELECT 'Pendiente pagar',1
INSERT INTO Estatus(Nombre, Activo)
SELECT 'Pagado',2
INSERT INTO Estatus(Nombre, Activo)
SELECT 'Pago parcial',3
INSERT INTO Impuestos(Nombre, Descripcion, Minimo, Maximo, Porcentaje, Activo)
SELECT 'ISR Base', 'Impuesto para todos', 0, -1, 9, 1
INSERT INTO Impuestos(Nombre, Descripcion, Minimo, Maximo, Porcentaje, Activo)
SELECT 'ISR para Ricos', 'Impuesto para los que ganan mucho', 16000, -1, 3, 1
INSERT INTO Jornadas(Nombre, Activo)
SELECT '1/2 Turno', 1
INSERT INTO Jornadas(Nombre, Activo)
SELECT 'Turno Completo', 1
INSERT INTO JornadasDetalles(JornadaID, HrsDia, HrsSemana, HrsQuincena, HrsMes, Activo)
SELECT 1, 6, 30, 60, 120, 1
INSERT INTO JornadasDetalles(JornadaID, HrsDia, HrsSemana, HrsQuincena, HrsMes, Activo)
SELECT 1, 8, 40, 80, 160, 1
*/

/*
-- Datos de pruebas
INSERT INTO Empleados(Nombre, ApellidoPaterno, ApellidoMaterno, PuestoID, TipoEmpleadoID, JornadaID, Activo)
SELECT 'Chofer', 'Interno', 'Materno', 1, 1, 1, 1
INSERT INTO Empleados(Nombre, ApellidoPaterno, ApellidoMaterno, PuestoID, TipoEmpleadoID, JornadaID, Activo)
SELECT 'Chofer', 'Externo', 'Materno', 1, 2, 1, 1
INSERT INTO Empleados(Nombre, ApellidoPaterno, ApellidoMaterno, PuestoID, TipoEmpleadoID, JornadaID, Activo)
SELECT 'Cargador ', 'Interno', 'Materno', 2, 1, 1, 1
INSERT INTO Empleados(Nombre, ApellidoPaterno, ApellidoMaterno, PuestoID, TipoEmpleadoID, JornadaID, Activo)
SELECT 'Auxiliar ', 'Interno', 'Materno', 3, 1, 1, 1
*/

SELECT * FROM Impuestos

--SELECT * FROM Bonos
SELECT * FROM Nominas
SELECT * FROM MovimientosDiarios

--Al final de mes se insertan
SELECT * FROM MovimientosBonos
SELECT * FROM MovimientosImpuestos

/*
INSERT INTO Nominas(EmpleadoID, SueldoBase, SueldoTotal, EstatusID,Activo)
SELECT 1, 0, 0, 1, 1
INSERT INTO MovimientosDiarios(NominaID, ActividadID, Horas, Total, FechaMovimiento, CubrioPuesto, EstatusID, Activo)
SELECT 1,1, 8,240,GETDATE(),1,1,1
INSERT INTO MovimientosBonos(NominaID,BonoID,Total,EstatusID,Activo)
SELECT 1,1, '9.6',1,1
INSERT INTO MovimientosImpuestos(NominaID,ImpuestoID,Total,Activo)
SELECT 1,1, '22.464',1

UPDATE Nominas SET SueldoTotal =227.14
WHERE ID = 1
*/

/*
-- Comprobar sueldos
SELECT 
	E.ID, E.Nombre, TE.Nombre, R.Nombre, A.Nombre, C.Nombre, C.Monto, TC.Nombre
FROM
	Empleados E(NOLOCK)
INNER JOIN
	EmpleadosTipos TE(NOLOCK) ON E.TipoEmpleadoID = TE.ID
INNER JOIN
	Puestos R(NOLOCK) ON E.PuestoID = R.Id
INNER JOIN 
	Actividades A(NOLOCK) ON R.ActividadBase = A.ID
INNER JOIN
	Comisiones C(NOLOCK) ON A.ComisionID = C.ID
INNER JOIN
	ComisionesTipos TC(NOLOCK) ON C.TipoComisionID = TC.ID

SELECT * FROM ComisionesTipos
*/

/*
-- Comprobar empleados
SELECT 
	E.ID, E.Nombre, TE.Nombre, R.Nombre, A.Nombre, C.Nombre, C.Monto, TC.Nombre
FROM
	Empleados E(NOLOCK)
INNER JOIN
	EmpleadosTipos TE(NOLOCK) ON E.TipoEmpleadoID = TE.ID
INNER JOIN
	Puestos R(NOLOCK) ON E.PuestoID = R.Id
INNER JOIN 
	Actividades A(NOLOCK) ON R.ActividadBase = A.ID
INNER JOIN
	Comisiones C(NOLOCK) ON A.ComisionID = C.ID
INNER JOIN
	ComisionesTipos TC(NOLOCK) ON C.TipoComisionID = TC.ID
*/
/*
--Comprobar las comisiones de cada Puesto
SELECT 
	R.Nombre, A.Nombre, C.Nombre, C.Monto, TC.Nombre
FROM
	Puestos R(NOLOCK)
INNER JOIN 
	Actividades A(NOLOCK) ON R.ActividadBase = A.ID
INNER JOIN
	Comisiones C(NOLOCK) ON A.ComisionID = C.ID
INNER JOIN
	ComisionesTipos TC(NOLOCK) ON C.TipoComisionID = TC.ID
*/
/*
--Comprobar los Puestos a cubrir
SELECT 
	RC.Nombre, R.Nombre, R2.Nombre
FROM 
	PuestosCubrir RC(NOLOCK)
INNER JOIN
	Puestos R(NOLOCK) ON RC.Puesto = R.ID
INNER JOIN
	Puestos R2(NOLOCK) ON RC.PuestoCubrir = R2.ID
*/
/*
--Comprobar bonos
SELECT 
	B.Nombre, B.Cantidad, TB.Nombre
FROM 
	Bonos B(NOLOCK)
INNER JOIN
	BonosTipos TB(NOLOCK) ON TB.ID = B.TipoBonoID
*/
/*
--Comprobar actividades de cada puesto
SELECT 
	* 
FROM 
	ActividadesPuestos AR(NOLOCK)
INNER JOIN
	Puestos R(NOLOCK) ON AR.PuestoID = R.ID
INNER JOIN
	Actividades A(NOLOCK) ON AR.ActividadID = A.ID
*/






