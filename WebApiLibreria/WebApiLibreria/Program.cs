using Microsoft.EntityFrameworkCore;
using WebApiLibreria;
using WebApiLibreria.Interfaces;
using WebApiLibreria.Persistencia;
using WebApiLibreria.Repository;
using WebApiLibreria.Repository.Categoria;
using WebApiLibreria.Repository.Facturacion;
using WebApiLibreria.Repository.Login;
using WebApiLibreria.Repository.Productos;

var builder = WebApplication.CreateBuilder(args);

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy => policy.WithOrigins("*")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});



// Add services to the container.
//Crear conexion a la Base de Datos
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
//Registar el servicio para la conexion
builder.Services.AddDbContext<SalesSystemContext>(options => options.UseSqlServer(connectionString));
//Configurar el repositorio

builder.Services.AddScoped<ILogin, LoginRepsitory>();
builder.Services.AddScoped<ICategoria, CategoryRepository>();
builder.Services.AddScoped<IProductos, ProductosRepository>();
builder.Services.AddScoped<IFactura, FacturacionRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
// Configurar CORS
app.UseCors("AllowSpecificOrigin");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// Agregar servicios al contenedor.
//builder.Services.AddControllers();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
