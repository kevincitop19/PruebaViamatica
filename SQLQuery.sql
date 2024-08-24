-- Crear la base de datos
CREATE DATABASE SistemaVentas;
GO

-- Usar la base de datos recién creada
USE SistemaVentas;
GO

-- Crear la tabla Usuarios para el login y registro de usuarios
CREATE TABLE Usuarios (
    UsuarioID INT PRIMARY KEY IDENTITY(1,1),
    NombreUsuario VARCHAR(50) NOT NULL,
    CorreoElectronico VARCHAR(100) NOT NULL UNIQUE,
    Contraseña VARCHAR(255) NOT NULL,
    FechaRegistro DATETIME DEFAULT GETDATE()
);
GO

-- Crear la tabla Categorías para el listado de categorías
CREATE TABLE Categorias (
    CategoriaID INT PRIMARY KEY IDENTITY(1,1),
    NombreCategoria VARCHAR(50) NOT NULL,
    Descripcion TEXT NULL
);
GO

-- Crear la tabla Productos para los productos de cada categoría
CREATE TABLE Productos (
    ProductoID INT PRIMARY KEY IDENTITY(1,1),
    NombreProducto VARCHAR(100) NOT NULL,
    Descripcion TEXT NULL,
    Precio DECIMAL(10, 2) NOT NULL,
    Stock INT NOT NULL,
    CategoriaID INT FOREIGN KEY REFERENCES Categorias(CategoriaID)
);
GO

-- Crear la tabla Carrito para seleccionar productos
CREATE TABLE Carrito (
    CarritoID INT PRIMARY KEY IDENTITY(1,1),
    UsuarioID INT FOREIGN KEY REFERENCES Usuarios(UsuarioID),
    FechaCreacion DATETIME DEFAULT GETDATE()
);
GO

-- Crear la tabla CarritoDetalle para los detalles del carrito
CREATE TABLE CarritoDetalle (
    CarritoDetalleID INT PRIMARY KEY IDENTITY(1,1),
    CarritoID INT FOREIGN KEY REFERENCES Carrito(CarritoID),
    ProductoID INT FOREIGN KEY REFERENCES Productos(ProductoID),
    Cantidad INT NOT NULL,
    PrecioUnitario DECIMAL(10, 2) NOT NULL
);
GO

-- Crear la tabla Facturas para las compras realizadas
CREATE TABLE Facturas (
    FacturaID INT PRIMARY KEY IDENTITY(1,1),
    UsuarioID INT FOREIGN KEY REFERENCES Usuarios(UsuarioID),
    FechaFactura DATETIME DEFAULT GETDATE(),
    Total DECIMAL(10, 2) NOT NULL
);
GO

-- Crear la tabla FacturaDetalle para los detalles de la factura
CREATE TABLE FacturaDetalle (
    FacturaDetalleID INT PRIMARY KEY IDENTITY(1,1),
    FacturaID INT FOREIGN KEY REFERENCES Facturas(FacturaID),
    ProductoID INT FOREIGN KEY REFERENCES Productos(ProductoID),
    Cantidad INT NOT NULL,
    PrecioUnitario DECIMAL(10, 2) NOT NULL,
    Subtotal DECIMAL(10, 2) AS (Cantidad * PrecioUnitario) PERSISTED
);
GO

-- Agregar columna Estado en la tabla Usuarios
ALTER TABLE Usuarios
ADD Estado VARCHAR(20) DEFAULT 'Activo';
GO

-- Agregar columna Estado en la tabla Categorias
ALTER TABLE Categorias
ADD Estado VARCHAR(20) DEFAULT 'Activo';
GO

-- Agregar columna Estado en la tabla Productos
ALTER TABLE Productos
ADD Estado VARCHAR(20) DEFAULT 'Activo';
GO
