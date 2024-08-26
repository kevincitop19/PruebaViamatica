CREATE DATABASE SalesSystem;
GO

USE SalesSystem;
GO

-- Tabla de Usuarios
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL UNIQUE,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Tabla de Categorías
CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY IDENTITY(1,1),
    CategoryName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(255)
);
GO

-- Tabla de Productos
CREATE TABLE Products (
    ProductID INT PRIMARY KEY IDENTITY(1,1),
    ProductName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(255),
    Price DECIMAL(18,2) NOT NULL,
    Stock INT NOT NULL,
    CategoryID INT,
    CONSTRAINT FK_Products_Categories FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);
GO

-- Tabla de Carrito
CREATE TABLE Cart (
    CartID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT,
    ProductID INT,
    Quantity INT NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Cart_Users FOREIGN KEY (UserID) REFERENCES Users(UserID),
    CONSTRAINT FK_Cart_Products FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
GO

-- Tabla de Facturas
CREATE TABLE Invoices (
    InvoiceID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT,
    Subtotal DECIMAL(18,2) NOT NULL,
    Tax AS (Subtotal * 0.15),  -- Columna calculada para el impuesto
    TotalAmount AS (Subtotal + (Subtotal * 0.15)),  -- Columna calculada para el total
    CreatedAt DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Invoices_Users FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- Elimina las columnas calculadas de la tabla `Invoices`
ALTER TABLE Invoices
DROP COLUMN Subtotal;
GO



-- Tabla de Detalles de Factura
CREATE TABLE InvoiceDetails (
    InvoiceDetailID INT PRIMARY KEY IDENTITY(1,1),
    InvoiceID INT,
    ProductID INT,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(18,2) NOT NULL,
    Subtotal AS (Quantity * UnitPrice),  -- Columna calculada para el subtotal
    Tax AS (Quantity * UnitPrice * 0.15),  -- Columna calculada para el impuesto
    Total AS ((Quantity * UnitPrice) + (Quantity * UnitPrice * 0.15)),  -- Columna calculada para el total
    CONSTRAINT FK_InvoiceDetails_Invoices FOREIGN KEY (InvoiceID) REFERENCES Invoices(InvoiceID),
    CONSTRAINT FK_InvoiceDetails_Products FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
GO

INSERT INTO Categories (CategoryName, Description) VALUES
('Electronics', 'Devices and gadgets including phones, computers, and more.'),
('Clothing', 'Apparel and accessories for men, women, and children.'),
('Books', 'Fiction, non-fiction, and educational books.'),
('Home & Kitchen', 'Appliances, furniture, and kitchenware.'),
('Sports & Outdoors', 'Equipment and gear for sports and outdoor activities.'),
('Toys', 'Playthings and games for children of all ages.'),
('Health & Beauty', 'Products for personal care, health, and wellness.'),
('Automotive', 'Car parts, accessories, and tools.'),
('Jewelry', 'Rings, necklaces, bracelets, and other accessories.'),
('Office Supplies', 'Stationery, furniture, and other office essentials.');
GO

INSERT INTO Products (ProductName, Description, Price, Stock, CategoryID) VALUES
('Smartphone', 'Latest model smartphone with high-resolution camera.', 699.99, 50, 1),
('Laptop', 'High-performance laptop with 16GB RAM and 512GB SSD.', 1299.99, 30, 1),
('T-shirt', 'Comfortable cotton t-shirt available in multiple colors.', 19.99, 100, 2),
('Jeans', 'Stylish denim jeans for casual wear.', 49.99, 75, 2),
('Science Fiction Novel', 'An engaging science fiction novel by a bestselling author.', 14.99, 200, 3),
('Cookbook', 'A collection of recipes for gourmet cooking.', 24.99, 150, 3),
('Blender', 'High-speed blender for making smoothies and soups.', 89.99, 40, 4),
('Sofa', 'Comfortable sofa with durable upholstery.', 499.99, 20, 4),
('Tent', 'Durable and weather-resistant camping tent for 4 people.', 159.99, 25, 5),
('Running Shoes', 'Lightweight running shoes with excellent cushioning.', 89.99, 60, 5),
('Building Blocks', 'Colorful building blocks for kids.', 29.99, 120, 6),
('Puzzle', 'Challenging jigsaw puzzle with 1000 pieces.', 19.99, 80, 6),
('Shampoo', 'Moisturizing shampoo for all hair types.', 12.99, 150, 7),
('Fitness Tracker', 'Wearable device to track fitness and health metrics.', 79.99, 70, 7),
('Car Battery', 'High-performance car battery suitable for most vehicles.', 129.99, 25, 8),
('Seat Cover', 'Universal seat cover for added comfort and protection.', 39.99, 50, 8),
('Diamond Ring', 'Elegant diamond ring with a solitaire stone.', 499.99, 10, 9),
('Necklace', 'Beautiful necklace with a custom pendant.', 249.99, 15, 9),
('Office Chair', 'Ergonomic office chair with adjustable features.', 159.99, 35, 10),
('Printer', 'High-resolution printer with wireless capabilities.', 119.99, 45, 10);
GO

INSERT INTO Products (ProductName, Description, Price, Stock, CategoryID) VALUES
('Tablet', '10-inch tablet with high-resolution display and 64GB storage.', 299.99, 45, 1),
('Smartwatch', 'Feature-rich smartwatch with heart rate monitor.', 199.99, 55, 1),
('Hoodie', 'Warm hoodie available in various sizes.', 39.99, 80, 2),
('Sneakers', 'Comfortable sneakers for casual and athletic wear.', 59.99, 90, 2),
('Cookware Set', 'Complete set of non-stick cookware for your kitchen.', 149.99, 35, 4),
('Dining Table', 'Elegant dining table made from solid wood.', 399.99, 15, 4),
('Yoga Mat', 'Non-slip yoga mat for all types of workouts.', 29.99, 100, 5),
('Camping Stove', 'Portable stove for camping and outdoor cooking.', 69.99, 40, 5),
('Board Game', 'Family-friendly board game for game nights.', 24.99, 70, 6),
('Dollhouse', 'Detailed dollhouse with furniture and accessories.', 89.99, 25, 6),
('Toothbrush', 'Electric toothbrush with multiple brushing modes.', 49.99, 120, 7),
('Vitamins', 'Daily multivitamin supplement for overall health.', 29.99, 80, 7),
('Car Charger', 'Universal car charger with dual USB ports.', 19.99, 65, 8),
('Bike Helmet', 'Safety helmet with adjustable fit for cycling.', 39.99, 45, 8),
('Gold Earrings', 'Elegant gold earrings suitable for all occasions.', 299.99, 20, 9),
('Bracelet', 'Stylish bracelet with customizable charms.', 149.99, 30, 9),
('Desk Lamp', 'Adjustable desk lamp with LED lighting.', 59.99, 50, 10),
('File Cabinet', '4-drawer file cabinet for office organization.', 139.99, 25, 10),
('Smart Speaker', 'Voice-controlled smart speaker with built-in assistant.', 129.99, 75, 1),
('Digital Camera', 'High-resolution digital camera with zoom lens.', 499.99, 20, 1),
('Winter Jacket', 'Insulated winter jacket for cold weather.', 89.99, 65, 2),
('Dress', 'Elegant dress for formal occasions.', 69.99, 40, 2),
('Blender Bottle', 'Shaker bottle with mixer ball for protein shakes.', 14.99, 110, 5),
('Electric Kettle', 'Fast boiling electric kettle with automatic shutoff.', 39.99, 85, 4),
('Travel Bag', 'Durable travel bag with multiple compartments.', 89.99, 55, 5),
('Outdoor Chair', 'Comfortable folding chair for outdoor use.', 49.99, 70, 5),
('Electric Toothbrush', 'Advanced electric toothbrush with charging base.', 69.99, 70, 7),
('Facial Cream', 'Moisturizing facial cream for daily use.', 24.99, 90, 7);
GO
